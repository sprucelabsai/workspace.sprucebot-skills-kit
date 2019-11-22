import { ISkillEventContextV2 } from 'server/interfaces/ctx'
import { SpruceEvents } from 'server/interfaces/events-generated'
import { SpruceSettingsFieldType } from '@sprucelabs/spruce-types'
import config from 'config'
import { eventError } from '../lib/errorHandler'

export default async (
	ctx: ISkillEventContextV2<
		SpruceEvents.core.GetSettings.IPayload,
		SpruceEvents.core.GetSettings.IResponseBody
	>,
	next: () => Promise<any>
) => {
	try {
		log.debug('**** get-settings', { event: ctx.event })
		if (!ctx.event.payload || !ctx.event.payload.page) {
			throw new Error('INVALID_PAYLOAD')
		}

		const { auth } = ctx
		if (!auth) {
			log.warn('Tried to get settings without auth')
			throw new Error('NOT_AUTHORIZED')
		}
		const userId = auth.User && auth.User.id
		const organizationId = auth.Organization && auth.Organization.id
		const locationId = auth.Location && auth.Location.id

		if (!userId || !organizationId) {
			log.warn('Auth is missing userId or organizationId')
			throw new Error('NOT_AUTHORIZED')
		}

		/*
			ctx.utilities.settings.getSettings() is a helper method that will:
			1. Filter the settings returned based on the setting "page"
			2. Filter the settings returned based on the setting "acls"
		*/
		const settings = await ctx.utilities.settings.getSettings({
			page: ctx.event.payload.page,
			settings: config.settings, // Define your settings in config/settings.js
			userId,
			organizationId,
			locationId,
			overrides: [
				// Override certain settings values here. A use case here is localization.
				{
					type: SpruceSettingsFieldType.Text,
					name: 'receive_notifications',
					props: {
						helper: 'Heres a special helper.'
					}
				},
				{
					type: SpruceSettingsFieldType.Text,
					name: 'can_do_another_thing',
					props: {
						iconAfter: 'caution'
					}
				}
			]
		})

		ctx.body = { settings }

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
