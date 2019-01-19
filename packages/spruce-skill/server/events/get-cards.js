const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-page-cards **', { event: ctx.event })

		const page = ctx.event.payload.page ? ctx.event.payload.page : null

		// const guestId = ctx.event.payload.guestId ? ctx.event.payload.guestId : null
		// const locationId = ctx.event.payload.locationId
		// 	? ctx.event.payload.locationId
		// 	: null
		// const organizationId = ctx.event.payload.organizationId
		// 	? ctx.event.payload.organizationId
		// 	: null

		const cardIds = ctx.event.payload.cardIds ? ctx.event.payload.cardIds : null

		let pageCards = config.cards[page]
		if (!pageCards || !Array.isArray(pageCards)) {
			pageCards = []
		}
		let cards = pageCards

		// filter out if cardIds exists
		if (cardIds && cardIds.length > 0) {
			cards = []
			cards = pageCards.filter(card => cardIds.indexOf(card.id) >= 0)
		}
		// create data based on the user
		cards = cards.map(card => {
			card.skillSlug = process.env.SLUG
			return card
		})

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
