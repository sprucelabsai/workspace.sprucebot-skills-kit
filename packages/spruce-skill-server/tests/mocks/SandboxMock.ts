import Debug from 'debug'
const debug = Debug('spruce-skill-server')
import Koa from 'koa'
import { ISpruceSkillContext } from '../../interfaces/ctx'
import _ from 'lodash'
import { generateSkillJWT } from '../lib/jwt'
import faker from 'faker'
import uuid from 'uuid'
import slug from 'slug'
import config from 'config'
import { Op } from 'sequelize'
import { Organization } from '../../models/Organization'
import { Location } from '../../models/Location'
import { Job } from '../../models/Job'
import { Group } from '../../models/Group'
import { Skill } from '../../models/Skill'
import { UserLocation } from '../../models/UserLocation'
import { UserGroup } from '../../models/UserGroup'
import { UserOrganization } from '../../models/UserOrganization'
import { User } from '../../models/User'

export interface IMockUser extends User {
	jwt: string
}

export interface IMockOrganization extends Organization {
	owner: IMockUser[]
	groupManager: IMockUser[]
}

export interface IMockLocation extends Location {
	owner: IMockUser[]
	teammate: IMockUser[]
	guest: IMockUser[]
}

export interface IMockSkill extends Skill {
	apiKey?: string
}

interface ISandbox {
	organization: IMockOrganization
	locations: IMockLocation[]
	skill: IMockSkill
	users: {
		users: User[]
		userLocations: UserLocation[]
		userOrganizations: UserOrganization[]
		userGroups: UserGroup[]
	}
}

export default class SandboxMock {
	public key: string
	public organization!: IMockOrganization
	public locations!: {
		[locationId: string]: IMockLocation
	}
	public skill!: IMockSkill
	public otherOrganization!: IMockOrganization
	public otherLocations!: {
		[locationId: string]: IMockLocation
	}
	public otherSkill!: IMockSkill
	private ctx!: ISpruceSkillContext

	public constructor(app: Koa<any>) {
		this.ctx = app.context as ISpruceSkillContext
		this.key = 'sandbox'
	}

	public async setup(options: Record<string, any>): Promise<void> {
		if (!options) {
			options = {} // eslint-disable-line
		}

		const sandbox = await this.createSandbox({
			numLocations: options.numLocations || 1,
			numOwners: options.numOwners || 3,
			numGroupManagers: options.numGroupManagers || 3,
			numManagers: options.numManagers || 2,
			numTeammates: options.numTeammates || 3,
			numGuests: options.numGuests || 4
		})

		const sandboxOther = await this.createSandbox({
			numLocations: options.numLocations || 1,
			numOwners: options.numOwners || 3,
			numGroupManagers: options.numGroupManagers || 3,
			numManagers: options.numManagers || 2,
			numTeammates: options.numTeammates || 3,
			numGuests: options.numGuests || 4
		})

		const { locations, organization } = this.parseUsers(sandbox)
		const {
			locations: otherLocations,
			organization: otherOrganization
		} = this.parseUsers(sandboxOther)

		this.locations = locations
		this.organization = organization
		this.skill = sandbox.skill

		this.otherLocations = otherLocations
		this.otherOrganization = otherOrganization
		this.otherSkill = sandboxOther.skill

		debug('Sandbox mock created')
	}

	public async createSkill(): Promise<IMockSkill> {
		const skillName = faker.lorem.words()
		const skillSlug = slug(skillName, { lower: true })
		const skill: IMockSkill = await this.ctx.db.models.Skill.create({
			id: uuid.v4(),
			name: skillName,
			slug: skillSlug,
			description: faker.lorem.sentences(),
			icon: ''
		})

		skill.apiKey = config.API_KEY

		return skill
	}

	public async createSandbox(options: {
		numLocations: number
		numOwners: number
		numTeammates: number
		numGroupManagers: number
		numManagers: number
		numGuests: number
	}): Promise<ISandbox> {
		const sandbox: Record<string, any> = {}

		sandbox.skill = await this.createSkill()

		const numLocations = options.numLocations
		const numOwners = options.numOwners
		const numTeammates = options.numTeammates
		const numGroupManagers = options.numGroupManagers
		const numManagers = options.numManagers
		const numGuests = options.numGuests

		// Create the organization
		sandbox.organization = await this.createOrganization()

		await this.createDefaultJobs(sandbox.organization)

		const group = await this.createDefaultGroup({
			organizationId: sandbox.organization.id
		})

		// Create the locations
		sandbox.locations = await this.createLocations({
			organizationId: sandbox.organization.id,
			group,
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
		}

		return sandbox as ISandbox
	}

	public async createOrganization(): Promise<Organization> {
		try {
			const orgName = faker.company.companyName()
			const organization = await this.ctx.db.models.Organization.create({
				id: uuid.v4(),
				name: orgName
			})

			return organization
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	public async createDefaultGroup(options: {
		organizationId: string
	}): Promise<Group> {
		const { organizationId } = options
		const group = await this.ctx.db.models.Group.create({
			isDefault: true,
			name: 'All Locations',
			OrganizationId: organizationId
		})

		return group
	}

	public async createDefaultJobs(organization: Organization): Promise<Job[]> {
		const jobData = [
			{
				id: uuid.v4(),
				role: 'teammate',
				isDefault: true,
				name: 'Teammate',
				OrganizationId: organization.id
			},
			{
				id: uuid.v4(),
				role: 'manager',
				isDefault: true,
				name: 'Manager',
				OrganizationId: organization.id
			},
			{
				id: uuid.v4(),
				role: 'groupManager',
				isDefault: true,
				name: 'Group Manager',
				OrganizationId: organization.id
			}
		]

		const result = await this.ctx.db.models.Job.bulkCreate(jobData)

		return result
	}

	public async createLocations(options: {
		group: Group
		numLocations: number
		organizationId: string
	}): Promise<Location[]> {
		try {
			// Get default group
			const group = options.group
			const locationsData = []
			const locationGroupData = []
			for (let i = 0; i < options.numLocations; i += 1) {
				const locationName = uuid.v4()
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
					geo: JSON.stringify({
						lat: faker.address.latitude(),
						lng: faker.address.longitude()
					}),
					profileImageUUID: null,
					isPublic: true,
					OrganizationId: options.organizationId,
					slug: slug(locationName, { lower: true })
				})

				locationGroupData.push({
					LocationId: id,
					GroupId: group.id
				})
			}

			const result = await this.ctx.db.models.Location.bulkCreate(locationsData)
			const reloadPromises = result.map(r => r.reload())
			await this.ctx.db.models.LocationGroup.bulkCreate(locationGroupData)
			await Promise.all(reloadPromises)
			return result
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	public async createUsers(options: {
		locationId: string
		organizationId: string
		numOwners: number
		numGroupManagers: number
		numManagers: number
		numTeammates: number
		numGuests: number
	}): Promise<{
		users: User[]
		userLocations: UserLocation[]
		userOrganizations: UserOrganization[]
		userGroups: UserGroup[]
	}> {
		try {
			// Get jobs
			const jobs = await this.ctx.db.models.Job.findAll({
				where: {
					OrganizationId: options.organizationId
				}
			})

			// Get default group
			const group = await this.ctx.db.models.Group.findOne({
				where: {
					OrganizationId: options.organizationId,
					isDefault: true
				}
			})

			if (!group) {
				throw new Error('Sandbox: Unable to get default group')
			}

			const usersData: Record<string, any>[] = []
			const userLocationsData: Record<string, any>[] = []
			const userOrganizationsData: Record<string, any>[] = []
			const userGroupsData: Record<string, any>[] = []
			for (let i = 0; i < options.numOwners; i += 1) {
				const result = this.createUserData({
					jobs,
					role: 'owner',
					locationId: options.locationId,
					organizationId: options.organizationId,
					group
				})
				usersData.push(result.user)
				if (!result.userLocation || !result.userOrganization) {
					throw new Error('Sandbox: Error creating records for owners')
				}
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
				if (!result.userLocation || !result.userGroup) {
					throw new Error('Sandbox: Error creating records for groupManagers')
				}
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
				if (!result.userLocation) {
					throw new Error('Sandbox: Error creating records for managers')
				}
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
				if (!result.userLocation) {
					throw new Error('Sandbox: Error creating records for teammates')
				}
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
				if (!result.userLocation) {
					throw new Error('Sandbox: Error creating records for guests')
				}
				userLocationsData.push(result.userLocation)
			}

			const users = await this.ctx.db.models.User.bulkCreate(usersData)
			const userLocations = await this.ctx.db.models.UserLocation.bulkCreate(
				userLocationsData
			)
			const userOrganizations =
				userOrganizationsData.length > 0
					? await this.ctx.db.models.UserOrganization.bulkCreate(
							userOrganizationsData
					  )
					: []
			const userGroups =
				userGroupsData.length > 0
					? await this.ctx.db.models.UserGroup.bulkCreate(userGroupsData)
					: []

			const userIds = users.map(u => u.id)

			const userFindOptions: Record<string, any> = {
				where: {
					id: {
						[Op.in]: userIds
					}
				},
				include: [
					{
						required: false,
						model: this.ctx.db.models.UserOrganization
					},
					{
						required: false,
						model: this.ctx.db.models.UserLocation,
						include: [this.ctx.db.models.Job]
					},
					{
						required: false,
						model: this.ctx.db.models.UserGroup,
						include: [
							this.ctx.db.models.Job,
							{
								model: this.ctx.db.models.Group,
								include: this.ctx.db.models.Location
							}
						]
					}
				]
			}
			const fullUsers = await this.ctx.db.models.User.findAll(userFindOptions)

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

	private parseUsers(
		options: ISandbox
	): {
		locations: {
			[locationId: string]: IMockLocation
		}
		organization: IMockOrganization
	} {
		const users = options.users
		const locations: {
			[locationId: string]: IMockLocation
		} = {}
		options.locations.forEach(location => {
			locations[location.id] = location as IMockLocation
		})
		const location = options.locations[0]
		const organization = options.organization
		const skill = options.skill

		if (users && users.users) {
			users.users.forEach(user => {
				const jwt = generateSkillJWT({
					skill,
					user,
					location,
					organization
				})

				if (
					user.UserLocations &&
					user.UserLocations[0] &&
					user.UserLocations[0].LocationId &&
					(user.UserLocations[0].role === 'guest' ||
						user.UserLocations[0].JobId)
				) {
					if (!locations[user.UserLocations[0].LocationId]) {
						// @ts-ignore
						locations[user.UserLocations[0].LocationId] = {}
					}

					if (
						// @ts-ignore
						!locations[user.UserLocations[0].LocationId][
							user.UserLocations[0].role
						]
					) {
						// @ts-ignore
						locations[user.UserLocations[0].LocationId][
							user.UserLocations[0].role
						] = []
					}
					// @ts-ignore
					locations[user.UserLocations[0].LocationId][
						user.UserLocations[0].role
					].push({
						...user.get(),
						jwt
					})
				}
				if (user.UserGroups && user.UserGroups[0]) {
					if (!organization.groupManager) {
						organization.groupManager = []
					}
					// @ts-ignore
					organization.groupManager.push({
						...user.get(),
						jwt
					})
				}
				if (user.UserOrganizations && user.UserOrganizations[0]) {
					// @ts-ignore
					if (!organization[user.UserOrganizations[0].role]) {
						// @ts-ignore
						organization[user.UserOrganizations[0].role] = []
					}
					// @ts-ignore
					organization[user.UserOrganizations[0].role].push({
						...user.get(),
						jwt
					})
				}
			})
		}

		debug('done parsing users')
		return { locations, organization }
	}

	private createUserData(options: {
		locationId: string
		jobs: Job[]
		role: string
		group: Group
		organizationId?: string
		type?: string
	}): {
		user: Record<string, any>
		userLocation: Record<string, any> | undefined
		userOrganization: Record<string, any> | undefined
		userGroup: Record<string, any> | undefined
	} {
		const job = options.jobs
			? options.jobs.find(j => j.role === options.role)
			: null

		const user = {
			id: uuid.v4(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			phoneNumber: this.createPhone(),
			type: options.type || 'regular',
			profileImageUUID: null,
			superuser: false,
			isDebug: true
		}
		let userLocation
		if (options.role === 'guest') {
			userLocation = {
				visits: _.random(0, 1000),
				role: options.role,
				UserId: user.id,
				LocationId: options.locationId,
				JobId: null
			}
		}

		if (job && _.includes(['manager', 'teammate'], job.role)) {
			let ulRole = job.role
			if (job.role === 'manager') {
				ulRole = 'owner'
			}
			userLocation = {
				visits: _.random(0, 1000),
				role: ulRole,
				UserId: user.id,
				LocationId: options.locationId,
				JobId: job.id
			}
		}
		let userGroup
		if (job && job.role === 'groupManager') {
			userGroup = {
				UserId: user.id,
				GroupId: options.group.id,
				OrganizationId: options.organizationId,
				JobId: job.id
			}
			userLocation = {
				UserId: user.id,
				LocationId: options.locationId,
				JobId: null,
				visits: 0,
				role: 'owner'
			}
		}

		let userOrganization

		if (options.role === 'owner' && options.organizationId) {
			userOrganization = {
				role: options.role,
				UserId: user.id,
				OrganizationId: options.organizationId
			}
			userLocation = {
				UserId: user.id,
				LocationId: options.locationId,
				JobId: null,
				visits: 0,
				role: 'owner'
			}
		}

		return {
			user,
			userLocation,
			userOrganization,
			userGroup
		}
	}

	private createPhone(): string {
		const phone = faker.phone.phoneNumberFormat(0)
		return `555${phone.substr(3)}`
	}
}
