import { User } from '../models/User'
import { Model } from 'sequelize'

/************************************************************
 * Base Spruce core class that all models inherit from.
 * To extend, see server/types/models.d.ts
 ************************************************************/
export class SpruceCoreModel<T> extends Model<T> {}

/**
 * Defines the base Spruce core models available via FDW in skills kit
 */
export interface ISpruceCoreSkillModels {
	/**
	 * 🌲🤖 CORE SPRUCE USER MODEL
	 *
	 * This is a core model that is available through skills db.
	 *
	 * To extend this model,
	 */
	User: typeof User
}
