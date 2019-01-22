const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('**** validate-settings', { event: ctx.event })
		if (
			!ctx.event.payload ||
			!ctx.event.payload.settings ||
			!ctx.event.payload.userId
		) {
			log.warn(
				'Received invalid payload from API for "validate-settings" event'
			)
			throw new Error('INVALID_PAYLOAD')
		}

		const settings = ctx.event.payload.settings
		const userId = ctx.event.payload.userId
		let body = {}

		let canSave = true
		// TODO: Validate the settings
		if (!canSave) {
			// If there are errors, return an array of errors where name is the setting name and reason will be displayed to the user.
			body.errors = [
				{
					name: 'receive_notifications',
					reason: 'The user must complete onboarding to receive notifications'
				}
			]
		}

		log.warn(
			'Unsafe saving of settings. Validate your settings in server/events/validate-settings.js'
		)

		ctx.body = {
			canSave,
			...body
		}

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
