// @flow
// For mutations/queries that may need to add a base path to the scope.
// For example, if you have a mutation called "updateAppointment" that returns an "Appointment", the base scope would be "updateAppointment"
function scopeWithBase({ base, scope }: { base: string, scope: Object }) {
	if (!base) {
		return scope
	}

	const baseScope = {}
	Object.keys(scope).forEach(k => {
		baseScope[`${base}.${k}`] = scope[k]
	})
	return baseScope
}

module.exports = {}
