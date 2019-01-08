const _ = require('lodash')

module.exports = {
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

	removeSettingsByAcls({ settings, acls }) {
		settings.forEach(pageSetting => {
			if (pageSetting.cards) {
				for (let i = 0; i < pageSetting.cards.length; i += 1) {
					const card = pageSetting.cards[i]
					if (card.fields) {
						for (let j = 0; j < card.fields.length; j += 1) {
							const field = card.fields[j]
							// Check acls
							if (field.acls) {
								const slugs = Object.keys(field.acls)
								slugs.forEach(slug => {
									field.acls[slug].forEach(perm => {
										if (!acls[slug] || !acls[slug][perm]) {
											// Unset the field because the user does not have permission to view it
											card.fields.splice(j, 1)
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
