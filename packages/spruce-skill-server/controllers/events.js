const config = require('config')
const debug = require('debug')('spruce-skill-server')

module.exports = (router, options) => {
	const listenersByEventName = options.listenersByEventName

	if (!config.EVENT_VERSION || config.EVENT_VERSION === 1) {
		router.post('/hook.json', async (ctx, next) => {
			// only fire if we are listening to this event
			if (ctx.event) {
				const eventName = ctx.event.name
				// debug('Event listener firing', ctx.event.name)
				if (config.LOG_EVENTS) {
					log.info(`(EVENT_VERSION=1) Received event '${eventName}'`, {
						event: ctx.event
					})
				}

				if (listenersByEventName[ctx.event.name]) {
					await listenersByEventName[ctx.event.name](ctx, next)
				} else {
					debug(
						`(EVENT_VERSION=1) No listeners found for eventName: '${eventName}'`
					)
					if (config.LOG_EVENTS) {
						log.debug(
							`(EVENT_VERSION=1) No listener found for event: '${eventName}'. Check that you have created the corresponding file in server/events/. If you don't need to respond to this event, remove it from your config.eventContract`
						)
					}
				}

				// core will ignore this
				if (!ctx.body) {
					ctx.body = { status: 'success', ignore: true }
				}
			} else {
				debug('(EVENT_VERSION=1) Unable to decode event')
				// no listener, ignore here
				ctx.body = { status: 'success', ignore: true }
			}
		})
	}
}
