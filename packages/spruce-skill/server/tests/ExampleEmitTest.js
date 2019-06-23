// @flow
const { assert } = require('chai')
const { SpruceTest } = require('@sprucelabs/spruce-skill-server')

// SpruceTest take a single parameter, pointing to the base skill directory
class ExampleEmitTests extends SpruceTest(`${__dirname}/../../`) {
	organization: any
	location: any
	skill: any

	setup() {
		it('Can emitOrganization to "example:get-model" event', () =>
			this.emitOrganization())
		it('Can emit to "example:get-model" event', () => this.emit())
		it('Can trigger callback from emit', () => this.emitCallback())
	}

	async emitOrganization() {
		const payload = {
			id: 'uniqueId4'
		}

		const eventName = 'example:get-model'

		global.testEmitResponse[eventName] = [
			{
				error: null,
				payload: {
					model: {
						id: 'uniqueId4'
					}
				}
			}
		]

		const result = await this.koa.context.sb.emitOrganization(
			this.organization.id,
			eventName,
			payload
		)

		assert.isArray(result)
		assert.equal(result.length, 1)

		result.forEach((data, index) => {
			const payload = data.payload
			const testData = global.testEmitResponse[eventName][index]

			assert.equal(payload.model.id, testData.payload.model.id)
		})

		delete global.testEmitResponse[eventName]
	}

	async emit() {
		const payload = {
			id: 'uniqueId4'
		}

		const eventName = 'example:get-model'

		global.testEmitResponse[eventName] = [
			{
				error: null,
				payload: {
					model: {
						id: 'uniqueId4'
					}
				}
			}
		]

		const result = await this.koa.context.sb.emit(
			this.organization.id,
			eventName,
			payload
		)
		assert.isArray(result)
		assert.equal(result.length, 1)

		result.forEach((data, index) => {
			const payload = data.payload
			const testData = global.testEmitResponse[eventName][index]

			assert.equal(payload.model.id, testData.payload.model.id)
		})
	}

	async emitCallback() {
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

		const result = await this.koa.context.sb.emit(
			this.organization.id,
			eventName,
			payload
		)
		assert.isTrue(didFire)
		assert.isArray(result)
		assert.equal(result.length, 1)

		result.forEach((data, index) => {
			const payload = data.payload
			const testData = global.testEmitResponse[eventName].data[index]

			assert.equal(payload.model.id, testData.payload.model.id)
		})
	}
}

describe('ExampleEmitTests', function Tests() {
	this.timeout(30000)
	new ExampleEmitTests() // eslint-disable-line
})
