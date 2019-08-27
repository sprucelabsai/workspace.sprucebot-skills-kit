export default {
	// These are ACLs from other skills or core that we're requesting
	requests: {
		// The permissions from Core that we're requesting
		core: ['can_manage_organization', 'can_update_location'],
		// The keys are the skill slug with an array of permissions from that skill we're requesting
		scheduling: ['can_update_timeblocks'],
		booking: ['can_create_appointment', 'can_edit_teammate_appointments']
	},
	// These are the ACLs that this skill publishes
	publishes: {
		can_do_example_location: {
			// The label will show up to describe this permission on the Organization Jobs management page
			label: 'If the user can do this example thing for a location.',
			// The type may be "organization" or "location". This determines how the permission is checked.
			type: 'location',
			// The default permissions for this ACL will be used if it is not overridden on the Organization Jobs management page
			defaults: {
				guest: false,
				teammate: true,
				manager: true,
				groupManager: true
			}
		},
		can_do_example_location_owner_only: {
			label:
				'If the user can do this example thing for a location. Org owner only',
			type: 'location',
			defaults: {}
		},
		can_do_example_organization: {
			label: 'If the user can do this example thing for an organization.',
			type: 'organization',
			defaults: {
				guest: false,
				teammate: false,
				manager: false,
				groupManager: true
			}
		},
		can_do_example_organization_owner_only: {
			label: 'If the user can do this example thing for an organization.',
			type: 'organization',
			defaults: {
				guest: false,
				teammate: false,
				manager: false,
				groupManager: false
			}
		}
	}
}
