import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'Organization',
		description: 'An organization',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Organization)
		})
	})
