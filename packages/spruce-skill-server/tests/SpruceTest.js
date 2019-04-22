process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const globby = require('globby')
const supertest = require('supertest')
const faker = require('faker')
const { generateSkillJWT } = require('./lib/jwt')

// The base test model that all others will extend
module.exports = basePath => {
	if (!basePath) {
		throw new Error(
			'Invalid "basePath" passed to SpruceTest. It should be used like: class ExampleTests extends SpruceTest(`${__dirname}/../../`) {...}'
		)
	}
	return class Base {
		constructor() {
			this.mocks = {}
			before(() => this.before())
			after(() => this.after())
			beforeEach(() => this.beforeEach())
			afterEach(() => this.afterEach())
			this.setup()
		}

		setup() {}

		mockCtx({ location, payload }) {
			const ctx = {
				event: {
					Location: location,
					payload
				},
				db: {
					models: this.koa.context.db.models
				},
				body: {}
			}

			return ctx
		}

		async setupMocks(options) {
			try {
				const mocks = await globby([
					`${__dirname}/mocks/**/*Mock.js`,
					`${basePath}/server/tests/mocks/**/*Mock.js`
				])
				let sandbox
				for (let i = 0; i < mocks.length; i += 1) {
					const Mock = require(mocks[i])
					const mock = new Mock(this.koa)
					if (mock.key === 'sandbox') {
						sandbox = mock
					}
					if (this.mocks[mock.key]) {
						throw new Error(
							`A mock with the key "${
								mock.key
							}" already exists. Please set a unique "key" in your mock.`
						)
					}
					this.mocks[mock.key] = mock
					await mock.setup({
						...options,
						sandbox
					})
				}
			} catch (e) {
				throw e
			}
		}

		async beforeEach() {
			// Reset the emit response handler
			global.testEmitResponse = {}
		}

		async afterEach() {}

		async before(options) {
			await this.beforeBase(options)
			if (this.mocks.sandbox) {
				this.organization = this.mocks.sandbox.organization
				const locationId = Object.keys(this.mocks.sandbox.locations)[0]
				this.location = this.mocks.sandbox.locations[locationId]
				this.skill = this.mocks.sandbox.skill
			} else {
				throw new Error(
					'@sprucelabs/spruce-skill-server: SandboxMock has not been initialized. If this is deliberate you should override the before() method in your test'
				)
			}
		}

		async beforeBase(options) {
			try {
				const { koa, server } = await require(`${basePath}/server/server`)
				this.server = server
				this.koa = koa
				this.ctx = this.koa.context
				this.request = supertest(this.server)

				if (!options || !options.disableMocks) {
					await this.setupMocks(options)
				}
			} catch (e) {
				throw e
			}
		}

		async after() {
			await this.afterBase()
		}

		async afterBase() {
			try {
				const promises = []
				for (let k in this.mocks) {
					promises.push(this.mocks[k].teardown())
				}
				await Promise.all(promises)
			} catch (e) {
				throw e
			}
		}

		async triggerEvent({
			eventName,
			payload,
			skill,
			location,
			organization,
			user
		}) {
			const token = generateSkillJWT({
				skill,
				location,
				organization,
				user,
				payload,
				eventType: eventName
			})

			const result = await this.request
				.post('/hook.json')
				.send({ data: token, event: eventName })

			return result
		}

		createPhone() {
			const phone = faker.phone.phoneNumberFormat(0)
			return `555${phone.substr(3)}`
		}
	}
}
