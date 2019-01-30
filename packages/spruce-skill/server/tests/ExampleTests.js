// @flow
const { assert } = require('chai')
const faker = require('faker')
const { Op } = require('sequelize')
const Base = require('./Base')

class ExampleTests extends Base {
	organization: any
	location: any

	setup() {
		it('Can do a trivial assert', () => this.trivialAssert())
		it('Can make a gql request', () => this.gqlRequest())
	}

	async before() {
		await this.beforeBase()
		this.organization = this.mocks.sandbox.organization
		const locationId = Object.keys(this.mocks.sandbox.locations)[0]
		this.location = this.mocks.sandbox.locations[locationId]
	}

	async trivialAssert() {
		const location = await this.koa.context.db.models.Location.findOne()
		console.log({ location })
		assert.isTrue(true)
	}

	async gqlRequest() {
		const { body } = await this.request.post('/graphql')

		log.debug(body)
	}
}

describe('ExampleTests', function Tests() {
	this.timeout(30000)
	new ExampleTests() // eslint-disable-line
})
