const { eventError } = require('../lib/errorHandler')
const config = require('config')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-page-cards **', { event: ctx.event })

		const {
			// auth: { User, Location, Organization },
			event: {
				payload: { page }
			}
		} = ctx

		const calendars = (config.calendars || []).filter(
			calendar => calendar.page === page
		)

		ctx.body = calendars
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
