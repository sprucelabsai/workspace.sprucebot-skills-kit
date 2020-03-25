// For mutations/queries that may need to add a base path to the scope.
// For example, if you have a mutation called "updateAppointment" that returns an "Appointment", the base scope would be "updateAppointment"
function scopeWithBase(options: {
	base?: string
	scope: Record<string, any>
}): Record<string, any> {
	const { base, scope } = options
	if (!base) {
		return scope
	}

	const baseScope: Record<string, any> = {}
	Object.keys(scope).forEach(k => {
		baseScope[`${base}.${k}`] = scope[k]
	})
	return baseScope
}

export default {
	Locations: {
		public: (base?: string) =>
			scopeWithBase({
				scope: {
					Locations: 'public',
					'Locations.Users': 'public',
					'Locations.UserLocations': 'public'
				},
				base
			})
	},
	Organization: {
		public: (base?: string) =>
			scopeWithBase({
				scope: {
					Organization: 'public',
					'Organization.Locations': 'public'
				},
				base
			})
	},
	Users: {
		public: (base?: string) =>
			scopeWithBase({
				scope: {
					Users: 'public'
				},
				base
			}),
		team: (base?: string) =>
			scopeWithBase({
				scope: {
					Users: 'team',
					'Users.UserGroups': 'team',
					'Users.UserGroups.Job': 'team',
					'Users.UserOrganizations': 'team',
					'Users.UserLocations': 'team',
					'Users.UserLocations.Job': 'team',
					'Users.UserLocations.Location': 'public'
				},
				base
			})
	},
	UserLocations: {
		team: (base?: string) =>
			scopeWithBase({
				scope: {
					UserLocations: 'team',
					'UserLocations.User': 'team',
					'UserLocations.Location': 'public'
				},
				base
			})
	},
	Mock: {
		public: (base?: string) =>
			scopeWithBase({
				scope: {
					loadFirstLocations: 'public',
					'loadFirstLocations.Organization': 'public',
					getFirstUser: 'public',
					loadUserOrLocation: 'public'
				},
				base
			})
	}
}
