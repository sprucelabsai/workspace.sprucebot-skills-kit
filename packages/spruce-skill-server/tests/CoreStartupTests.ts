import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'

class CoreStartupTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Loads services', () => this.loadsServices())
	}

	public async loadsServices(): Promise<void> {
		assert.isOk(this.ctx.services)
		assert.isOk(this.ctx.services.acl)
		assert.isOk(this.ctx.services.cache)
		assert.isOk(this.ctx.services.onboarding)
		assert.isOk(this.ctx.services.uploads)
	}
}

describe('CoreStartupTests', function Tests() {
	new CoreStartupTests(`${__dirname}/../../spruce-skill`, this)
})
