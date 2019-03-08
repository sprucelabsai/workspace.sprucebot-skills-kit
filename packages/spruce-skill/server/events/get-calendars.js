const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-calendars **', { event: ctx.event })

		ctx.body = [
			{
				id: 'example_calendar',
				name: 'Example Calendar'
			}
		]
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
