import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'UserLocation',
		description: 'A user location',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.UserLocation)
		})
	})
