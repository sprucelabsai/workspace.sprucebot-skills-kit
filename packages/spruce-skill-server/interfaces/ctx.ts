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
			attributes(model: SpruceCoreModelType): any
		}
	}
}
