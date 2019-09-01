import { ISkillContext } from 'server/interfaces/ctx'
import gql from 'graphql-tag'
import { IGQLResolvers, User } from '@sprucelabs/spruce-skill-server'

/**
 * This is an example of how you can use Schema Definition Language to build your GQL API.
 * Cheatsheet here: https://miro.medium.com/max/5052/1*HaEeoGrja2IGUxzvmj5Vnw.png
 * Keep in mind you should extend Query and Mutation types since all of them will
 * be combined into a single Schema, e.g. extend type Query {...}
 */

export default (ctx: ISkillContext) => {
	const test: IGQLResolvers = {
		gql: gql`
			union Model = User | Location

			extend type Query {
				"Test a simple query"
				testSimpleQuery(id: ID!): [TestType]!

				"Test returning a single Sequelize User Model"
				getFirstUser: User

				"Test using relay and using advanced resolver with selected fields"
				loadFirstLocations(
					limit: Int
					order: String
					where: JSON
					offset: Int
					after: String
					first: Int
					before: String
					last: Int
				): LocationConnection

				"Test union type resolution"
				loadUserOrLocation(type: String!): Model
			}
		`,
		resolvers: {
			Model: {
				__resolveType: result => {
					return result.timezone ? 'Location' : 'User'
				}
			},
			Query: {
				testSimpleQuery: (
					args: { id: string; name: string },
					context,
					info
				): { id: string; name: string }[] => {
					console.log('testSimpleQuery', context, info)

					const { id } = args

					return [
						{
							id: `${id}-1`,
							name: `The First`
						},
						{
							id: `${id}-2`,
							name: `The Second`
						}
					]
				},
				getFirstUser: ctx.gql.helpers.buildSequelizeResolver<typeof User>({
					modelName: 'User',
					before: (findOptions, args, context) => {
						context.scopes.getFirstUser = config.scopes.Mock.public()
					}
				})

				// loadFirstLocations: ctx.gql.helpers.buildShorthandResolver({
				// 	modelName: 'Location',
				// 	before: (options, args, context) => {
				// 		context.scopes.loadFirstLocations = config.scopes.Mock.public()
				// 		return options
				// 	}
				// })

				// loadFirstLocations: buildShorthandResolver({
				// 	model: orm.models.Location,
				// 	associationName: 'Location',
				// 	type: orm.types.Location,
				// 	connectionOptions: {
				// 		before: async (
				// 			findOptions: FindOptions<ILocationAttributes>,
				// 			args: IGQLLocationQueryArgs,
				// 			context: Request
				// 		) => {
				// 			context.scopes.loadFirstLocations = {
				// 				loadFirstLocations: 'public',
				// 				'loadFirstLocations.Organization': 'public'
				// 			}

				// 			return findOptions
				// 		}
				// 	}
				// })
			}
		}
	}

	return test
}
