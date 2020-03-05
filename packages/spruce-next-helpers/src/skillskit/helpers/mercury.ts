import { Mercury, TOnConnectHandler } from '@sprucelabs/mercury'
import config from 'config'

// const serverHost = config.SERVER_HOST
// const allowSelfSigned = config.INTERFACE_SSL_ALLOW_SELF_SIGNED
// const wsUri = config.GRAPHQL_SUBSCRIPTIONS_URI

// const gqlClient = new GraphQLClient({
// 	uri: `${serverHost}/graphql`,
// 	rejectUnauthorized: !(allowSelfSigned === true),
// 	wsUri
// })

// export default gqlClient

export default (options: {
	jwt: string
	onConnect?: TOnConnectHandler
	onDisconnect?: TOnConnectHandler
}) => {
	const { jwt, onConnect, onDisconnect } = options
	const mercury = new Mercury({
		// @ts-ignore
		spruceApiUrl: config.API_HOST,
		credentials: { token: jwt },
		onConnect,
		onDisconnect
	})

	return mercury
}
