import Acl from '../services/acl'

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
}
