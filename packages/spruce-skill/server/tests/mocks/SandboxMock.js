// @flow
const _ = require('lodash')
const { generateUserJWT } = require('../../server/lib/jwt')

module.exports = class SandboxMock {
	key: string
	app: any
	sandbox: Object
	sandboxOther: Object
	organization: Object
	locations: Object
	users: Object
	otherOrganization: Object
	otherLocations: Object
	otherUsers: Object

	constructor(app) {
		this.key = 'sandbox'
		this.app = app
		this.sandbox = {}
		this.organization = {}
		this.locations = {}
		this.otherOrganization = {}
		this.otherLocations = {}
	}

	async setup(options: {
		numLocations?: number,
		numOwners?: number,
		numGroupManagers?: number,
		numManagers?: number,
		numTeammates?: number,
		numGuests?: number,
		skillSlugs?: Array<string>,
		skill?: Object
	}) {
		if (!options) {
			options = {} // eslint-disable-line
		}

		this.createSandbox({
			numLocations: options.numLocations || 1,
			numOwners: options.numOwners || 3,
			numGroupManagers: options.numGroupManagers || 3,
			numManagers: options.numManagers || 2,
			numTeammates: options.numTeammates || 3,
			numGuests: options.numGuests || 4
		})
	}

	async createSandbox(options: {
		numLocations?: number,
		numOwners?: number,
		numGroupManagers?: number,
		numManagers?: number,
		numTeammates?: number,
		numGuests?: number
	}) {
		const sandbox: {
			organization?: any,
			category?: any,
			locations?: any,
			users?: any,
			skillMappings?: any
		} = {}
		const numLocations = options.numLocations
		const numOwners = options.numOwners
		const numTeammates = options.numTeammates
		const numGroupManagers = options.numGroupManagers
		const numManagers = options.numManagers
		const numGuests = options.numGuests
		const skillSlugs = options.skillSlugs
		const skill = options.skill

		// Create the organization
		sandbox.organization = await this.createOrganization({
			slug: skill.slug
		})

		await this.createDefaultGroup({
			organizationId: sandbox.organization.id
		})

		// Create the locations
		sandbox.locations = await this.createLocations({
			organizationId: sandbox.organization.id,
			slug: skill.slug,
			numLocations
		})

		sandbox.users = {
			users: [],
			userLocations: [],
			userOrganizations: [],
			userGroups: []
		}

		for (let i = 0; i < sandbox.locations.length; i += 1) {
			const result = await this.createUsers({
				numOwners,
				numGroupManagers,
				numManagers,
				numTeammates,
				numGuests,
				locationId: sandbox.locations[i].id,
				organizationId: sandbox.locations[i].OrganizationId
			})

			sandbox.users.users = sandbox.users.users.concat(result.users)
			sandbox.users.userLocations = sandbox.users.userLocations.concat(
				result.userLocations
			)
			sandbox.users.userOrganizations = sandbox.users.userOrganizations.concat(
				result.userOrganizations
			)
			sandbox.users.userGroups = sandbox.users.userGroups.concat(
				result.userGroups
			)

			// Create access points for each location
			sandbox.locations[i].accessPoints = await this.createAccessPoints({
				location: sandbox.locations[i],
				numAccessPoints: 1
			})
		}
	}

	async createOrganization(options: { slug: string }) {
		try {
			const orgName = `${options.slug}-${uuid.v4()}`
			const organization = await orm.models.Organization.create({
				name: orgName
			})

			return organization
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	async createDefaultGroup(organizationId: string) {
		const { group, locationGroups } = await orm.models.Group.create({
			isDefault: true,
			name: 'All Locations',
			organizationId
		})

		return { group, locationGroups }
	}

	async createDefaultJobs() {
		const jobData = [
			{
				id: uuid.v4(),
				role: 'teammate',
				isDefault: true,
				name: 'Teammate',
				OrganizationId: organizationId
			},
			{
				id: uuid.v4(),
				role: 'manager',
				isDefault: true,
				name: 'Manager',
				OrganizationId: organizationId
			},
			{
				id: uuid.v4(),
				role: 'groupManager',
				isDefault: true,
				name: 'Group Manager',
				OrganizationId: organizationId
			}
		]

		const result = await orm.models.Job.bulkCreate(jobData)

		return result
	}

	async createLocations(options: {
		organizationId: any,
		slug: string,
		numLocations: number
	}) {
		try {
			// Get default group
			const group = await orm.models.Group.findOne({
				where: {
					OrganizationId: options.organizationId,
					isDefault: true
				}
			})
			const locationsData = []
			const locationGroupData = []
			for (let i = 0; i < options.numLocations; i += 1) {
				const locationName = `${options.slug}-${uuid.v4()}`
				const id = uuid.v4()
				locationsData.push({
					id,
					isDebug: true,
					name: locationName,
					openTime: '08:00:00',
					closeTime: '20:00:00',
					timezone: 'America/Denver',
					addressLine1: faker.address.streetAddress(),
					addressLine2: null,
					addressCity: faker.address.city(),
					addressState: faker.address.stateAbbr(),
					addressZip: faker.address.zipCode(),
					storeNum: faker.company.companyName(),
					addressCountry: 'US',
					geo: {
						lat: faker.address.latitude(),
						lng: faker.address.longitude()
					},
					profileImageUUID: null,
					isPublic: true,
					OrganizationId: options.organizationId,
					slug: services.util.slugify(locationName)
				})

				locationGroupData.push({
					LocationId: id,
					GroupId: group.id
				})
			}

			const result = await orm.models.Location.bulkCreate(locationsData)
			const reloadPromises = result.map(r => r.reload())
			await orm.models.LocationGroup.bulkCreate(locationGroupData)
			await Promise.all(reloadPromises)
			return result
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	async createUsers(options: {
		numOwners: number,
		numGroupManagers: number,
		numManagers: number,
		numTeammates: number,
		numGuests: number,
		locationId: string,
		organizationId: string
	}) {
		try {
			// Get jobs
			const jobs = await orm.models.Job.findAll({
				where: {
					OrganizationId: options.organizationId
				}
			})

			// Get default group
			const group = await orm.models.Group.findOne({
				where: {
					OrganizationId: options.organizationId,
					isDefault: true
				}
			})

			const usersData = []
			const userLocationsData = []
			const userOrganizationsData = []
			const userGroupsData = []
			for (let i = 0; i < options.numOwners; i += 1) {
				const result = this.createUserData({
					jobs,
					role: 'owner',
					locationId: options.locationId,
					organizationId: options.organizationId,
					group
				})
				usersData.push(result.user)
				userLocationsData.push(result.userLocation)
				userOrganizationsData.push(result.userOrganization)
			}

			for (let i = 0; i < options.numGroupManagers; i += 1) {
				const result = this.createUserData({
					jobs,
					role: 'groupManager',
					locationId: options.locationId,
					organizationId: options.organizationId,
					group
				})
				usersData.push(result.user)
				userLocationsData.push(result.userLocation)
				userGroupsData.push(result.userGroup)
			}

			for (let i = 0; i < options.numManagers; i += 1) {
				const result = this.createUserData({
					jobs,
					role: 'manager',
					locationId: options.locationId,
					organizationId: options.organizationId,
					group
				})
				usersData.push(result.user)
				userLocationsData.push(result.userLocation)
			}

			for (let i = 0; i < options.numTeammates; i += 1) {
				const result = this.createUserData({
					jobs,
					role: 'teammate',
					locationId: options.locationId,
					group
				})
				usersData.push(result.user)
				userLocationsData.push(result.userLocation)
			}

			for (let i = 0; i < options.numGuests; i += 1) {
				const result = this.createUserData({
					jobs,
					role: 'guest',
					locationId: options.locationId,
					group
				})
				usersData.push(result.user)
				userLocationsData.push(result.userLocation)
			}

			const users = await orm.models.User.bulkCreate(usersData)
			const userLocations = await orm.models.UserLocation.bulkCreate(
				userLocationsData
			)
			const userOrganizations =
				userOrganizationsData.length > 0
					? await orm.models.UserOrganization.bulkCreate(userOrganizationsData)
					: []
			const userGroups =
				userGroupsData.length > 0
					? await orm.models.UserGroup.bulkCreate(userGroupsData)
					: []

			const userIds = users.map(u => u.id)

			const fullUsers = await orm.models.User.findAll({
				where: {
					id: {
						[Op.in]: userIds
					}
				},
				include: orm.models.User.includes({
					organizationId: options.organizationId,
					locationId: options.locationId
				})
			})

			return {
				users: fullUsers,
				userLocations,
				userOrganizations,
				userGroups
			}
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	parseUsers(options: {
		data: Object,
		users: Object,
		locations: Object,
		organization: Object
	}) {
		const data = options.data
		const users = options.users
		const locations = options.locations
		const organization = options.organization

		if (data.users && data.users.users) {
			data.users.users.forEach(user => {
				const jwt = generateUserJWT({
					user
				})
				if (_.includes(['success', 'superuser'], user.type)) {
					users[user.type].push({
						...user.get(),
						jwt
					})
				}
				if (
					user.UserLocations &&
					user.UserLocations[0] &&
					(user.UserLocations[0].role === 'guest' ||
						user.UserLocations[0].JobId)
				) {
					if (
						!locations[user.UserLocations[0].LocationId][
							user.UserLocations[0].role
						]
					) {
						locations[user.UserLocations[0].LocationId][
							user.UserLocations[0].role
						] = []
					}
					locations[user.UserLocations[0].LocationId][
						user.UserLocations[0].role
					].push({
						...user.get(),
						jwt
					})
				}
				if (user.UserGroups && user.UserGroups[0]) {
					// For tests, only groupManager is currently used.
					// TODO: Support other group roles in the future

					// if (!this.organization[user.UserGroups[0].role]) {
					// 	this.organization[user.UserGroups[0].role] = [];
					// }
					// this.organization[user.UserGroups[0].role].push({
					// 	...user.get(),
					// 	jwt
					// });
					if (!organization.groupManager) {
						organization.groupManager = []
					}
					organization.groupManager.push({
						...user.get(),
						jwt
					})
				}
				if (user.UserOrganizations && user.UserOrganizations[0]) {
					if (!organization[user.UserOrganizations[0].role]) {
						organization[user.UserOrganizations[0].role] = []
					}
					organization[user.UserOrganizations[0].role].push({
						...user.get(),
						jwt
					})

					// For v1 backwards compatibility, set org users on each location as well
					// Object.keys(this.locations).forEach(locationId => {
					// 	if (!this.locations[locationId][user.UserOrganizations[0].role]) {
					// 		this.locations[locationId][user.UserOrganizations[0].role] = [];
					// 	}
					// 	this.locations[locationId][user.UserOrganizations[0].role].push({
					// 		...user.get(),
					// 		jwt
					// 	});
					// });
				}
			})
		}
	}

	async teardown() {
		return
	}
}
