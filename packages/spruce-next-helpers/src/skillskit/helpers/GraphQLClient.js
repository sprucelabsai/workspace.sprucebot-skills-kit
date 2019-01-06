//@flow
import { GraphQLClient } from '@sprucelabs/spruce-utils/graphql'

export default props => {
	console.log({ gqlProps: props })
	const serverHost = props.config.SERVER_HOST
	const allowSelfSigned = props.config.INTERFACE_SSL_ALLOW_SELF_SIGNED
	let token
	if (props.auth && props.auth.jwt) {
		token = props.auth.jwt
	}
	console.log({
		client: {
			uri: `${serverHost}/graphql`,
			rejectUnauthorized: !(allowSelfSigned === true),
			token
		}
	})
	const gqlClient = new GraphQLClient({
		uri: `${serverHost}/graphql`,
		rejectUnauthorized: !(allowSelfSigned === true),
		token
	})

	return gqlClient
}
