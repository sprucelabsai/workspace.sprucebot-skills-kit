const _ = require('lodash')

module.exports = {
	// Gets current values of settings after checking to ensure the user has permission
	async getRequestedSettings({
		settings,
		requestedSettings,
		userId,
		locationId,
		organizationId
	}) {
		// Find the requested settings
		const aclsToGet = {}
		const fields = []

		settings.forEach(pageSetting => {
			if (pageSetting.cards) {
				for (let i = 0; i < pageSetting.cards.length; i += 1) {
					const card = pageSetting.cards[i]
					if (card.fields) {
						for (let j = 0; j < card.fields.length; j += 1) {
							const field = card.fields[j]
							if (
								!requestedSettings ||
								_.includes(requestedSettings, field.name)
							) {
								// Get acls
								fields.push(field)
								if (field.acls) {
									const slugs = Object.keys(field.acls)
									slugs.forEach(slug => {
										if (!aclsToGet[slug]) {
											aclsToGet[slug] = []
										}

										aclsToGet[slug] = aclsToGet[slug].concat(field.acls[slug])
									})
								}
							}
						}
					}
				}
			}
		})

		// Get the necessary ACLs
		const acls = await this.services.acl.getAcls({
			userId,
			locationId,
			organizationId,
			permissions: aclsToGet
		})

		// Verify the user has proper acl
		const settingsWithPermission = []
		fields.forEach(field => {
			let hasPermission = true
			if (field.acls) {
				const slugs = Object.keys(field.acls)
				slugs.forEach(slug => {
					const perms = field.acls[slug]

					for (let i = 0; i < perms.length; i += 1) {
						const perm = perms[i]
						if (!acls[slug] || acls[slug][perm] !== true) {
							// User does not have permission
							log.debug(`User does not have permission for ${slug}:${perm}`)
							hasPermission = false
							return
						}
					}
				})
			}

			if (hasPermission) {
				settingsWithPermission.push(field.name)
			}
		})

		// Get the actual settings
		const strRequestedSettings = requestedSettings.map(r => `"${r}"`)
		const query = `query {
			GetSettings (
				requestedSettings: [${strRequestedSettings.join(',')}]
				userId: ${userId ? `"${userId}"` : null}
				locationId: ${locationId ? `"${locationId}"` : null}
				organizationId: ${organizationId ? `"${organizationId}"` : null}
			) {
				settings
			}
		}`
		const result = await this.sb.query(query)

		return result.data.GetSettings ? result.data.GetSettings.settings : {}
	},
	// Used in the get-settings event. Filter out the settings to only the page requested and only the settings the user has permission to via acls
	async getSettings(options) {
		const page = options.page
		const settings = options.settings
		const auth = options.auth
		const overrides = options.overrides
		const userId = options.userId
		const locationId = options.locationId
		const organizationId = options.organizationId

		const pageSettings = settings.filter(s => s.page === page)

		// Do overrides and keep track of the acls we'll need to fetch
		const aclsToGet = {}
		pageSettings.forEach(pageSetting => {
			if (pageSetting.cards) {
				for (let i = 0; i < pageSetting.cards.length; i += 1) {
					const card = pageSetting.cards[i]
					if (card.fields) {
						for (let j = 0; j < card.fields.length; j += 1) {
							const field = card.fields[j]
							// Check if the field has an override
							const override = overrides.find(o => o.name === field.name)
							if (override && override.props) {
								field.props = {
									...field.props,
									...override.props
								}
							}

							// Get acls
							if (field.acls) {
								const slugs = Object.keys(field.acls)
								slugs.forEach(slug => {
									if (!aclsToGet[slug]) {
										aclsToGet[slug] = []
									}

									aclsToGet[slug] = aclsToGet[slug].concat(field.acls[slug])
								})
							}
						}
					}
				}
			}
		})

		const acls = await this.services.acl.getAcls({
			userId,
			locationId,
			organizationId,
			permissions: aclsToGet
		})

		const finalSettings = this.removeSettingsByAcls({
			settings: pageSettings,
			acls
		})

		return finalSettings
	},

	// Given settings and the acls, removes settings that the user does not have access to
	removeSettingsByAcls({ settings, acls }) {
		settings.forEach(pageSetting => {
			if (pageSetting.cards) {
				for (let i = 0; i < pageSetting.cards.length; i += 1) {
					const card = pageSetting.cards[i]
					if (card.fields) {
						for (let j = 0; j < card.fields.length; j += 1) {
							const field = card.fields[j]
							let isRemoved = false // prevent duplicate splicing
							// Check acls
							if (field.acls) {
								const slugs = Object.keys(field.acls)
								slugs.forEach(slug => {
									field.acls[slug].forEach(perm => {
										if (!isRemoved && (!acls[slug] || !acls[slug][perm])) {
											// Unset the field because the user does not have permission to view it
											card.fields.splice(j, 1)
											isRemoved = true
										}
									})
								})
							}
						}
					}
				}
			}
		})
		return settings
	}
}
