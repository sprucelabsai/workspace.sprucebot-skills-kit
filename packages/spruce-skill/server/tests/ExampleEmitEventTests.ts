import { assert } from 'chai'
import { SpruceTest } from '@sprucelabs/spruce-skill-server'
import { ISkillContext } from 'server/interfaces/ctx'
import { IEmitResponse, IEmitResponseCallback } from 'server/interfaces/global'
import config from 'config'
// import { SpruceEvents } from 'server/interfaces/events-generated'

// SpruceTest take a single parameter, pointing to the base skill directory
class ExampleEmitTests extends SpruceTest<ISkillContext> {
	public setup(): void {
		if (config.TESTING_SKILLS_KIT) {
			it('Can emitOrganization to "example:get-model" event', () =>
				this.emitOrganization())
			it('Can emit to "example:get-model" event', () => this.emit())
			it('Can trigger callback from emit', () => this.emitCallback())
			it('Can emit with strong types', () => this.strongTypes())
		}
	}

	public async emitOrganization(): Promise<void> {
		const payload = {
			id: 'uniqueId4'
		}

		const eventName = 'example:get-model'

		global.testEmitResponse[eventName] = [
			{
				error: null,
				skill: { name: 'test', slug: 'test' },
				payload: {
					model: {
						id: 'uniqueId4'
					}
				}
			}
		]

		const result = await this.ctx.sb.emitOrganization(
			this.organization.id,
			eventName,
			payload
		)

		assert.isArray(result)
		assert.equal(result.length, 1)

		result.forEach((data, index) => {
			const payload = data.payload
			const testData = (global.testEmitResponse[eventName] as IEmitResponse[])[
				index
			]

			assert.equal(payload.model.id, testData.payload.model.id)
		})

		delete global.testEmitResponse[eventName]
	}

	public async emit(): Promise<any> {
		const payload = {
			id: 'uniqueId4'
		}

		const eventName = 'example:get-model'

		global.testEmitResponse[eventName] = [
			{
				error: null,
				skill: { name: 'test', slug: 'test' },
				payload: {
					model: {
						id: 'uniqueId4'
					}
				}
			}
		]

		const result = await this.ctx.sb.emit(
			this.organization.id,
			eventName,
			payload
		)
		assert.isArray(result)
		assert.equal(result.length, 1)

		result.forEach((data, index) => {
			const payload = data.payload
			const testData = (global.testEmitResponse[eventName] as IEmitResponse[])[
				index
			]

			assert.equal(payload.model.id, testData.payload.model.id)
		})
	}

	public async emitCallback(): Promise<void> {
		const payload = {
			id: 'uniqueId4'
		}

		const eventName = 'example:get-model'

		let didFire = false
		global.testEmitResponse[eventName] = {
			callback: async ({ data, query }) => {
				assert.isUndefined(query)
				assert.isDefined(data)
				didFire = true
			},
			data: [
				{
					error: null,
					payload: {
						model: {
							id: 'uniqueId4'
						}
					}
				}
			]
		}

		const result = await this.ctx.sb.emit(
			this.organization.id,
			eventName,
			payload
		)
		assert.isTrue(didFire)
		assert.isArray(result)
		assert.equal(result.length, 1)

		result.forEach((data, index) => {
			const payload = data.payload
			const emitResponse = global.testEmitResponse[
				eventName
			] as IEmitResponseCallback
			const testData = emitResponse.data && emitResponse.data[index]

			assert.equal(payload.model.id, testData.payload.model.id)
		})
	}

	public async strongTypes(): Promise<void> {
		// Example of using strong type w/ emit
		// await this.ctx.sb.emit<SpruceEvents.core.DidCreateCalendarEvent.IPayload>(
		// 	'123-location-id',
		// 	SpruceEvents.core.DidCreateCalendarEvent.eventName,
		// 	{
		// 		calendarId: 'my-calendar',
		// 		calendarEvent: {
		// 			id: '123'
		// 		}
		// 	}
		// )
	}
}

describe('ExampleEmitTests', function Tests() {
	this.timeout(30000)
	new ExampleEmitTests(`${__dirname}/../../`) // eslint-disable-line
})
