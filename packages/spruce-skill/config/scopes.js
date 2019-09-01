// For mutations/queries that may need to add a base path to the scope.
// For example, if you have a mutation called "updateAppointment" that returns an "Appointment", the base scope would be "updateAppointment"
function scopeWithBase({ base, scope }) {
	if (!base) {
		return scope
	}

	const baseScope = {}
	Object.keys(scope).forEach(k => {
		baseScope[`${base}.${k}`] = scope[k]
	})
	return baseScope
}

module.exports = {
	Locations: {
		public: base =>
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
		public: base =>
			scopeWithBase({
				scope: {
					Organization: 'public',
					'Organization.Locations': 'public'
				},
				base
			})
	},
	Users: {
		public: base =>
			scopeWithBase({
				scope: {
					Users: 'public'
				},
				base
			}),
		team: base =>
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
		team: base =>
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
		public: base =>
			scopeWithBase(
				{
					scope: {
						loadFirstLocations: 'public',
						'oadFirstLocations.Organization': 'public'
					}
				},
				base
			)
	}
}
