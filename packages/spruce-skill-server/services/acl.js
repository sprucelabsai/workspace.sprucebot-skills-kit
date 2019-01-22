// This service can be accessed by ctx.services.acl from the controllers

// From: https://stackoverflow.com/questions/11233498/json-stringify-without-quotes-on-properties
function stringify(obj_from_json) {
	if (typeof obj_from_json !== 'object' || Array.isArray(obj_from_json)) {
		// not an object, stringify using native function
		return JSON.stringify(obj_from_json)
	}
	// Implements recursive object serialization according to JSON spec
	// but without quotes around the keys.
	let props = Object.keys(obj_from_json)
		.map(key => `${key}:${stringify(obj_from_json[key])}`)
		.join(',')
	return `{${props}}`
}

module.exports = {
	async getAcls(options) {
		const { userId, permissions, locationId, organizationId } = options
		const query = `
		{
			Acls (
				userId: "${userId}"
				locationId: "${locationId}"
				organizationId: "${organizationId}"
				permissions: ${stringify(permissions)}
			) {
				slug
				permissions {
					name
					value
				}
			}
		}`
		const result = await this.sb.query(query)

		const acls = {}

		if (result.data && result.data.Acls) {
			result.data.Acls.forEach(acl => {
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
	},
	async userIsAuthorizedForAcls(options) {
		const { userId, permissions, locationId, organizationId } = options
		const query = `
		{
			Acls (
				userId: "${userId}"
				locationId: "${locationId}"
				organizationId: "${organizationId}"
				permissions: ${stringify(permissions)}
			) {
				slug
				permissions {
					name
					value
				}
			}
		}`
		const result = await this.sb.query(query)

		if (result.data && result.data.Acls) {
			for (let i = 0; i < result.data.Acls.length; i += 1) {
				const acl = result.data.Acls[i]
				if (acl && acl.slug && acl.permissions) {
					for (let j = 0; j < acl.permissions.length; j += 1) {
						const permission = acl.permissions[j]
						if (permission.value === false) {
							return false
						}
					}
				}
			}
		}

		return true
	}
}