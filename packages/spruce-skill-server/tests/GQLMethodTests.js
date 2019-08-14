const assert = require('chai').assert
const SpruceTest = require('./SpruceTest')
const config = require('config')
const faker = require('faker')

class GQLMethodTests extends SpruceTest(`${__dirname}/../../spruce-skill/`) {
	setup() {
		it('Can call query', () => this.doQuery())
		it('Can not call query as mutation', () => this.doQueryAsMutate())
		it('Can call mutation', () => this.doMutate())
		it('Can not call mutation as query', () => this.doMutateAsQuery())
	}

	async doQuery() {
		const result = await this.ctx.sb.query(`
		{
				Location (
				id: "${this.location.id}"
			) {
				name
			}
		}`)
		assert.isOk(result.data.Location.name)
	}

	async doQueryAsMutate() {
		const result = await this.ctx.sb.mutation(`
		{
				Location (
				id: "${this.location.id}"
			) {
				name
			}
		}`)
		assert.isUndefined(result.data)
		assert.isOk(result.errors)
		assert.isOk(result.errors[0])
	}

	async doMutate() {
		const result = await this.ctx.sb.mutation(`
		{
			updateLocation (input: {
				id: "${this.location.id}"
				name: "${faker.lorem.words()}"
			}) {
				Location {
					name
				}
			}
		}`)
		assert.isOk(result.data.updateLocation.Location.name)
	}

	async doMutateAsQuery() {
		const result = await this.ctx.sb.query(`
		{
			updateLocation (input: {
				id: "${this.location.id}"
				name: "${faker.lorem.words()}"
			}) {
				Location {
					name
				}
			}
		}`)
		assert.isUndefined(result.data)
		assert.isOk(result.errors)
		assert.isOk(result.errors[0])
	}
}

describe('GQLMethodTests', function Tests() {
	this.timeout(30000)
	new GQLMethodTests()
})
