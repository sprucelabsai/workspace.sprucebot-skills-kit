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
		const exampleLayout = [
			{
				header: {
					title: 'Example card in default config'
				},
				bodies: [
					{
						image: {
							url: 'https://picsum.photos/720/360/?random',
							text: 'Random image being set.',
							width: 720,
							heght: 360
						}
					}
				],
				footer: {
					primary: {
						text: 'Sprucebot Docs',
						destination: {
							url: 'https://docs.sprucebot.com',
							target: '_blank'
						}
					}
				}
			}
		]

		cards.forEach(card => {
			card.layouts = exampleLayout
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
