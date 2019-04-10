// @flow
const { assert } = require('chai')
const { SpruceTest } = require('@sprucelabs/spruce-skill-server')

// SpruceTest take a single parameter, pointing to the base skill directory
class ExampleEmitTests extends SpruceTest(`${__dirname}/../../`) {
	organization: any
	location: any
	skill: any

	setup() {
        it('Can emitOrganization to "example:get-model" event', () => this.emitOrganization())
        it('Can emit to "example:get-model" event', () => this.emit())
    }
    
    async before() {
        await this.beforeBase()
		this.organization = this.mocks.sandbox.organization
		const locationId = Object.keys(this.mocks.sandbox.locations)[0]
        this.location = this.mocks.sandbox.locations[locationId]
        global.testEmitResponse = {}

    }


	async after() {
        await this.afterBase()
        
        // clean up for next tests
        delete global.testEmitResponse
	}

	async emitOrganization() {

        const payload = {
            id: 'uniqueId4'
        }

        const eventName = 'example:get-model'

        global.testEmitResponse[eventName] = [{
            error: null,
            payload: {
                model: {
                    id: 'uniqueId4'
                }
            }
        }]


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
            
            assert.equal(payload.model.id,  testData.payload.model.id)
        })

        delete global.testEmitResponse[eventName]
    }
    
    async emit() {

        const payload = {
            id: 'uniqueId4'
        }

        const eventName = 'example:get-model'

        global.testEmitResponse[eventName] = [{
            error: null,
            payload: {
                model: {
                    id: 'uniqueId4'
                }
            }
        }]

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

            assert.equal(payload.model.id,  testData.payload.model.id)
        })

        delete global.testEmitResponse[eventName]
	}

}

describe('ExampleEmitTests', function Tests() {
	this.timeout(30000)
	new ExampleEmitTests() // eslint-disable-line
})
