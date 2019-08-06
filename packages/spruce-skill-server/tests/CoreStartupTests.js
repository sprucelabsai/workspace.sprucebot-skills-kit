const assert = require('chai').assert
const SpruceTest = require('./SpruceTest')
const config = require('config')

class CoreStartupTests extends SpruceTest(`${__dirname}/../../spruce-skill/`) {
	setup() {
		it('Loads services', () => this.loadsServices())
	}

	async loadsServices() {
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
	this.timeout(30000)
	new CoreStartupTests()
})
