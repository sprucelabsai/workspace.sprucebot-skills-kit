// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import config from 'config'
import { Sequelize, DataTypes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'
import { Location } from './Location'
import { UserLocation } from './UserLocation'
import { Organization } from './Organization'
import { UserOrganization } from './UserOrganization'
import { Group } from './Group'
import { UserGroup } from './UserGroup'
import SpruceCoreModel from '../lib/SpruceModel'

export class User extends SpruceCoreModel<User> {
	// Prevents sequelize from trying to run sync against this model
	public static readonly doNotSync = true
	public static readonly paranoid = false
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: [
				'id',
				'firstName',
				'lastName',
				'name',
				'profileImageUUID',
				'profileImages',
				'defaultProfileImages',
				'casualName',
				'Locations'
			]
		},
		team: {
			attributes: [
				'id',
				'firstName',
				'lastName',
				'name',
				'profileImageUUID',
				'profileImages',
				'defaultProfileImages',
				'casualName',
				'Locations',
				'UserLocations',
				'UserGroups',
				'UserOrganizations'
			]
		}
	}

	public static readonly attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING
		},
		// lastName May not be available depending on skill permissions
		lastName: {
			type: DataTypes.STRING
		},
		// phoneNumber May not be available depending on skill permissions
		// phoneNumber: {
		// 	type: DataTypes.STRING
		// },
		profileImageUUID: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.VIRTUAL,
			get(this: User) {
				let name = 'Friend'
				if (this.firstName) {
					name = this.firstName

					if (this.lastName && this.lastName.length > 0) {
						name += ` ${this.lastName}`
					}
				}
				return name
			}
		},
		nameWithLastInitial: {
			type: DataTypes.VIRTUAL,
			get(this: User) {
				let name = 'Friend'
				if (this.firstName) {
					name = this.firstName

					if (this.lastName && this.lastName.length > 0) {
						name += ` ${this.lastName.charAt(0)}.`
					}
				}
				return name
			}
		},
		casualName: {
			type: DataTypes.VIRTUAL,
			get(this: User) {
				let name = 'Friend'
				if (this.firstName) {
					name = this.firstName
				}
				return name
			}
		},
		profileImages: {
			type: DataTypes.VIRTUAL(DataTypes.JSON),
			get(this: User) {
				if (this.profileImageUUID) {
					const profileImages: Record<string, any> = {}
					const sizes = ['60', '60@2x', '150', '150@2x']
					sizes.forEach(size => {
						profileImages['profile' + size] =
							'https://s3.amazonaws.com/' +
							config.get<string>('S3_BUCKET') +
							'/userProfileImages/' +
							this.profileImageUUID +
							'--X' +
							size +
							'.png'
					})
					return profileImages
				}
				return null
			}
		},
		defaultProfileImages: {
			type: DataTypes.VIRTUAL(DataTypes.JSON),
			get(this: User) {
				const profileImages: Record<string, any> = {}
				const sizes = ['60', '60@2x', '150', '150@2x']
				sizes.forEach(size => {
					profileImages['profile' + size] =
						'https://s3.amazonaws.com/' +
						config.get('S3_BUCKET') +
						'/default-profile--X' +
						size +
						'.jpg'
				})
				return profileImages
			}
		}
	}

	// Define model types
	public id!: string
	public firstName?: string | null
	public lastName?: string | null
	/**
	 * Phone number of the user might not be available
	 */
	public phoneNumber?: string | null
	public profileImageUUID?: string | null
	public name!: string
	public nameWithLastInitial!: string
	public casualName!: string
	public profileImages?: Record<string, any> | null
	public defaultProfileImages!: Record<string, any>
	public Locations!: Location[] | null
	public UserLocations!: UserLocation[] | null
	public Organizations!: Organization[] | null
	public UserOrganizations!: UserOrganization[] | null
	public Groups!: Group[] | null
	public UserGroups!: UserGroup[] | null
	public readonly createdAt!: Date
	public readonly updatedAt!: Date

	// Set up associations
	public static associate(models: ISpruceModels): void {
		this.belongsToMany(models.Location, {
			through: models.UserLocation
		})
		this.hasMany(models.UserLocation, {
			constraints: false
		})
		this.belongsToMany(models.Organization, {
			through: models.UserOrganization,
			constraints: false
		})
		this.hasMany(models.UserOrganization, {
			constraints: false
		})
		this.belongsToMany(models.Group, {
			through: models.UserGroup,
			constraints: false
		})
		this.hasMany(models.UserGroup, {
			constraints: false
		})
	}
}

export default (sequelize: Sequelize) => {
	const model = User.initialize(sequelize)

	return model
}
