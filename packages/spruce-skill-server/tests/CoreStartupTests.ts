import { assert } from 'chai'
import SpruceTest from './SpruceTest'

class CoreStartupTests extends SpruceTest(`${__dirname}/../../spruce-skill`) {
	public setup(): void {
		it('Loads services', () => this.loadsServices())
	}

	public async loadsServices(): Promise<void> {
		assert.isOk(this.ctx.services)
		assert.isOk(this.ctx.services.acl)
		assert.isOk(this.ctx.services.cache)
		assert.isOk(this.ctx.services.cards)
		assert.isOk(this.ctx.services.mock)
		assert.isOk(this.ctx.services.onboarding)
		assert.isOk(this.ctx.services.sample)
		assert.isOk(this.ctx.services.uploads)
	}
}

describe('CoreStartupTests', function Tests() {
	new CoreStartupTests(this)
})
