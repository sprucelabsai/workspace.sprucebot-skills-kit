import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'UserOrganization',
		description: 'A user organization',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.UserOrganization)
		})
	})
