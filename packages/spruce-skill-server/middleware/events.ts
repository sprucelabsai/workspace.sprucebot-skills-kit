import * as Router from 'koa-router'
import Debug from 'debug'

import jwt from 'jsonwebtoken'
import config from 'config'
import { ISpruceContext } from '../interfaces/ctx'
import { ISpruceEventContract } from '../config/default'

const debug = Debug('spruce-skill-server')

export default (
	router: Router<{}, ISpruceContext>,
	options: Record<string, any>
) => {
	// LEGACY EVENT MANAGER, CHECK ./auth.js FOR > V1
	if (config.EVENT_VERSION !== 1) {
		return
	}

	const listenersByEventName = options.listenersByEventName

	router.use(async (ctx: ISpruceContext, next: () => Promise<any>) => {
		if (!config.API_KEY) {
			throw new Error(
				'"API_KEY" is not defined. Check your .env and/or environment variables.'
			)
		}
		let body = ctx.request.body
		const eventName = body && body.event
		const eventContract = config.eventContract as ISpruceEventContract
		// setup if we are listening to this event
		if (!eventContract || !eventContract.events) {
			debug('No event contract found in config')
		}

		if (
			eventContract &&
			eventContract.events &&
			!eventContract.events[eventName]
		) {
			debug(`No eventContract specified for: ${eventName}`)
		}

		if (
			ctx.path === '/hook.json' &&
			body &&
			eventName &&
			listenersByEventName[eventName]
		) {
			// lets make sure the data is signed pro
			try {
				body = jwt.verify(body.data, config.API_KEY.toLowerCase())
			} catch (err) {
				debug('IMPROPERLY SIGNED PAYLOAD FOR EVENT. IGNORING')
				next()
				return
			}

			debug('router.use for event', eventName)
			debug('Body of request received', body)
			debug('Listener found, adding event to ctx')

			const userId = body.userId || (body.payload && body.payload.userId)

			// is a user and location part of this event?
			if (userId && body.locationId) {
				ctx.event = await ctx.sb.user(body.locationId, userId)
			} else if (body.locationId) {
				// just a location
				const location = await ctx.sb.location(body.locationId)
				ctx.event = {
					LocationId: location.id,
					Location: location
				}
			} else if (userId && config.GLOBAL) {
				// just user id if global
				debug('Global skill handling event')
				const user = await ctx.sb.globalUser(userId)
				ctx.event = {
					User: user,
					UserId: user.id
				}
			} else {
				ctx.event = {}
			}

			if (body.organizationId) {
				ctx.event.organizationId = body.organizationId
			}

			if (ctx.event) {
				if (body) {
					if (body.payload) {
						ctx.event.payload = body.payload
					}

					if (body.firstSentAt) {
						ctx.event.firstSentAt = body.firstSentAt
					}

					if (body.deliveryTry) {
						ctx.event.deliveryTry = body.deliveryTry
					}

					if (body.eventId) {
						ctx.event.eventId = body.eventId
					}

					if (body.retryId) {
						ctx.event.retryId = body.retryId
					}
				}

				ctx.event.name = eventName // pass through event name
			}
		} else if (ctx.path === '/hook.json' && eventName) {
			debug('No listener found for', eventName)
		}

		await next()
	})
}
