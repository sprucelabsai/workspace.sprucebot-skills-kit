import { ISkillContext } from 'server/interfaces/ctx'
import config from 'config'
import gql from 'graphql-tag'
import { IGQLResolvers } from '@sprucelabs/spruce-skill-server'

/**
 * This is an example of how you can use Schema Definition Language to build your GQL API.
 * Cheatsheet here: https://miro.medium.com/max/5052/1*HaEeoGrja2IGUxzvmj5Vnw.png
 * Keep in mind you should extend Query and Mutation types since all of them will
 * be combined into a single Schema, e.g. extend type Query {...}
 */

export default (ctx: ISkillContext) => {
	if (!config.TESTING_SKILLS_KIT) {
		return {}
	}

	const test: IGQLResolvers<ISkillContext> = {
		sdl: gql`
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

			input UpdateUserInput {
				id: ID!
				firstName: String!
			}

			extend type Mutation {
				"Testing a user update"
				updateUserTest(input: UpdateUserInput!): User
			}
		`,
		resolvers: {
			// how you resolve a type, such as ENUM OR UNIONS
			Model: {
				__resolveType: (
					result: Record<string, any>
					/*
					context: ISpruceContext,
					info: GraphQLResolveInfo,
					returnType: GraphQLAbstractType
					*/
				): string => {
					return result.timezone ? 'Location' : 'User'
				}
			},
			// how to resolve a property of a type
			TestType: {
				address: () => {
					return 'hello world'
				}
			},
			// resolving queries
			Query: {
				testSimpleQuery: (_source, args /*, context, info*/) => {
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
				getFirstUser: ctx.gql.helpers.buildSequelizeResolver({
					modelName: 'User',
					before: (findOptions, _args, context) => {
						context.scopes.getFirstUser = config.scopes.Mock.public()
						return findOptions
					},
					after: user => {
						return user
					}
				}),

				loadFirstLocations: ctx.gql.helpers.buildSequelizeResolver({
					modelName: 'Location',
					many: true,
					before: async (findOptions, _args, context) => {
						context.scopes.loadFirstLocations = config.scopes.Mock.public()
						return findOptions
					},
					after: locations => {
						return locations
					}
				}),
				loadUserOrLocation: async (_source, args, context, info) => {
					const { type } = args
					let model

					if (type === 'user') {
						model = await context.db.models.User.findOne()
					} else {
						model = await context.db.models.Location.findOne()
					}

					if (model) {
						// since we are not using buildSequelizeResolver scopes is null
						context.scopes.loadUserOrLocation = config.scopes.Mock.public()

						model = context.gql.helpers.cleanModelByScope({
							model,
							context,
							info
						})
					}

					return model
				}
			},
			Mutation: {
				// updating a model, honoring scope (see sr/config/scopes.ts)
				updateUserTest: ctx.gql.helpers.buildSequelizeResolver({
					modelName: 'User',
					before: async (_findOptions, args, context) => {
						const { id, firstName } = args.input

						const user = await ctx.db.models.User.findOne({
							where: {
								id
							}
						})

						if (user) {
							await ctx.sb.updateUser(id, { firstName })
						}

						// see /src/config/scopes.ts
						context.scopes.updateUserTest = config.scopes.Mock.public()

						// let the resolver handle the loading of the model (along with relationships)
						return {
							where: {
								id
							}
						}
					}
				})
			}
		}
	}

	return test
}
