// @flow
export type Group = {
	id?: string,
	name: string,
	isDefault: boolean,
	OrganizationId: string,
	Organization: Organization
}

export type Organization = {
	id?: string,
	name: string,
	Services: Array<Tier>,
	Locations: Array<Location>
}

export type Location = {
	id?: string,
	name: string,
	addressLine1: string,
	addressLine2: string,
	addressCity: string,
	addressState: string,
	addressZip: string,
	addressCountry: string,
	timezone: string,
	isPublic: string,
	geo: Object,
	Appointments: Array<Appointment>
}

export type Job = {
	id?: string,
	isDefault: boolean,
	role: string,
	name: string,
	acl: Object,
	inStoreAcl: Object,
	OrganizationId: string,
	Organization: Organization
}
