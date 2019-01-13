const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-page-cards **', { event: ctx.event })

		const page = ctx.event.payload.page ? ctx.event.payload.page : null
		const guestId = ctx.event.payload.guestId ? ctx.event.payload.guestId : null
		const locationId = ctx.event.payload.locationId
			? ctx.event.payload.locationId
			: null
		const organizationId = ctx.event.payload.organizationId
			? ctx.event.payload.organizationId
			: null

		const cardIds = ctx.event.payload.cardIds ? ctx.event.payload.cardIds : null

		// Determine which cards should be sent to the user
		const cards = config.cards

		ctx.body = cards
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
