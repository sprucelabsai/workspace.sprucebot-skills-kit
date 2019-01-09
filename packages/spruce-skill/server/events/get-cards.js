const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-page-cards **', { event: ctx.event })

		// Determine which cards should be sent to the user
		const cards = concat(config.cards)
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
