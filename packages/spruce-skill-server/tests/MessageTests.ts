import faker from 'faker'

import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'
import { IMessageType } from '@sprucelabs/spruce-node'

class MessageTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Sends a message as promotional by default', () =>
			this.sendMessageDefault())
		it('Sends a message as promotional', () => this.sendMessagePromotional())
		it('Sends a message as transactional', () =>
			this.sendMessageTransactional())
	}

	public async sendMessageDefault(): Promise<void> {
		const result = await this.ctx.sb.message(
			this.location.id,
			this.location.guest[0].id,
			faker.lorem.sentences()
		)

		assert.equal(result.requestOptions.data.type, 'promotional')
	}

	public async sendMessagePromotional(): Promise<void> {
		const result = await this.ctx.sb.message(
			this.location.id,
			this.location.guest[0].id,
			faker.lorem.sentences(),
			{
				type: IMessageType.Promotional
			}
		)

		assert.equal(result.requestOptions.data.type, 'promotional')
	}

	public async sendMessageTransactional(): Promise<void> {
		const result = await this.ctx.sb.message(
			this.location.id,
			this.location.guest[0].id,
			faker.lorem.sentences(),
			{
				type: IMessageType.Transactional
			}
		)

		assert.equal(result.requestOptions.data.type, 'transactional')
	}
}

describe('MessageTests', function Tests() {
	new MessageTests(`${__dirname}/../../spruce-skill/`, this)
})
