const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('**** validate-settings', { event: ctx.event })
		const { auth, event } = ctx

		if (!auth.User || !auth.Organization) {
			throw new Error('NOT_AUTHORIZED')
		}

		if (!event.payload || !event.payload.settings) {
			log.warn(
				'Received invalid payload from API for "validate-settings" event'
			)
			throw new Error('INVALID_PAYLOAD')
		}

		let body = {}

		let isValid = true
		const errors = event.payload.settings.reduce((errors, setting) => {
			if (setting.name === 'example_text' && setting.val !== 'spruce') {
				errors.push({
					name: setting.name,
					reason: 'This was skill side validated and should be "spruce".'
				})
			}
			return errors
		}, [])

		// TODO: Validate the settings
		if (errors.length > 0) {
			// If there are errors, return an array of errors where name is the setting name and reason will be displayed to the user.
			body.errors = errors
			isValid = false
		}

		log.warn(
			'Unsafe saving of settings. Validate your settings in server/events/validate-settings.js'
		)

		ctx.body = {
			isValid,
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
