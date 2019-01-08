const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('**** get-settings', { event: ctx.event })
		if (!ctx.event.payload || !ctx.event.payload.page) {
			throw new Error('INVALID_PAYLOAD')
		}

		const userId = ctx.event.payload.userId

		/*
			ctx.utilities.settings.getSettings() is a helper method that will:
			1. Filter the settings returned based on the setting "page"
			2. Filter the settings returned based on the setting "acls"
		*/
		const settings = await ctx.utilities.settings.getSettings({
			page: ctx.event.payload.page,
			settings: config.settings, // Define your settings in config/settings.js
			userId,
			overrides: [
				// Override certain settings values here. A use case here is localization.
				{
					name: 'receive_notifications',
					props: {
						helper: 'Heres a special helper.'
					}
				},
				{
					name: 'can_do_another_thing',
					props: {
						iconAfter: 'caution'
					}
				}
			]
		})

		ctx.body = settings

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
