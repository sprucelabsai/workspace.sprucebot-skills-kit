/* eslint-disable @typescript-eslint/no-unused-vars */
import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'
import config from 'config'
import uuid from 'uuid'

class EmitTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Can emit to location with eventId', () =>
			this.locationEmitWithEventId())
		it('Can emit to organization with eventId', () =>
			this.organizationEmitWithEventId())
	}

	public async locationEmitWithEventId(): Promise<void> {
		const eventId = uuid.v4()
		const eventName = `${config.get('SLUG')}:test-event`

		global.testEmitResponse[eventName] = {
			callback: ({ data, method, path, query }) => {
				assert.equal(data.eventId, eventId)
				assert.equal(data.eventName, eventName)
				assert.equal(method, 'POST')
				assert.equal(path, `locations/${this.location.id}/emit`)
			}
		}

		await this.ctx.sb.emit(
			this.location.id,
			eventName,
			{ my: 'payload' },
			{},
			eventId
		)
	}

	public async organizationEmitWithEventId(): Promise<void> {
		const eventId = uuid.v4()
		const eventName = `${config.get('SLUG')}:test-event`

		global.testEmitResponse[eventName] = {
			callback: ({ data, method, path, query }) => {
				assert.equal(data.eventId, eventId)
				assert.equal(data.eventName, eventName)
				assert.equal(method, 'POST')
				assert.equal(path, `organizations/${this.organization.id}/emit`)
			}
		}

		await this.ctx.sb.emitOrganization(
			this.organization.id,
			eventName,
			{ my: 'payload' },
			{},
			eventId
		)
	}
}

describe('EmitTests', function Tests() {
	new EmitTests(`${__dirname}/../../spruce-skill/`, this)
})
