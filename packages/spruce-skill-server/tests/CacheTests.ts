import { assert } from 'chai'
import faker from 'faker'
import uuid from 'uuid'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'

class CacheTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Cache is connected', () => this.cacheIsConnected())
		it('Can set and get a key', () => this.setGetKey())
		it('Can set and get and delete a key', () => this.setDelKey())
		it('Can delete wildcards', () => this.delWildcard())
	}

	public async before(): Promise<void> {
		await super.before()
		this.ctx.services.cache.init({
			enable: true,
			adapter: 'memory'
		})
	}
	public async after(): Promise<void> {
		await super.after()
		this.ctx.services.cache.init({
			enable: false,
			adapter: 'memory'
		})
	}

	public async cacheIsConnected(): Promise<void> {
		assert.isTrue(this.ctx.services.cache.isConnected())
	}

	public async setGetKey(): Promise<void> {
		const key = uuid.v4()
		const val = faker.lorem.words()
		await this.ctx.services.cache.setAsync(key, val)
		const result = await this.ctx.services.cache.get(key)
		assert.equal(result, val)
	}

	public async setDelKey(): Promise<void> {
		const key = uuid.v4()
		const val = faker.lorem.words()
		await this.ctx.services.cache.setAsync(key, val)
		let result = await this.ctx.services.cache.get(key)
		assert.equal(result, val)
		await this.ctx.services.cache.delAsync(key)
		result = await this.ctx.services.cache.get(key)
		assert.isUndefined(result)
	}

	public async delWildcard(): Promise<void> {
		const keysToDel = [
			'testing-del-1',
			'testing-del-2',
			'testing-del-3',
			'testing-del-4',
			'testing-del-5',
			'testing-del-6'
		]
		const keeperKey = 'testing-deblah'

		const keeperVal = faker.lorem.words()
		await this.ctx.services.cache.setAsync(keeperKey, keeperVal)

		for (let i = 0; i < keysToDel.length; i += 1) {
			const k = keysToDel[i]
			const val = faker.lorem.words()
			await this.ctx.services.cache.setAsync(k, val)
		}

		for (let i = 0; i < keysToDel.length; i += 1) {
			const k = keysToDel[i]
			const val = await this.ctx.services.cache.get(k)
			assert.isOk(val)
		}

		await this.ctx.services.cache.delWildcardAsync('testing-del*')

		for (let i = 0; i < keysToDel.length; i += 1) {
			const k = keysToDel[i]
			const val = await this.ctx.services.cache.get(k)
			assert.isUndefined(val)
		}

		const resultKeeper = await this.ctx.services.cache.get(keeperKey)
		assert.equal(resultKeeper, keeperVal)
	}
}

describe('CacheTests', function Tests() {
	new CacheTests(`${__dirname}/../../spruce-skill`, this as any)
})
