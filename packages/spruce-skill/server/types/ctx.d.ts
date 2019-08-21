import { ISpruceSkillModels } from './models'
import * as Router from 'koa-router'
import { Context } from 'koa'
import Sprucebot from '@sprucelabs/spruce-node'

export interface ISpruceSkillRouter extends Router<{}, ISpruceSkillContext> {
	// ctx: ISpruceSkillContext
}

export interface ISpruceSkillContext extends Context, Router.RouterContext {
	sb: Sprucebot
	db: {
		models: ISpruceSkillModels
	}
}
