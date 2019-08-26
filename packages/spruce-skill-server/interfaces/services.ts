import Acl from '../services/Acl'
import Cache from '../services/Cache'
import Uploads from '../services/Uploads'
import Onboarding from '../services/Onboarding'

/**
 * Defines the base Spruce core models available via FDW in skills kit
 */
export interface ISpruceServices {
	/**
	 * 🌲🤖 Core Spruce Service: ACLs
	 *
	 * Manage ACLs
	 */
	acl: Acl
	/**
	 * 🌲🤖 Core Spruce Service: Cache
	 *
	 * Cache things to speed up your skill. Fast!
	 */
	cache: Cache
	/**
	 * 🌲🤖 Core Spruce Service: Uploads
	 *
	 * Uploads are a breeze!
	 */
	uploads: Uploads
	/**
	 * 🌲🤖 Core Spruce Service: Cache
	 *
	 * Cache things to speed up your skill. Fast!
	 */
	onboarding: Onboarding
}
