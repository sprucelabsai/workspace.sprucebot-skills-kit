import { ISpruceContext } from '../../interfaces/ctx'
import { GraphQLObjectType } from 'graphql'

export default (ctx: ISpruceContext) =>
	new GraphQLObjectType({
		name: 'Job',
		description: 'A job',
		fields: () => ({
			...ctx.gql.helpers.attributes(ctx.db.models.Job)
		})
	})
