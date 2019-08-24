import {
	ISpruceCoreSkillModels,
	SpruceCoreModel
} from '@sprucelabs/spruce-skill-server'

/************************************************************
 * Base class that all models inherit from
 ************************************************************/
export class SpruceModel<T> extends SpruceCoreModel<T> {}

/**
 * All models available in the app should be defined here.
 * In addition to the custom models defined below, skills kit
 * db provides additional core models
 */
export interface ISpruceSkillModels extends ISpruceCoreSkillModels {
	//////////////////////////////////////////////////////////////////////
	// CUSTOM MODELS
	// When you create a new model place the definition here
	//////////////////////////////////////////////////////////////////////
}
