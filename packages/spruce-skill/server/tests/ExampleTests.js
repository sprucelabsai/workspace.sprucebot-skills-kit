// @flow
const { assert } = require('chai')
const { SpruceTest } = require('@sprucelabs/spruce-skill-server')

// SpruceTest take a single parameter, pointing to the base skill directory
class ExampleTests extends SpruceTest(`${__dirname}/../../`) {
	organization: any
	location: any

	setup() {
		it('Can do a trivial assert', () => this.trivialAssert())
		it('Can get users', () => this.getUsers())
	}

	async before() {
		await this.beforeBase()
		this.organization = this.mocks.sandbox.organization
		const locationId = Object.keys(this.mocks.sandbox.locations)[0]
		this.location = this.mocks.sandbox.locations[locationId]
	}

	async trivialAssert() {
		const location = await this.koa.context.db.models.Location.findOne()
		assert.isNotNull(location)
	}

	async getUsers() {
		const query = `{
			Users {
				edges {
					node {
						id
						firstName
						lastName
					}
				}
			}
		}`
		const { body } = await this.request
			.post('/graphql')
			.set('Authorization', `JWT ${this.organization.owner[0].jwt}`)
			.send({
				query
			})

		log.debug(body)
		assert.isNotNull(body.data.Users)
	}
}

describe('ExampleTests', function Tests() {
	this.timeout(30000)
	new ExampleTests() // eslint-disable-line
})
