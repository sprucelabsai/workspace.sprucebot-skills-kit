import config from 'config'
import globby from 'globby'
import GraphQLSubscription from '../lib/GraphQLSubscription'
import Debug from 'debug'
const debug = Debug('spruce-skill-server')
import Koa from 'koa'
import { ISpruceContext } from '../interfaces/ctx'

export default (
	koa: Koa<{}, ISpruceContext>,
	gqlOptions: Record<string, any>
) => {
	// TODO move to an option or check higher level
	if (!config.GRAPHQL_LISTENERS_ENABLED) {
		log.debug('GraphQL listeners disabled')
		return
	}

	const gqlDir = gqlOptions.gqlDir
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
