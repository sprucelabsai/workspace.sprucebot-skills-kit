const Router = require('koa-router')
const graphqlHTTP = require('koa-graphql')
const Schema = require('./Schema')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const depthLimit = require('graphql-depth-limit')
const QueryComplexity = require('graphql-query-complexity')
const { createContext, EXPECTED_OPTIONS_KEY } = require('dataloader-sequelize')
const config = require('config')
const errors = config.errors
// const auth = require('../middleware/auth')

const queryComplexity = QueryComplexity.default
const simpleEstimator = QueryComplexity.simpleEstimator
const fieldConfigEstimator = QueryComplexity.fieldConfigEstimator

const auth = async (ctx, next) => {
	let token = ctx.cookies.get('jwt') || ctx.request.headers['x-skill-jwt']
	const decoded = jwt.verify(token, config.API_KEY.toString().toLowerCase())
	const userId = decoded.userId
	const locationId = decoded.locationId
	const query = `
		{
			User (
				id: "${userId}"
			) {
				id
				firstName
			}
		}
	`
	const user = await ctx.sb.query(query)
	// ctx.auth = await ctx.sb.user(decoded.locationId, decoded.userId)
	await next()
}

module.exports = (koa, gqlOptions) => {
	// Get schema
	const schema = new Schema({ ctx: koa.context, gqlDir: gqlOptions.gqlDir })

	const router = new Router()

	if (config.GRAPHQL_ENABLED) {
		router.use(auth)
		router.all(
			'/graphql',
			async (context, next) => {
				context.startTime = log.timerStart()
				await next()
			},
			graphqlHTTP(async (request, response, ctx) => {
				const dataloaderContext = createContext(koa.context.db.sequelize)
				request[EXPECTED_OPTIONS_KEY] = dataloaderContext

				return {
					schema,
					graphiql: config.GRAPHIQL_ENABLED,
					formatError: e => {
						const code = e.message
						let formattedError = {}

						if (errors[code]) {
							formattedError = {
								name: code,
								code: errors[code].code,
								reason: errors[code].reason,
								friendlyReason: errors[code].friendlyReason
							}
						} else {
							formattedError = {
								name: 'UNKNOWN',
								code: errors.UNKNOWN.code,
								reason: errors.UNKNOWN.reason,
								friendlyReason: errors.UNKNOWN.friendlyReason
							}
						}

						if (config.ENABLE_DEBUG_ROUTES) {
							formattedError.stack = e.stack.split('\n')
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
							variables: {},
							onComplete: complexity => {
								ctx.queryCost = complexity
							}
						})
					],
					extensions: ({
						document,
						variables,
						operationName,
						result,
						context
					}) => {
						const ms = log.timerEnd(context.startTime)
						return {
							requestMS: ms,
							queryCost: context.queryCost,
							warnings: context.warnings ? _.uniq(context.warnings) : []
						}
					}
				}
			})
		)
	}

	koa.use(router.routes()).use(router.allowedMethods())
}
