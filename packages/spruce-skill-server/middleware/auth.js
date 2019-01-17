const jwt = require('jsonwebtoken')
var debug = require('debug')('spruce-skills-kit-server')
const config = require('config')

module.exports = (router, options) => {
	// jwt validation
	const auth = async (id, ctx, next) => {
		debug('AUTH CHECK', next, ctx, id)

		if (!next) {
			next = ctx
			ctx = id
			id = null
		}

		let token =
			id ||
			ctx.request.query.jwt ||
			ctx.cookies.get('jwt') ||
			ctx.request.headers['x-skill-jwt']
		if (token) {
			ctx.cookies.set('jwt', token, { secure: true })
			debug(`middleware/auth found token checking`)
			try {
				const decoded = jwt.verify(
					token,
					config.API_KEY.toString().toLowerCase()
				)
				ctx.auth = await ctx.sb.user(decoded.locationId, decoded.userId)

				const realRole = ctx.auth.role

				// Allow override of role if in dev mode
				if (config.DEV_MODE) {
					const devRole =
						ctx.cookies.get('devRole') || ctx.request.headers['x-dev-role']

					// Allow users to downgrade their role for testing purposes
					switch (devRole) {
						case 'teammate':
							if (realRole === 'owner') {
								ctx.auth.role = devRole
							}

						case 'guest':
							if (realRole === 'owner' || realRole === 'teammate') {
								ctx.auth.role = devRole
							}

						// By default just use the (real) assigned role
						default:
							break
					}
				}
				ctx.auth.jwt = token
				ctx.auth.version = 1
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

	const decodeV2 = async (ctx, token) => {
		const decoded = jwt.verify(token, config.API_KEY.toString().toLowerCase())
		const userId = decoded.userId
		const locationId = decoded.locationId
		const organizationId = decoded.organizationId

		// Get the query from the config where the skills dev could customize it
		const query = config.auth({ userId, locationId, organizationId })
		const auth = await ctx.sb.query(query)

		return {
			auth: { ...auth.data, jwt: token },
			version: 2,
			decoded
		}
	}

	const authV2 = async (id, ctx, next) => {
		debug('AUTH CHECK v2', next, ctx, id)
		if (!next) {
			next = ctx
			ctx = id
			id = null
		}

		let token =
			id ||
			ctx.request.body.jwtV2 ||
			ctx.request.query.jwtV2 ||
			ctx.cookies.get('jwtV2') ||
			ctx.request.headers['x-skill-jwt']
		if (token) {
			ctx.cookies.set('jwtV2', token, { secure: true })
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

	router.param('jwt', auth)
	router.param('jwtV2', authV2)

	router.use('/api/1.0/*', auth)
	router.use('/api/2.0/*', authV2)

	if (config.EVENT_VERSION > 1) {
		router.use('/hook.json', async (ctx, next) => {
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
				} catch (err) {
					debug('MIDDLEWARE/AUTH INVALID EVENT TOKEN: ${token}', err)
				}
			} else {
				debug('No listener found for ', eventName)
			}

			next()
		})
	}

	// authorize paths for team, owner, and guest
	// router.use('/api/*/teammate/*', auth)
	router.use('/api/1.0/teammate/*', async (ctx, next) => {
		let role = ctx.auth && ctx.auth.role
		if (role !== 'teammate' && role !== 'owner') {
			debug(`MIDDLEWARE/AUTH ACCESS DENIED: ${ctx.path} for role: '${role}' `)
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})

	// router.use('/api/*/owner/*', auth)
	router.use('/api/1.0/owner/*', async (ctx, next) => {
		let role = ctx.auth && ctx.auth.role
		if (role !== 'owner') {
			debug(`MIDDLEWARE/AUTH ACCESS DENIED: ${ctx.path} for role: '${role}' `)
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})

	// router.use('/api/*/guest/*', auth)
	router.use('/api/1.0/guest/*', async (ctx, next) => {
		let role = ctx.auth && ctx.auth.role
		if (!role) {
			debug(`MIDDLEWARE/AUTH ACCESS DENIED: ${ctx.path} for role: '${role}' `)
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})
}
