// @flow
const { assert } = require('chai')
const Base = require('./Base')
const { generateSkillJWT } = require('./lib/jwt')

class ExampleEventTests extends Base {
	organization: any
	location: any
	skill: any

	setup() {
		it('Can respond to "get-views" event', () => this.getViews())
	}

	async before() {
		await this.beforeBase()
		this.organization = this.mocks.sandbox.organization
		const locationId = Object.keys(this.mocks.sandbox.locations)[0]
		this.location = this.mocks.sandbox.locations[locationId]
		this.skill = this.mocks.sandbox.skill
	}

	async getViews() {
		const eventType = `get-views`
		const token = generateSkillJWT({
			skill: this.skill,
			location: this.location,
			organization: this.organization,
			user: this.location.owner[0],
			payload: {
				page: 'dashboard_location',
				locationId: this.location.id,
				organizationId: this.organization.id
			},
			eventType
		})

		const result = await this.request
			.post('/hook.json')
			.send({ data: token, event: eventType })
		const { body } = result
		assert.isArray(body)
		assert.equal(body.length, 1)
		assert.equal(body[0].id, 'uniqueId4')
		assert.equal(body[0].title, 'Example Location Dashboard')
		assert.equal(body[0].path, '/skill-views/dashboard_location')
	}
}

describe('ExampleEventTests', function Tests() {
	this.timeout(30000)
	new ExampleEventTests() // eslint-disable-line
})
