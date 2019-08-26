import jwt from 'jsonwebtoken'
import config from 'config'
import Debug from 'debug'

const debug = Debug('spruce-skill-server')
import * as Router from 'koa-router'
import { ISpruceContext } from '../interfaces/ctx'

interface INext {
	(): Promise<any>
}

module.exports = (
	router: Router<{}, ISpruceContext>,
	options: Record<string, any>
) => {
	// jwt validation
	const auth = async (
		passedId: string | ISpruceContext,
		passedCtx: ISpruceContext | INext,
		passedNext?: INext
	) => {
		debug('AUTH CHECK', passedNext, passedCtx, passedId)

		const next: INext = passedNext ? passedNext : (passedCtx as INext)
		const ctx: ISpruceContext = passedNext
			? (passedCtx as ISpruceContext)
			: (passedId as ISpruceContext)
		const id: string | null = passedNext ? (passedId as string) : null

		let token =
			id ||
			ctx.request.body.jwt ||
			ctx.request.query.jwt ||
			ctx.cookies.get('jwt') ||
			ctx.request.headers['x-skill-jwt']
		if (token) {
			ctx.cookies.set('jwt', token, {
				secure: process.env.TESTING !== 'true'
			})
			debug(`middleware/auth found token checking`)
			try {
				const decoded: Record<string, any> = jwt.verify(
					token,
					config.get<string>('API_KEY').toLowerCase()
				) as Record<string, any>

				const auth = await ctx.sb.user(decoded.locationId, decoded.userId)

				const realRole = auth.role

				// Allow override of role if in dev mode
				if (config.get('DEV_MODE')) {
					const devRole =
						ctx.cookies.get('devRole') || ctx.request.headers['x-dev-role']

					// Allow users to downgrade their role for testing purposes
					switch (devRole) {
						case 'teammate':
							if (realRole === 'owner') {
								auth.role = devRole
							}

						case 'guest':
							if (realRole === 'owner' || realRole === 'teammate') {
								auth.role = devRole
							}

						// By default just use the (real) assigned role
						default:
							break
					}
				}
				auth.jwt = token
				auth.version = 1
				ctx.auth = auth
				debug(`middleware/auth token valid`)
			} catch (err) {
				debug(`MIDDLEWARE/AUTH INVALID TOKEN: ${token}`, err)
				ctx.throw('INVALID_AUTHENTICATION')
			}
		} else {
			debug('middleware/auth no token found')
		}

		await next()
	}

	const decodeV2 = async (ctx: ISpruceContext, token: string) => {
		const decoded: Record<string, any> = jwt.verify(
			token,
			config.get<string>('API_KEY').toLowerCase()
		) as Record<string, any>
		const userId = decoded.userId
		const locationId = decoded.locationId
		const organizationId = decoded.organizationId

		// Get the query from the config where the skills dev could customize it
		const query = config.get<any>('auth')({
			userId,
			locationId,
			organizationId
		}) as string
		const auth = await ctx.sb.query(query)

		return {
			auth: { ...auth.data, jwt: token },
			version: 2,
			decoded
		}
	}

	const authV2 = async (
		passedId: string | ISpruceContext,
		passedCtx: ISpruceContext | INext,
		passedNext?: INext
	) => {
		debug('AUTH CHECK v2', passedNext, passedCtx, passedId)

		const next: INext = passedNext ? passedNext : (passedCtx as INext)
		const ctx: ISpruceContext = passedNext
			? (passedCtx as ISpruceContext)
			: (passedId as ISpruceContext)
		const id: string | null = passedNext ? (passedId as string) : null

		let token =
			id ||
			ctx.request.body.jwtV2 ||
			ctx.request.query.jwtV2 ||
			ctx.cookies.get('jwtV2') ||
			ctx.request.headers['x-skill-jwt-v2']
		if (token) {
			ctx.cookies.set('jwtV2', token, {
				secure: process.env.TESTING !== 'true'
			})
			debug(`middleware/auth found token checking`)
			try {
				const { auth, decoded } = await decodeV2(ctx, token)

				ctx.auth = auth

				debug(`middleware/auth token valid`)
			} catch (err) {
				debug(`MIDDLEWARE/AUTH INVALID TOKEN: ${token}`, err)
				ctx.throw('INVALID_AUTHENTICATION')
			}
		} else {
			debug('middleware/auth no token found')
		}

		await next()
	}

	// @ts-ignore
	router.param('jwt', auth)

	router.use('/api/1.0/*', auth)
	router.use('/api/2.0/*', authV2)

	if (config.get<number>('EVENT_VERSION') > 1) {
		router.post('/hook.json', async (ctx, next) => {
			const listenersByEventName = options.listenersByEventName
			const body = ctx.request.body
			const eventName = body && body.event

			if (listenersByEventName[eventName]) {
				try {
					const { decoded, auth } = await decodeV2(ctx, body.data)
					ctx.auth = auth
					ctx.event = {
						...decoded,
						name: eventName
					}

					if (config.get('LOG_EVENTS')) {
						log.info(`(EVENT_VERSION=2) Received event '${eventName}'`, {
							event: ctx.event
						})
					}

					await listenersByEventName[eventName](ctx, next)
					return
				} catch (err) {
					debug('(EVENT_VERSION=2) MIDDLEWARE/AUTH INVALID EVENT TOKEN', err)
					if (config.get('LOG_EVENTS')) {
						log.debug(
							'(EVENT_VERSION=2) MIDDLEWARE/AUTH INVALID EVENT TOKEN',
							err
						)
					}
				}
			} else {
				debug(`(EVENT_VERSION=2) No listener found for event: '${eventName}'`)
				if (config.get('LOG_EVENTS')) {
					log.debug(
						`(EVENT_VERSION=2) No listener found for event: '${eventName}'. Check that you have created the corresponding file in server/events/. If you don't need to respond to this event, remove it from your config.get('eventContract')`
					)
				}
			}

			await next()
		})
	}

	// authorize paths for team, owner, and guest
	// router.use('/api/*/teammate/*', auth)
	router.use('/api/1.0/teammate/*', async (ctx, next) => {
		// @ts-ignore: legacy functionality
		let role = ctx.auth && ctx.auth.role
		if (role !== 'teammate' && role !== 'owner') {
			debug(`MIDDLEWARE/AUTH ACCESS DENIED: ${ctx.path} for role: '${role}' `)
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})

	// router.use('/api/*/owner/*', auth)
	router.use('/api/1.0/owner/*', async (ctx, next) => {
		// @ts-ignore: legacy functionality
		let role = ctx.auth && ctx.auth.role
		if (role !== 'owner') {
			debug(`MIDDLEWARE/AUTH ACCESS DENIED: ${ctx.path} for role: '${role}' `)
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})

	// router.use('/api/*/guest/*', auth)
	router.use('/api/1.0/guest/*', async (ctx, next) => {
		// @ts-ignore: legacy functionality
		let role = ctx.auth && ctx.auth.role
		if (!role) {
			debug(`MIDDLEWARE/AUTH ACCESS DENIED: ${ctx.path} for role: '${role}' `)
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})
}
