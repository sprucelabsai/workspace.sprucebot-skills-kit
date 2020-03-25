import config from 'config'
import { ISpruceContext, IGQLResolvers } from '@sprucelabs/skill-server'
import gql from 'graphql-tag'

module.exports = (ctx: ISpruceContext) => {
	// TODO: Change this file to suit the needs for your skill (or remove it). This is meant only as an example and could introduce security concerns.
	log.warn(
		'TODO: Update gql/Organization/queries/Organization.js for this skill'
	)

	const organization: IGQLResolvers = {
		sdl: gql`
			extend type Query {
				"Gets information about a single organization. Depending on user permissions, additional information may be available."
				Organization(id: ID!): Organization
			}
		`,
		resolvers: {
			Query: {
				Organization: ctx.gql.helpers.buildSequelizeResolver({
					modelName: 'Organization',
					before: async (findOptions, args, context /* , info */) => {
						if (!context.scopes) {
							context.scopes = {}
						}

						if (!context.where) {
							context.where = {}
						}

						const where = {
							id: args.id
						}

						findOptions.where = { ...(findOptions.where || {}), ...where }

						// Public info
						context.scopes.Organization = config.scopes.Organization.public()
						return findOptions
					}
				})
			}
		}
	}

	return organization
}
