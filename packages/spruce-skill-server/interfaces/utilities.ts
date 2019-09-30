import Settings from '../utilities/Settings'
import lang from '../utilities/lang'

/**
 * Defines the base Spruce core utilities
 */
export interface ISpruceUtilities {
	/**
	 * 🌲🤖 Core Spruce Utility: Settings
	 *
	 * Takes settings from your config and performs helpful transformations
	 */
	settings: Settings

	/**
	 * 🌲🤖 Core Spruce Utility: DEPRECATED lang
	 *
	 * Pull copy from the './lang/default.json'.
	 */
	lang: typeof lang
}
