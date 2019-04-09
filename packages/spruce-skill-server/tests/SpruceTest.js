// @flow
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const globby = require('globby')
const supertest = require('supertest')
const faker = require('faker')

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
			// eslint-disable-next-line
			before(() => this.before())
			// eslint-disable-next-line
			after(() => this.after())
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
				// const mocks = await globby([`${__dirname}/mocks/**/*Mock.js`])
				const mocks = await globby([
					`${basePath}/server/tests/mocks/**/*Mock.js`
				])
				for (let i = 0; i < mocks.length; i += 1) {
					// $FlowIgnore
					const Mock = require(mocks[i])
					const mock = new Mock(this.koa)
					this.mocks[mock.key] = mock
					await mock.setup(options)
				}
			} catch (e) {
				throw e
			}
		}

		async before() {
			await this.beforeBase()
		}

		async beforeBase(options?: Object) {
			try {
				// $FlowIgnore
				// const { koa, server } = await require(`${__dirname}/../server`)
				const { koa, server } = await require(`${basePath}/server/server`)
				// const server = await require(`${__dirname}/../server`)
				this.server = server
				this.koa = koa
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

		createPhone() {
			const phone = faker.phone.phoneNumberFormat(0)
			return `555${phone.substr(3)}`
		}
	}
}
