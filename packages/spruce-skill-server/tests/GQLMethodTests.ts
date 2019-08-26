import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'
import faker from 'faker'

class GQLMethodTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Can call query', () => this.doQuery())
		it('Can not call query as mutation', () => this.doQueryAsMutate())
		it('Can call mutation', () => this.doMutate())
		it('Can not call mutation as query', () => this.doMutateAsQuery())
	}

	public async doQuery(): Promise<void> {
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

	public async doQueryAsMutate(): Promise<void> {
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

	public async doMutate(): Promise<void> {
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

	public async doMutateAsQuery(): Promise<void> {
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
	new GQLMethodTests(`${__dirname}/../../spruce-skill/`, this)
})
