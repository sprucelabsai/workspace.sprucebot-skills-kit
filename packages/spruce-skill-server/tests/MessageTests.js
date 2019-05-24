const assert = require('chai').assert
const faker = require('faker')
const SpruceTest = require('./SpruceTest')
const config = require('config')

class MessageTests extends SpruceTest(`${__dirname}/../../spruce-skill/`) {
	setup() {
		it('Sends a message as promotional by default', () =>
			this.sendMessageDefault())
		it('Sends a message as promotional', () => this.sendMessagePromotional())
		it('Sends a message as transactional', () =>
			this.sendMessageTransactional())
	}

	async sendMessageDefault() {
		const result = await this.ctx.sb.message(
			this.location.id,
			this.location.guest[0].id,
			faker.lorem.sentences()
		)

		assert.equal(result.requestOptions.data.type, 'promotional')
	}

	async sendMessagePromotional() {
		const result = await this.ctx.sb.message(
			this.location.id,
			this.location.guest[0].id,
			faker.lorem.sentences(),
			{
				type: 'promotional'
			}
		)

		assert.equal(result.requestOptions.data.type, 'promotional')
	}

	async sendMessageTransactional() {
		const result = await this.ctx.sb.message(
			this.location.id,
			this.location.guest[0].id,
			faker.lorem.sentences(),
			{
				type: 'transactional'
			}
		)

		assert.equal(result.requestOptions.data.type, 'transactional')
	}
}

describe('MessageTests', function Tests() {
	this.timeout(30000)
	new MessageTests()
})
