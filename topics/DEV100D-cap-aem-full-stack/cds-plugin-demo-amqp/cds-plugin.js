const cds = global.cds || require("@sap/cds")

const AMQPClient = require('./XBMSGAMQPClient');     // --> uses package @sap/xb-msg-amqp-v100

cds.on("served", async services => {
	const amqpConfig = cds.env.requires.amqp
	const service = services[amqpConfig.entity.split(".")[0]]
	const entity = service.entities[amqpConfig.entity.split(".")[1]]
	const broker = amqpConfig.broker

	const solaceHostname = `${process.env.SOLACE_AMQP_PROTOCOL}://${process.env.SOLACE_AMQP_USERNAME}:${process.env.SOLACE_AMQP_PASSWORD}@${process.env.SOLACE_AMQP_HOST}:${process.env.SOLACE_AMQP_PORT}`
	const client = new AMQPClient(broker, { "uri": solaceHostname })

	await client.connect()
	client.registerSubscriber(service, [`queue://${amqpConfig.queue}`])
	const emitter = await cds.connect.to(service)
	emitter.on(`queue://${amqpConfig.queue}`, async msg => {
		const body = msg.data
		const existingMessage = await SELECT.from(entity, body.id)
		if (!existingMessage || existingMessage.length === 0) {
			await INSERT.into(entity).entries([body])
		}
	})
})
