import { assert } from 'chai'
import { SpruceTest } from '@sprucelabs/spruce-skill-server'
import { ISkillContext } from 'server/interfaces/ctx'

// SpruceTest take a single parameter, pointing to the base skill directory
class ExampleEventTests extends SpruceTest<ISkillContext> {
	public setup(): void {
		it('Can respond to "get-views" event', () => this.getViews())
	}

	public async getViews(): Promise<void> {
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
	new ExampleEventTests(`${__dirname}/../../`) // eslint-disable-line
})
