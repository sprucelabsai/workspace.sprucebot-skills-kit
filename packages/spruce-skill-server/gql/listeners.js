const config = require('config')
const globby = require('globby')
const GraphQLSubscription = require('../lib/GraphQLSubscription')
const debug = require('debug')('spruce-skill-server')
const helpers = require('./helpers')

module.exports = (koa, gqlOptions) => {
	if (!config.GRAPHQL_LISTENERS_ENABLED) {
		log.debug('GraphQL listeners disabled')
		return
	}

	const gqlDir = gqlOptions.gqlDir
	const serverHost = config.API_HOST
	const allowSelfSigned = config.API_SSL_ALLOW_SELF_SIGNED

	// For wss:// self signed
	if (allowSelfSigned) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
	}

	koa.context.gqlSubscriptions = new GraphQLSubscription()

	const listenerPaths = globby.sync([
		`${gqlDir}/listeners/**/!(index|types|_helpers).js`
	])

	listenerPaths.forEach(path => {
		try {
			debug(`Importing gql listener: ${path}`)
			// $FlowIgnore
			require(path)(koa.context) // eslint-disable-line
		} catch (e) {
			log.warn(`Unable to import GraphQL listener from ${path}`, e)
		}
	})
}
