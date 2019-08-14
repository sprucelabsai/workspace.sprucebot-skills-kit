const assert = require('chai').assert
const SpruceTest = require('./SpruceTest')
const config = require('config')
const faker = require('faker')
const uuid = require('uuid')

class EmitTests extends SpruceTest(`${__dirname}/../../spruce-skill/`) {
	setup() {
		it('Can emit to location with eventId', () =>
			this.locationEmitWithEventId())
		it('Can emit to organization with eventId', () =>
			this.organizationEmitWithEventId())
	}

	async locationEmitWithEventId() {
		const eventId = uuid.v4()
		const eventName = `${config.SLUG}:test-event`

		global.testEmitResponse[eventName] = {
			callback: ({ data, method, path, query }) => {
				assert.equal(data.eventId, eventId)
				assert.equal(data.eventName, eventName)
				assert.equal(method, 'POST')
				assert.equal(path, `locations/${this.location.id}/emit`)
			}
		}

		const result = await this.ctx.sb.emit(
			this.location.id,
			eventName,
			{ my: 'payload' },
			{},
			eventId
		)
	}

	async organizationEmitWithEventId() {
		const eventId = uuid.v4()
		const eventName = `${config.SLUG}:test-event`

		global.testEmitResponse[eventName] = {
			callback: ({ data, method, path, query }) => {
				assert.equal(data.eventId, eventId)
				assert.equal(data.eventName, eventName)
				assert.equal(method, 'POST')
				assert.equal(path, `organizations/${this.organization.id}/emit`)
			}
		}

		const result = await this.ctx.sb.emitOrganization(
			this.organization.id,
			eventName,
			{ my: 'payload' },
			{},
			eventId
		)
	}
}

describe('EmitTests', function Tests() {
	this.timeout(30000)
	new EmitTests()
})
