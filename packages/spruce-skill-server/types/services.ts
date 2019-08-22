import Acl from '../services/Acl'
import Cache from '../services/Cache'

/**
 * Defines the base Spruce core models available via FDW in skills kit
 */
export interface ISpruceCoreSkillServices {
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
}
