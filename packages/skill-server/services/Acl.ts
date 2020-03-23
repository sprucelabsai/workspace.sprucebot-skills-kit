import Debug from 'debug'
import SpruceSkillService from '../lib/SpruceSkillService'
import { ISpruceContext } from '../interfaces/ctx'
const debug = Debug('spruce-skill-server')
// This service can be accessed by ctx.services.acl from the controllers

interface IAclPermissions {
	[skillSlugV2: string]: string[]
}

export interface IAclsResult {
	[skillSlugV2: string]: {
		[permission: string]: boolean
	}
}

interface IAcl {
	slug: string
	permissions: {
		name: string
		value: boolean
	}[]
}

export default class AclService extends SpruceSkillService<ISpruceContext> {
	/**
	 * Returns individual ACLs which can then be handled however you like
	 */
	public async getAcls(options: {
		userId: string
		organizationId: string
		locationId?: string | null
		permissions: IAclPermissions
	}): Promise<IAclsResult> {
		const { userId, permissions, locationId, organizationId } = options
		const query = `
		{
			Acls (
				userId: "${userId}"
				${locationId ? `locationId: "${locationId}"` : ''}
				organizationId: "${organizationId}"
				permissions: ${this.stringify(permissions)}
			) {
				slug
				permissions {
					name
					value
				}
			}
		}`
		const result = await this.ctx.sb.query(query)
		const resultAcls = result.data && (result.data.Acls as IAcl[])

		const acls: IAclsResult = {}

		if (resultAcls) {
			resultAcls.forEach(acl => {
				if (acl && acl.slug && acl.permissions) {
					if (!acls[acl.slug]) {
						acls[acl.slug] = {}
					}
					acl.permissions.forEach(permission => {
						const perm = permission.name
						const value = permission.value
						acls[acl.slug][perm] = value
					})
				}
			})
		}

		return acls
	}

	/**
	 * Checks that all acls are true
	 */
	public async userIsAuthorizedForAcls(options: {
		userId: string
		organizationId: string
		locationId?: string | null
		permissions: IAclPermissions
	}): Promise<boolean> {
		const { userId, permissions, locationId, organizationId } = options
		let query

		debug(`Checking ACL permissions`, options)

		if (!userId || !organizationId) {
			throw new Error(
				'Missing required parameters "userId" and "organizationId" for ACL check'
			)
		}

		if (!permissions) {
			throw new Error('Missing required parameter "permissions" for ACL check')
		}

		if (locationId) {
			query = `
			{
				Acls (
					userId: "${userId}"
					locationId: "${locationId}"
					organizationId: "${organizationId}"
					permissions: ${this.stringify(permissions)}
				) {
					slug
					permissions {
						name
						value
					}
				}
			}`
		} else {
			query = `
			{
				Acls (
					userId: "${userId}"
					organizationId: "${organizationId}"
					permissions: ${this.stringify(permissions)}
				) {
					slug
					permissions {
						name
						value
					}
				}
			}`
		}
		const result = await this.ctx.sb.query(query)

		const permsHash: Record<string, any> = {}
		Object.keys(permissions).forEach(slug => {
			permissions[slug].forEach(perm => {
				permsHash[`${slug}:${perm}`] = false
			})
		})

		if (result.data && result.data.Acls) {
			for (let i = 0; i < result.data.Acls.length; i += 1) {
				const acl = result.data.Acls[i]
				if (acl && acl.slug && acl.permissions) {
					for (let j = 0; j < acl.permissions.length; j += 1) {
						const permission = acl.permissions[j]
						permsHash[`${acl.slug}:${permission.name}`] =
							permission.value === true
						if (permission.value === false) {
							return false
						}
					}
				}
			}
		} else {
			debug(`ACL check query failed`, {
				data: result.data,
				errors: result.errors
			})
			return false
		}

		const isAllowed = Object.values(permsHash).every(value => value === true)

		return isAllowed
	}

	// From: https://stackoverflow.com/questions/11233498/json-stringify-without-quotes-on-properties
	private stringify(
		objFromJSON: Record<string, any> | Record<string, any>[]
	): string {
		if (typeof objFromJSON !== 'object' || Array.isArray(objFromJSON)) {
			// not an object, stringify using native function
			return JSON.stringify(objFromJSON)
		}
		// Implements recursive object serialization according to JSON spec
		// but without quotes around the keys.
		const props = Object.keys(objFromJSON)
			.map(key => `${key}:${this.stringify(objFromJSON[key])}`)
			.join(',')
		return `{${props}}`
	}
}
