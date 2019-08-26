import { ISpruceContext } from '@sprucelabs/spruce-skill-server'
import { ISkillModels } from './models'
import { ISkillAuth } from './auth'
import { ISkillServices } from './services'
import { ISkillUtilities } from './utilities'

export interface ISkillContext
	extends ISpruceContext<
		ISkillModels,
		ISkillAuth,
		ISkillServices,
		ISkillUtilities
	> {}
