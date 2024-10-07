const cds = require("@sap/cds-dk")
const { write } = cds.utils

cds.add?.register?.("curl", class extends cds.add.Plugin {

	async run() {
		const csn = await cds.load(cds.env.roots).then(cds.minify)
		cds.linked(csn)
		const serviceInfo = cds.compile.to.serviceinfo(csn)
		serviceInfo.forEach(service => {
			const exposedEntities = Object.keys(csn.definitions).filter(d => {
				return d.startsWith(service.name + ".")
			})
			exposedEntities.forEach(entity => {
				const request = "curl http://localhost:4004/"
					+ service.urlPath
					+ entity.split(".")[1]
				write(request).to(`test/curl/${entity}.sh`)
			})
		})
	}
})
