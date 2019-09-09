export interface ISpruceAcls {
	// TODO: Add link to acl list
	/**
	 * 🌲🤖 These are the ACLs your skill needs to know about.
	 * */
	requests: {
		[slug: string]: string[]
	}
	/**
	 * 🌲🤖 These are the ACLs your skill is adding
	 * The key (permissionName) must be a valid JSON key without quotes
	 * That means you can not use dashes - use underscores instead
	 * */
	publishes: {
		/** 🌲🤖 The name of your permission. This must be a valid JSON key without quotes */
		[permissionName: string]: {
			/** 🌲🤖 A short title for your permission */
			label: string
			/** 🌲🤖 A detailed explanation of what your permission does */
			description: string
			/**
			 * 🌲🤖 The type of permission
			 * "location" - Enforced at a location level
			 * "organization" - Enforced at an organization level. Note that "teammate" and "manager" apply if the user has that role at ANY location within the organization
			 */
			type: 'location' | 'organization'
			/** 🌲🤖 The default permission to apply if no override is set. This can be overridden for Jobs. */
			defaults: {
				guest?: boolean
				teammate?: boolean
				manager?: boolean
				groupManager?: boolean
				[key: string]: boolean | undefined
			}
		}
	}
}
