const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-page-cards **', { event: ctx.event })

		// Determine which cards should be sent to the user

		const cards = config.cards
		ctx.body = { cards }
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
