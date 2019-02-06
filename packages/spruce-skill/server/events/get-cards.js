const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-page-cards **', { event: ctx.event })

		const {
			// auth: { User, Location, Organization },
			event
		} = ctx
		const page = event.payload.page ? event.payload.page : null

		const cardIds = event.payload.cardIds ? event.payload.cardIds : null
		let pageCards = ctx.services.cards.getCards(page)

		if (!pageCards || !Array.isArray(pageCards)) {
			pageCards = []
		}
		let cards = pageCards

		// filter out if cardIds exists
		if (cardIds && cardIds.length > 0) {
			cards = []
			cards = pageCards.filter(card => cardIds.indexOf(card.id) >= 0)
		}

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
