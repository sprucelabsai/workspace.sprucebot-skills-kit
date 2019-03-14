const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-calendar-events **', { event: ctx.event })

		ctx.body = []
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
