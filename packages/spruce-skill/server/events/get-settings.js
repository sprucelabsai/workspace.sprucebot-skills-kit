const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('**** get-settings', { event: ctx.event })
		if (!ctx.event.payload || !ctx.event.payload.page) {
			throw new Error('INVALID_PAYLOAD')
		}

		const userId = ctx.event.payload.userId

		// Check slug
		// ctx.event.Skill
		// Check user
		// ctx.auth

		// 'skill_settings_user'
		// 'skill_settings_org'
		// 'skill_settings_location'

		const settings = await ctx.utilities.settings.getSettings({
			page: ctx.event.payload.page,
			settings: config.settings,
			userId,
			overrides: [
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
