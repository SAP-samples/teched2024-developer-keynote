/**
 * The AMQPClient class below is largely based on the cap-eventing sample created by Willem Pardaens - https://github.com/willemi069808. 
 * The original code can be found here: https://github.com/willemi069808/cap-eventing/blob/main/advanced%20event%20mesh/AEMClient_XBMSG.js
 */

const assert = require("assert");
const AMQP = require("@sap/xb-msg-amqp-v100");

module.exports = class AMQPClient {

  /**
   * CAP Nodejs using the AMQP protocol. This class is a wrapper around the @sap/xb-msg-amqp-v100 library.
   * @param {String} clientName Name of the client. Used for logging purposes.
   * @param {Object} credentials Connection details for the AMQP broker. This should be specified in cds.requires.AMQP.credentials
   */
  constructor(clientName, credentials) {
    this.clientName = clientName;
    this.connectionInfo = credentials;
    this.broker = null;
    assert(
      this.connectionInfo,
      "No connection details specified in credentials"
    );
  }

  /**
   * Connects the client to the SAP Cloud Application Event Hub. Connection details should be specified in cds.requires.AMQP.credentials
   */
  connect = () => {
    assert(this.broker == null, "Broker is already connected.");
    this.broker = new AMQP.Client(this.connectionInfo);

    console.log(`${this.clientName} > Starting`);
    return new Promise((resolve, reject) => {
      this.broker.connect();
      resolve();
    });
  };

  /**
   * Disconnects the Broker client with appropriate Close performatives and TCP socket teardowns.
   */
  disconnect = () => {
    assert(this.broker, "Broker is not connected.");
    console.log(`${this.clientName} > Stopping`);
    return this.broker.disconnect();
  };

  /**
   * Creates an Broker receiver which will receive events on the specified topics.
   * @param {Service} service CDS Service that should receive events on the topics. This name should include the namespace.
   * @param {String[]} subscriptions Name (or array of names) of topics or queues that should be received.
   */
  registerSubscriber = (service, subscriptions = []) => {
    assert(this.broker, "Broker is not connected.");
    (Array.isArray(subscriptions) ? subscriptions : [subscriptions]).forEach((subscription) => {
      const receiver = this.broker.receiver(subscription).attach(subscription);
      console.log(`${this.clientName} > Receiver created for ${subscription}`);

      receiver.on("error", (err) => {
        return new Error(err);
      });
      receiver.on("data", (msg) => {
        console.log(`${this.clientName} > Received on ${subscription}`);
        const data = msg.payload.data || msg.payload.toString("utf-8");
        service.emit(subscription, JSON.parse(data));
        return msg.done();
      });
    });
  };

  /**
   * Creates an Broker sender which can send events on the specified topics.
   * @param {Service} service CDS Service that would emit events on the topics. This name should include the namespace.
   * @param {String[]} topics Name (or array of names) of topics that the service would be sent.
   */
  registerPublisher = (service, topics) => {
    assert(this.broker, "Broker is not connected.");
    (Array.isArray(topics) ? topics : [topics]).forEach((topic) => {
      const stream = this.broker.sender(topic).attach(topic, "", 100000);
      console.log(`${this.clientName} > Sender created for ${topic}`);

      service.on(topic, (msg) => {
        console.log(`${this.clientName} > Sending to topic ${topic}`);
        stream.write({
          payload: Buffer.from(JSON.stringify(msg.data), "utf-8"),
        });
      });
    });
  };
};
