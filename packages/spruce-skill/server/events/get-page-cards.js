const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('** Event: get-page-cards **', { event: ctx.event })

		// Determine which cards should be sent to the user

		const cards = []

		cards.push({
			...config.cards.exampleCard,
			header: {
				title: 'My example card',
				actions: [
					{
						title: 'Do something',
						text: 'Some detail about that thing you will be doing',
						destination: {
							slug: 'user-dashboard'
						}
					}
				],
				// image: 'https://path.to.image.spruce.ai',
				avatar: 'https://path.to.image.spruce.ai'
			},
			body: [
				{
					title: 'This is a body title',
					text: 'Some body text',
					image: 'https://path.to.image.spruce.ai'
				},
				{
					title: 'This is another body title',
					list: [
						{
							title: 'List item 1 title',
							text: 'List item 1 text',
							actions: [
								{
									text: 'Take list item 1 action 1',
									destination: {
										url: 'https://www.google.com',
										target: '_blank'
									}
								},
								{
									text: 'Take list item 1 action 2',
									destination: {
										url: 'https://www.spruce.ai',
										target: '_blank'
									}
								}
							]
						}
					]
				}
			],
			footer: {
				primary: {
					icon: 'warning',
					text: 'Ok, take me to the dashboard',
					destination: {
						slug: 'location_dashboard'
					}
				},
				secondary: {
					icon: 'info',
					text: 'Trigger a fake event',
					destination: {
						event: 'example:did-trigger-example-event'
					}
				}
			}
		})

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
