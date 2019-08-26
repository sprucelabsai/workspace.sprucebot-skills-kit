/* eslint-disable @typescript-eslint/camelcase */
import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import config from 'config'
import { ISpruceContext } from '../interfaces/ctx'

class ACLTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
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

		it('Can check individual acls for org', () => this.checkIndividualOrgAcls())
		it('Can check individual acls for location', () =>
			this.checkIndividualLocationAcls())
	}

	public async checkLocationAcls(as: string): Promise<void> {
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
				[config.get<string>('SLUG')]: ['can_do_example_location']
			},
			locationId: this.location.id,
			organizationId: this.organization.id
		})

		assert.equal(isAuthorized, expected)
	}

	public async checkOrganizationAcls(as: string): Promise<void> {
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
				[config.get<string>('SLUG')]: ['can_do_example_organization']
			},
			organizationId: this.organization.id
		})

		assert.equal(isAuthorized, expected)
	}

	public async checkMultipleAcls(as: string): Promise<void> {
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
				[config.get<string>('SLUG')]: [
					'can_do_example_organization',
					'can_do_example_location_owner_only'
				]
			},
			organizationId: this.organization.id
		})

		assert.equal(isAuthorized, expected)
	}

	public async aclUndefined(): Promise<void> {
		const isAuthorized = await this.ctx.services.acl.userIsAuthorizedForAcls({
			userId: this.organization.owner[0].id,
			permissions: {
				[config.get<string>('SLUG')]: ['not_a_real_permission']
			},
			locationId: this.location.id,
			organizationId: this.organization.id
		})

		assert.isFalse(isAuthorized)
	}

	public async invalidSlug(): Promise<void> {
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

	public async missingParametersUserId(): Promise<void> {
		let didThrow = false
		try {
			// @ts-ignore: Missing parameter error
			await this.ctx.services.acl.userIsAuthorizedForAcls({
				permissions: {
					[config.get<string>('SLUG')]: ['can_do_example_location']
				},
				locationId: this.location.id,
				organizationId: this.organization.id
			})
		} catch (e) {
			didThrow = true
		}
		assert.isTrue(didThrow)
	}

	public async missingParametersOrganizationId(): Promise<void> {
		let didThrow = false
		try {
			// @ts-ignore: missing parameter error
			await this.ctx.services.acl.userIsAuthorizedForAcls({
				userId: 'taco-bravo',
				permissions: {
					[config.get<string>('SLUG')]: ['can_do_example_location']
				},
				locationId: this.location.id
			})
		} catch (e) {
			didThrow = true
		}
		assert.isTrue(didThrow)
	}

	public async missingParametersPermissions(): Promise<void> {
		let didThrow = false
		try {
			// @ts-ignore: missing parameter error
			await this.ctx.services.acl.userIsAuthorizedForAcls({
				userId: 'tacobravo',
				locationId: this.location.id,
				organizationId: this.organization.id
			})
		} catch (e) {
			didThrow = true
		}
		assert.isTrue(didThrow)
	}

	async checkIndividualOrgAcls(userId) {
		const acls = await this.ctx.services.acl.getAcls({
			permissions: {
				[config.SLUG]: [
					'can_do_example_organization',
					'can_do_example_organization_owner_only'
				]
			},
			userId: this.organization.groupManager[0].id,
			organizationId: this.organization.id
		})

		const {
			can_do_example_organization,
			can_do_example_organization_owner_only
		} = get(acls, config.SLUG)

		assert.isTrue(can_do_example_organization)
		assert.isFalse(can_do_example_organization_owner_only)
	}

	async checkIndividualLocationAcls(userId) {
		const acls = await this.ctx.services.acl.getAcls({
			permissions: {
				[config.SLUG]: [
					'can_do_example_location',
					'can_do_example_location_owner_only'
				]
			},
			locationId: this.location.id,
			userId: this.location.teammate[0].id,
			organizationId: this.organization.id
		})

		const { can_do_example_location, can_do_example_location_owner_only } = get(
			acls,
			config.SLUG
		)

		assert.isTrue(can_do_example_location)
		assert.isFalse(can_do_example_location_owner_only)
	}
}

describe('ACLTests', function Tests() {
	new ACLTests(`${__dirname}/../../spruce-skill/`, this)
})
