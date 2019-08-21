import { User } from 'server/models/User'
import { Model } from 'sequelize'

/************************************************************
 * Base class that all models inherit from
 ************************************************************/
export class SpruceModel<T> extends Model<T> {}

export interface ISpruceSkillModels {
	//////////////////////////////////////////////////////////////////////
	// CUSTOM MODELS
	// When you create a new model place the definition here
	//////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////
	// Core Models
	// These models come from skills kit
	//
	// You PROBABLY don't need to edit anything below this
	//////////////////////////////////////////////////////////////////////

	/**
	 * 🌲🤖 CORE SPRUCE USER MODEL
	 *
	 * This is a core model that is available through skills db
	 */
	User: typeof User
}
