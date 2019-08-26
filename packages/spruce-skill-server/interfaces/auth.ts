export interface ISpruceAuthJob {
	name: string
	isDefault: boolean
	role: 'teammate' | 'manager' | 'groupManager' | 'owner'
}

export interface ISpruceAuthGroup {
	name: string
}

export interface ISpruceAuthUserLocation<IAuthJob = ISpruceAuthJob> {
	role: string
	LocationId: string
	Job?: IAuthJob
}

export interface ISpruceAuthOrganization {
	id: string
	name: string
	slug: string
}

export interface ISpruceAuthLocation {
	id: string
	name: string
	slug: string
}

export interface ISpruceAuthUser<
	IAuthUserLocation = ISpruceAuthUserLocation,
	IAuthGroup = ISpruceAuthGroup
> {
	id: string
	firstName?: string
	lastName?: string
	UserLocations: {
		edges: {
			node: IAuthUserLocation
		}[]
	}
	UserGroups: {
		edges: {
			node: {
				Group: IAuthGroup
			}
		}[]
	}
	UserOrganizations: {
		edges: {
			node: {
				role: string
				OrganizationId: string
			}
		}[]
	}
}

export interface ISpruceAuth<
	IAuthUser = ISpruceAuthUser,
	IAuthOrganization = ISpruceAuthOrganization,
	IAuthLocation = ISpruceAuthLocation
> {
	User: IAuthUser
	Organization: IAuthOrganization
	Location: IAuthLocation
}
