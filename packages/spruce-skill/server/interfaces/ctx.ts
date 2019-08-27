import * as Router from 'koa-router'
import { ISpruceContext } from '@sprucelabs/spruce-skill-server'
import { ISkillModels } from './models'
import { ISkillAuth } from './auth'
import { ISkillServices } from './services'
import { ISkillUtilities } from './utilities'
import { ISkillGQLTypes } from './gql'

export interface ISkillContext
	extends ISpruceContext<
		ISkillModels,
		ISkillAuth,
		ISkillServices,
		ISkillUtilities,
		ISkillGQLTypes
	> {}

export interface ISkillRouter extends Router<{}, ISkillContext> {}
