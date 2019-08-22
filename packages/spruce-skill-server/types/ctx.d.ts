import { ISpruceCoreSkillModels } from './models'
import * as Router from 'koa-router'
import { Context } from 'koa'
import Sprucebot from '@sprucelabs/spruce-node'
import { ISpruceCoreSkillServices } from './services'

export interface ISpruceSkillRouter extends Router<{}, ISpruceSkillContext> {
	// ctx: ISpruceSkillContext
}

export interface ISpruceSkillContext extends Context, Router.RouterContext {
	sb: Sprucebot
	db: {
		models: ISpruceCoreSkillModels
	}
	services: ISpruceCoreSkillServices
}
