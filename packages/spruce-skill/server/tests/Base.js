// @flow
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const globby = require('globby')
const faker = require('faker')
const supertest = require('supertest')
// const PhoneNumberParser = require('../server/lib/PhoneNumberParser');

// The base test model that all others will extend
module.exports = class Base {
	request: any
	mocks: Object

	constructor() {
		this.mocks = {}
		before(() => this.before())
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
				models: this.app.context.db.models
			},
			body: {}
		}

		return ctx
	}

	async setupMocks(options) {
		try {
			const mocks = await globby([`${__dirname}/mocks/**/*Mock.js`])
			for (let i = 0; i < mocks.length; i += 1) {
				// $FlowIgnore
				const Mock = require(mocks[i])
				const mock = new Mock(this.app)
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
			const server = await require(`${__dirname}/../server`)
			this.server = server
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

	// createPhone() {
	// 	const phone = faker.phone.phoneNumberFormat(0);
	// 	const parser = new PhoneNumberParser();
	// 	const phoneNumber = parser.getFormattedPhoneNumber(`555${phone.substr(3)}`);
	// 	return phoneNumber;
	// }
}
