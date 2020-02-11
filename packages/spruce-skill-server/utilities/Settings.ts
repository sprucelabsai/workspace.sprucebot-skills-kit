import includes from 'lodash/includes'
import SpruceSkillUtility from '../lib/SpruceSkillUtility'
import { ISpruceContext } from '../interfaces/ctx'
import {
	ISprucePageSettings,
	ISpruceSettingsField
} from '@sprucelabs/spruce-types'
import { IAclsResult } from '../services/Acl'

interface IGetRequestedSettingsOptions {
	settings: ISprucePageSettings[]
	requestedSettings: string[]
	userId: string
	locationId?: string
	organizationId: string
}

interface IGetSettingsOptions {
	page: string
	settings: ISprucePageSettings[]
	userId: string
	locationId?: string
	organizationId: string
	overrides: ISpruceSettingsField[]
}

interface IRemoveSettingsByAclsOptions {
	settings: ISprucePageSettings[]
	acls: IAclsResult
}

export default class Settings extends SpruceSkillUtility<ISpruceContext> {
	// Gets current values of settings after checking to ensure the user has permission
	public getRequestedSettings = async (
		options: IGetRequestedSettingsOptions
	): Promise<ISprucePageSettings> => {
		const {
			settings,
			requestedSettings,
			userId,
			locationId,
			organizationId
		} = options

		// Find the requested settings
		const aclsToGet: Record<string, any> = {}
		const fields: ISpruceSettingsField[] = []

		settings.forEach(pageSetting => {
			if (pageSetting.sections) {
				for (let i = 0; i < pageSetting.sections.length; i += 1) {
					const section = pageSetting.sections[i]
					if (section.fields) {
						for (let j = 0; j < section.fields.length; j += 1) {
							const field = section.fields[j]
							if (
								field &&
								(!requestedSettings || includes(requestedSettings, field.name))
							) {
								// Get acls
								fields.push(field)
								if (field.acls) {
									const slugs = Object.keys(field.acls)
									slugs.forEach(slug => {
										if (!aclsToGet[slug]) {
											aclsToGet[slug] = []
										}

										if (field.acls) {
											aclsToGet[slug] = aclsToGet[slug].concat(field.acls[slug])
										}
									})
								}
							}
						}
					}
				}
			}
		})

		// Get the necessary ACLs
		const acls = await this.ctx.services.acl.getAcls({
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
					if (!field.acls) {
						return
					}
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
		const result = await this.ctx.sb.query(query)

		return result.data.GetSettings ? result.data.GetSettings.settings : {}
	}
	// Used in the get-settings event. Filter out the settings to only the page requested and only the settings the user has permission to via acls
	public async getSettings(
		options: IGetSettingsOptions
	): Promise<ISprucePageSettings[]> {
		const {
			page,
			settings,
			overrides,
			userId,
			locationId,
			organizationId
		} = options

		const pageSettings = settings.filter(s => s.page === page)

		// Do overrides and keep track of the acls we'll need to fetch
		const aclsToGet: {
			[slug: string]: string[]
		} = {}

		pageSettings.forEach(pageSetting => {
			if (pageSetting.sections) {
				for (let i = 0; i < pageSetting.sections.length; i += 1) {
					const card = pageSetting.sections[i]
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

									if (field.acls) {
										aclsToGet[slug] = aclsToGet[slug].concat(field.acls[slug])
									}
								})
							}
						}
					}
				}
			}
		})

		const acls = await this.ctx.services.acl.getAcls({
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
	}

	// Given settings and the acls, removes settings that the user does not have access to
	public removeSettingsByAcls(
		options: IRemoveSettingsByAclsOptions
	): ISprucePageSettings[] {
		const { settings, acls } = options
		settings.forEach(pageSetting => {
			if (pageSetting.sections) {
				for (let i = 0; i < pageSetting.sections.length; i += 1) {
					const card = pageSetting.sections[i]
					if (card.fields) {
						for (let j = 0; j < card.fields.length; j += 1) {
							const field = card.fields[j]
							let isRemoved = false // prevent duplicate splicing
							// Check acls
							if (field.acls) {
								const slugs = Object.keys(field.acls)
								slugs.forEach(slug => {
									if (!field.acls) {
										return
									}
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
