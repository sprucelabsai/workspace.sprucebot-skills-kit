const config = require('config')
const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		log.debug('**** get-views', { event: ctx.event })
		if (!ctx.event.payload || !ctx.event.payload.page) {
			throw new Error('INVALID_PAYLOAD')
		}

		const views = []

		switch (ctx.event.payload.page) {
			case 'location_dashboard':
				views.push({
					title: 'My skill',
					url: `${config.INTERFACE_HOST}/location-dashboard`
				})
				break
		}

		ctx.body = views

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
