//@flow
import { GraphQLClient } from '@sprucelabs/spruce-utils/graphql'
import config from 'config'

const serverHost = config.SERVER_HOST
const allowSelfSigned = config.INTERFACE_SSL_ALLOW_SELF_SIGNED

const gqlClient = new GraphQLClient({
	uri: `${serverHost}/graphql`,
	rejectUnauthorized: !(allowSelfSigned === true)
})

export default gqlClient
