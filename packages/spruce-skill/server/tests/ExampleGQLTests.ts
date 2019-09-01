import { assert } from 'chai'
import { SpruceTest } from '@sprucelabs/spruce-skill-server'
import { ISkillContext } from 'server/interfaces/ctx'

// SpruceTest take a single parameter, pointing to the base skill directory
class ExampleTests extends SpruceTest<ISkillContext> {
	public setup(): void {
		it('Can do a trivial assert', () => this.trivialAssert())
		it('Can get users', () => this.getUsers())
		it('Can use custom mock data', () => this.customMock())
	}

	public async before(): Promise<void> {
		await this.beforeBase()
		this.organization = this.mocks.sandbox.organization
		const locationId = Object.keys(this.mocks.sandbox.locations)[0]
		this.location = this.mocks.sandbox.locations[locationId]
	}

	public async trivialAssert(): Promise<void> {
		const location = await this.ctx.db.models.Location.findOne()
		assert.isNotNull(location)
	}

	public async getUsers(): Promise<void> {
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

	public customMock(): void {
		// Verify "someData" is set properly by mocks/ExampleMock.js
		assert.equal(
			this.mocks.example.someData,
			`Example Mock Test org/location: ${this.organization.id} / ${
				this.location.id
			}`
		)
	}
}

describe('ExampleTests', function Tests() {
	this.timeout(30000)
	new ExampleTests(`${__dirname}/../../`) // eslint-disable-line
})
