const assert = require('chai').assert
const SpruceTest = require('./SpruceTest')
const config = require('config')

class ACLTests extends SpruceTest(`${__dirname}/../../spruce-skill/`) {
	setup() {
		it('Checks location acls as owner', () => this.checkLocationAcls('owner'))
		it('Checks location acls as groupManager', () =>
			this.checkLocationAcls('groupManager'))
		it('Checks location acls as manager', () =>
			this.checkLocationAcls('manager'))
		it('Checks location acls as teammate', () =>
			this.checkLocationAcls('teammate'))
		it('Checks location acls as guest', () => this.checkLocationAcls('guest'))

		it('Checks organization acls as owner', () =>
			this.checkOrganizationAcls('owner'))
		it('Checks organization acls as groupManager', () =>
			this.checkOrganizationAcls('groupManager'))
		it('Checks organization acls as manager', () =>
			this.checkOrganizationAcls('manager'))
		it('Checks organization acls as teammate', () =>
			this.checkOrganizationAcls('teammate'))
		it('Checks organization acls as guest', () =>
			this.checkOrganizationAcls('guest'))

		it('Checks multiple acls as owner', () => this.checkMultipleAcls('owner'))
		it('Checks multiple acls as groupManager', () =>
			this.checkMultipleAcls('groupManager'))
		it('Checks multiple acls as manager', () =>
			this.checkMultipleAcls('manager'))
		it('Checks multiple acls as teammate', () =>
			this.checkMultipleAcls('teammate'))
		it('Checks multiple acls as guest', () => this.checkMultipleAcls('guest'))

		it('Returns false for acl that is not defined', () => this.aclUndefined())
		it('Returns false for invalid slug', () => this.invalidSlug())
		it('Throws error on missing parameter userId', () =>
			this.missingParametersUserId())
		it('Throws error on missing parameter organizationId', () =>
			this.missingParametersOrganizationId())
		it('Throws error on missing parameter permissions', () =>
			this.missingParametersPermissions())
	}

	async checkLocationAcls(as) {
		let expected
		let userId

		switch (as) {
			case 'owner':
				expected = true
				userId = this.organization.owner[0].id
				break
			case 'groupManager':
				expected = true
				userId = this.organization.groupManager[0].id
				break
			case 'manager':
				expected = true
				userId = this.location.owner[0].id
				break
			case 'teammate':
				expected = true
				userId = this.location.teammate[0].id
				break
			case 'guest':
				expected = false
				userId = this.location.guest[0].id
				break

			default:
				throw new Error('Invalid option')
		}

		const isAuthorized = await this.ctx.services.acl.userIsAuthorizedForAcls({
			userId,
			permissions: {
				[config.SLUG]: ['can_do_example_location']
			},
			locationId: this.location.id,
			organizationId: this.organization.id
		})

		assert.equal(isAuthorized, expected)
	}

	async checkOrganizationAcls(as) {
		let expected
		let userId

		switch (as) {
			case 'owner':
				expected = true
				userId = this.organization.owner[0].id
				break
			case 'groupManager':
				expected = true
				userId = this.organization.groupManager[0].id
				break
			case 'manager':
				expected = true
				userId = this.location.owner[0].id
				break
			case 'teammate':
				expected = true
				userId = this.location.teammate[0].id
				break
			case 'guest':
				expected = false
				userId = this.location.guest[0].id
				break

			default:
				throw new Error('Invalid option')
		}

		const isAuthorized = await this.ctx.services.acl.userIsAuthorizedForAcls({
			userId,
			permissions: {
				[config.SLUG]: ['can_do_example_organization']
			},
			organizationId: this.organization.id
		})

		assert.equal(isAuthorized, expected)
	}

	async checkMultipleAcls(as) {
		let expected
		let userId

		switch (as) {
			case 'owner':
				expected = true
				userId = this.organization.owner[0].id
				break
			case 'groupManager':
				expected = false
				userId = this.organization.groupManager[0].id
				break
			case 'manager':
				expected = false
				userId = this.location.owner[0].id
				break
			case 'teammate':
				expected = false
				userId = this.location.teammate[0].id
				break
			case 'guest':
				expected = false
				userId = this.location.guest[0].id
				break

			default:
				throw new Error('Invalid option')
		}

		const isAuthorized = await this.ctx.services.acl.userIsAuthorizedForAcls({
			userId,
			permissions: {
				[config.SLUG]: [
					'can_do_example_organization',
					'can_do_example_location_owner_only'
				]
			},
			organizationId: this.organization.id
		})

		assert.equal(isAuthorized, expected)
	}

	async aclUndefined() {
		const isAuthorized = await this.ctx.services.acl.userIsAuthorizedForAcls({
			userId: this.organization.owner[0].id,
			permissions: {
				[config.SLUG]: ['not_a_real_permission']
			},
			locationId: this.location.id,
			organizationId: this.organization.id
		})

		assert.isFalse(isAuthorized)
	}

	async invalidSlug() {
		const isAuthorized = await this.ctx.services.acl.userIsAuthorizedForAcls({
			userId: this.organization.owner[0].id,
			permissions: {
				not_a_real_slug: ['can_do_example_location']
			},
			locationId: this.location.id,
			organizationId: this.organization.id
		})

		assert.isFalse(isAuthorized)
	}

	async missingParametersUserId() {
		let didThrow = false
		try {
			await this.ctx.services.acl.userIsAuthorizedForAcls({
				permissions: {
					[config.SLUG]: ['can_do_example_location']
				},
				locationId: this.location.id,
				organizationId: this.organization.id
			})
		} catch (e) {
			didThrow = true
		}
		assert.isTrue(didThrow)
	}

	async missingParametersOrganizationId() {
		let didThrow = false
		try {
			await this.ctx.services.acl.userIsAuthorizedForAcls({
				userId,
				permissions: {
					[config.SLUG]: ['can_do_example_location']
				},
				locationId: this.location.id
			})
		} catch (e) {
			didThrow = true
		}
		assert.isTrue(didThrow)
	}

	async missingParametersPermissions() {
		let didThrow = false
		try {
			await this.ctx.services.acl.userIsAuthorizedForAcls({
				userId,
				locationId: this.location.id,
				organizationId: this.organization.id
			})
		} catch (e) {
			didThrow = true
		}
		assert.isTrue(didThrow)
	}
}

describe('ACLTests', function Tests() {
	this.timeout(30000)
	new ACLTests()
})
