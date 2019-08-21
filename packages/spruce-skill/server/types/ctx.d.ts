import { ISpruceSkillModels } from './models'
import { Context } from 'koa'

export interface ISpruceSkillContext extends Context {
	db: {
		models: ISpruceSkillModels
	}
}
