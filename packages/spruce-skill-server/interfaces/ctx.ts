import { ISpruceModels } from './models'
import * as Router from 'koa-router'
import { Context } from 'koa'
import Sprucebot from '@sprucelabs/spruce-node'
import { ISpruceServices } from './services'
import { ISpruceUtilities } from './utilities'
import { ISpruceAuth } from './auth'
import { Sequelize } from 'sequelize/types'
import { ISpruceGQLTypes } from './gql'
import { ISpruceGQLHelpers } from '../gql/helpers'

export interface ISpruceContext<
	ISkillModels = ISpruceModels,
	ISkillAuth = ISpruceAuth,
	ISkillServices = ISpruceServices,
	ISkillUtilities = ISpruceUtilities,
	ISkillGQLTypes = ISpruceGQLTypes
> extends Context, Router.RouterContext {
	/** run operations against core */
	sb: Sprucebot
	/** get to data models */
	db: {
		models: ISkillModels
		sequelize: Sequelize
	}
	/** if someone has been authenticated, you'll find details here */
	auth?: ISkillAuth
	/** perform operations with other systems (everything in your /server/services) */
	services: ISkillServices
	/** helpful utilities for things like mutating data or doing calculations */
	utilities: ISkillUtilities
	/** gql related libraries */
	gql: {
		types: ISkillGQLTypes
		/** a collection of tools to make building gql endpoints even faster! */
		helpers: ISpruceGQLHelpers
	}
}

export interface ISpruceRouter extends Router<{}, ISpruceContext> {}
