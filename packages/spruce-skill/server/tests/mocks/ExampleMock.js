module.exports = class SandboxMock {
	constructor(app) {
		// Every Mock must have a unique key. It is available in your tests as this.mocks[<key>]
		this.key = 'example'
		this.ctx = app.context
		this.app = app
	}

	async setup(options) {
		// Sandbox is created beforehand and contains mock data for organization, locations, and users
		const sandbox = options.sandbox

		const organization = sandbox.organization
		const location = sandbox.locations[Object.keys(sandbox.locations)[0]]

		this.someData = `Example Mock Test org/location: ${organization.id} / ${
			location.id
		}`
		log.debug('Example mock created')
	}

	async teardown() {
		return
	}
}
