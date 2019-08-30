import { ISpruceModels } from './models'
import * as Router from 'koa-router'
import { Context } from 'koa'
import Sprucebot from '@sprucelabs/spruce-node'
import { ISpruceServices } from './services'
import { ISpruceUtilities } from './utilities'
import { ISpruceAuth } from './auth'
import { Sequelize } from 'sequelize/types'
import SpruceCoreModel from '../lib/SpruceModel'
import { ISpruceGQLTypes } from './gql'
import { FindOptions } from 'sequelize'
import { GraphQLObjectType } from 'graphql'

type SpruceCoreModelType = typeof SpruceCoreModel

export interface ISpruceContext<
	ISkillModels = ISpruceModels,
	ISkillAuth = ISpruceAuth,
	ISkillServices = ISpruceServices,
	ISkillUtilities = ISpruceUtilities,
	ISkillGQLTypes = ISpruceGQLTypes
> extends Context, Router.RouterContext {
	sb: Sprucebot
	db: {
		models: ISkillModels
		sequelize: Sequelize
	}
	auth?: ISkillAuth
	services: ISkillServices
	utilities: ISkillUtilities
	gql: {
		types: ISkillGQLTypes
		helpers: {
			attributes(model: SpruceCoreModelType, options?: Record<string, any>): any
			buildConnection(options: {
				/** Name your connection. This must be unique */
				name?: string
				/** The model you're connecting. For example ctx.db.models.User */
				model: SpruceCoreModelType
				associationName: string
				type: GraphQLObjectType
				connectionOptions: {
					before?: (
						findOptions: FindOptions,
						args: Record<string, any>,
						context: any
					) => Promise<FindOptions>
					// TODO: Define after
					// after?: (
					// 	findOptions: FindOptions,
					// 	args: Record<string, any>,
					// 	context: any
					// ) => Promise<FindOptions>
				}
			}): any
		}
	}
}

export interface ISpruceRouter extends Router<{}, ISpruceContext> {}
