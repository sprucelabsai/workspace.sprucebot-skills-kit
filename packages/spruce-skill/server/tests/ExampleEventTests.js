// @flow
const { assert } = require('chai')
const { SpruceTest } = require('@sprucelabs/spruce-skill-server')

// SpruceTest take a single parameter, pointing to the base skill directory
class ExampleEventTests extends SpruceTest(`${__dirname}/../../`) {
	organization: any
	location: any
	skill: any

	setup() {
		it('Can respond to "get-views" event', () => this.getViews())
	}

	async getViews() {
		const result = await this.triggerEvent({
			eventName: 'get-views',
			payload: {
				page: 'dashboard_location',
				locationId: this.location.id,
				organizationId: this.organization.id
			},
			skill: this.skill,
			location: this.location,
			organization: this.organization,
			user: this.location.owner[0]
		})
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
