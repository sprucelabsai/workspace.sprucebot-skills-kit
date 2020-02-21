import { FileItem } from '../models/FileItem'
import { Group } from '../models/Group'
import { Job } from '../models/Job'
import { Location } from '../models/Location'
import { LocationGroup } from '../models/LocationGroup'
import { Metadata } from '../models/Metadata'
import { Organization } from '../models/Organization'
import { Skill } from '../models/Skill'
import { User } from '../models/User'
import { UserGroup } from '../models/UserGroup'
import { UserLocation } from '../models/UserLocation'
import { UserOrganization } from '../models/UserOrganization'

/**
 * Defines the base Spruce core models available via FDW in skills kit
 */
export interface ISpruceModels {
	/**
	 * 🌲🤖 Core Spruce Model: FileItem
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	FileItem: typeof FileItem
	/**
	 * 🌲🤖 Core Spruce Model: Group
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	Group: typeof Group
	/**
	 * 🌲🤖 Core Spruce Model: Job
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	Job: typeof Job
	/**
	 * 🌲🤖 Core Spruce Model: Location
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	Location: typeof Location
	/**
	 * 🌲🤖 Core Spruce Model: LocationGroup
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	LocationGroup: typeof LocationGroup
	/**
	 * 🌲🤖 Core Spruce Model: Metadata
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	Metadata: typeof Metadata
	/**
	 * 🌲🤖 Core Spruce Model: Organization
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	Organization: typeof Organization
	/**
	 * 🌲🤖 Core Spruce Model: Skill
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	Skill: typeof Skill
	/**
	 * 🌲🤖 Core Spruce Model: User
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	User: typeof User
	/**
	 * 🌲🤖 Core Spruce Model: UserGroup
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	UserGroup: typeof UserGroup
	/**
	 * 🌲🤖 Core Spruce Model: UserLocation
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	UserLocation: typeof UserLocation
	/**
	 * 🌲🤖 Core Spruce Model: UserOrganization
	 *
	 * This is a core model that is available through skills db.
	 *
	 * You should interact with this model using services (https://developer.spruce.ai)
	 */
	UserOrganization: typeof UserOrganization
}
