import Koa from 'koa'
import Router from 'koa-router'
import graphqlHTTP from 'koa-graphql'
import Schema from './Schema'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import depthLimit from 'graphql-depth-limit'
import queryComplexity, {
	fieldConfigEstimator,
	simpleEstimator
} from 'graphql-query-complexity'
// @ts-ignore
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize'
import { ISpruceContext } from '../interfaces/ctx'

import config from 'config'
import GraphQLSubscriptionServer from '../lib/GraphQLSubscriptionServer'
import { Server } from 'https'

const auth = async (
	ctx: ISpruceContext,
	next: () => Promise<any>
): Promise<void> => {
	try {
		let token =
			ctx.cookies.get('jwt') ||
			ctx.request.headers['x-skill-jwt'] ||
			ctx.request.headers['x-skill-jwt-v2']

		// Check for token in Authorization header
		if (!token && ctx.request.headers['authorization']) {
			token = ctx.request.headers['authorization'].replace('JWT ', '')
		}

		if (!token) {
			await next()
			return
		}
		const decoded: Record<string, any> = jwt.verify(
			token,
			config.get<string>('API_KEY').toLowerCase()
		) as Record<string, any>
		const userId = decoded.userId
		const locationId = decoded.locationId || null
		const organizationId = decoded.organizationId || null
		// @ts-ignore
		const query = config.auth({ userId, locationId, organizationId })
		const result = await ctx.sb.query(query)

		ctx.auth = { ...result.data, jwt: token }
	} catch (e) {
		log.debug(e)
	}
	await next()
}

export default (
	koa: Koa<{}, ISpruceContext>,
	gqlOptions: Record<string, any>,
	server: Server
) => {
	if (!config.GRAPHQL_ENABLED) {
		log.info('GraphQL disabled because GRAPHQL_ENABLED=false')
		return
	}

	// Get schema
	const schema = new Schema({ ctx: koa.context, gqlDir: gqlOptions.gqlDir })

	// Create the subscription server
	koa.context.gqlServer = new GraphQLSubscriptionServer({
		server,
		schema: schema.gqlSchema,
		enabled: true,
		ctx: koa.context
	})

	const router = new Router()

	// @ts-ignore
	router.use(auth)
	router.all(
		'/graphql',
		async (context, next) => {
			context.startTime = log.timerStart()
			// copy all tools from the koa context to the request context so it is a valid ISpruceContext
			// TODO do this in middleware heigher up in the stack Taylor/Ken
			const tools = ['db', 'services', 'utilities', 'gql']
			tools.forEach(name => {
				context[name] = koa.context[name]
			})

			// these are need for gql helpers to function
			context.warnings = []
			context.scopeInfo = []
			context.attributeWarnings = []
			context.scopes = {}
			context.findOptions = {}

			await next()
		},
		// @ts-ignore
		graphqlHTTP(async (request: any, response: any, ctx: ISpruceContext) => {
			const dataloaderContext = createContext(koa.context.db.sequelize)
			// @ts-ignore
			request[EXPECTED_OPTIONS_KEY] = dataloaderContext

			return {
				schema: schema.gqlSchema,
				context: ctx,
				graphiql: config.GRAPHIQL_ENABLED,
				formatError: (e: Error) => {
					const code = e.message
					let formattedError: Record<string, any> = {}
					const errors = config.errors
					// @ts-ignore
					if (errors[code]) {
						formattedError = {
							name: code,
							// @ts-ignore
							code: errors[code].code,
							// @ts-ignore
							reason: errors[code].reason,
							// @ts-ignore
							friendlyReason: errors[code].friendlyReason
						}
					} else {
						log.warn(e)
						formattedError = {
							name: 'UNKNOWN',
							code: errors.UNKNOWN.code,
							reason: errors.UNKNOWN.reason,
							friendlyReason: errors.UNKNOWN.friendlyReason
						}
					}

					if (config.ENABLE_DEBUG_ROUTES) {
						formattedError.stack = e.stack && e.stack.split('\n')
					}

					return formattedError
				},
				validationRules: [
					// Limits the depth of queries
					depthLimit(config.GRAPHQL_MAX_DEPTH),
					// Can limit based on query cost analysis
					queryComplexity({
						estimators: [
							fieldConfigEstimator(),
							simpleEstimator({ defaultComplexity: 1 })
						],
						maximumComplexity: config.GRAPHQL_MAX_COMPLEXITY,
						variables:
							request.body && request.body.variables
								? request.body.variables
								: {},
						onComplete: complexity => {
							ctx.queryCost = complexity
						}
					})
				],
				extensions: (options: { context: ISpruceContext }) => {
					const { context } = options
					const ms = log.timerEnd(context.startTime)

					context.warnings = _.uniq(context.warnings)
					context.attributeWarnings = _.uniq(context.attributeWarnings)
					context.scopeInfo = _.uniq(context.scopeInfo)

					context.warnings.forEach((warning: string) => {
						log.warn(warning)
					})

					context.attributeWarnings.forEach((warning: string) => {
						log.warn(warning)
					})

					context.scopeInfo.forEach((info: string) => {
						log.debug(info)
					})

					return {
						requestMS: ms,
						queryCost: context.queryCost,
						warnings: context.warnings || []
					}
				}
			}
		})
	)

	koa.use(router.routes()).use(router.allowedMethods())
}
