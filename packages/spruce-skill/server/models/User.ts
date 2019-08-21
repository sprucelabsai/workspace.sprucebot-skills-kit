// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import config from 'config'
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize'
import {
	SpruceModel,
	ISpruceModel,
	ISpruceSkillModels
} from 'server/types/models'

export class User extends SpruceModel<User> {
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
				'casualName'
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

	// Define model types
	public id!: string
	public firstName?: string | null
	/*

	*/
	public lastName?: string | null
	public profileImageUUID?: string | null
	public name!: string
	public nameWithLastInitial!: string
	public casualName!: string
	public profileImages?: Record<string, any> | null
	public defaultProfileImages!: Record<string, any>
	public readonly createdAt!: Date
	public readonly updatedAt!: Date

	// Set up associations
	public static associate(models: ISpruceSkillModels): void {
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

// Attribute definitions
const attributes = {
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
		get() {
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
		get() {
			let name = 'Friend'
			if (this.firstName) {
				name = this.firstName
			}
			return name
		}
	},
	profileImages: {
		type: DataTypes.VIRTUAL(DataTypes.JSON),
		get() {
			if (this.profileImageUUID) {
				const profileImages = {}
				const sizes = ['60', '60@2x', '150', '150@2x']
				sizes.forEach(size => {
					profileImages['profile' + size] =
						'https://s3.amazonaws.com/' +
						config.S3_BUCKET +
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
		get() {
			const profileImages = {}
			const sizes = ['60', '60@2x', '150', '150@2x']
			sizes.forEach(size => {
				profileImages['profile' + size] =
					'https://s3.amazonaws.com/' +
					config.S3_BUCKET +
					'/default-profile--X' +
					size +
					'.jpg'
			})
			return profileImages
		}
	}
}

export default (sequelize: Sequelize) => {
	const model = User.init(attributes, {
		sequelize
	})

	return model
}

// const modelName = 'User'

// module.exports = (sequelize, DataTypes) => {
// 	const attributes = {
// 		id: {
// 			type: DataTypes.UUID,
// 			defaultValue: DataTypes.UUIDV4,
// 			primaryKey: true
// 		},
// 		firstName: {
// 			type: DataTypes.STRING
// 		},
// 		// lastName May not be available depending on skill permissions
// 		lastName: {
// 			type: DataTypes.STRING
// 		},
// 		// phoneNumber May not be available depending on skill permissions
// 		// phoneNumber: {
// 		// 	type: DataTypes.STRING
// 		// },
// 		profileImageUUID: {
// 			type: DataTypes.STRING
// 		},
// 		name: {
// 			type: DataTypes.VIRTUAL,
// 			get() {
// 				let name = 'Friend'
// 				if (this.firstName) {
// 					name = this.firstName

// 					if (this.lastName && this.lastName.length > 0) {
// 						name += ` ${this.lastName}`
// 					}
// 				}
// 				return name
// 			}
// 		},
// 		nameWithLastInitial: {
// 			type: DataTypes.VIRTUAL,
// 			get() {
// 				let name = 'Friend'
// 				if (this.firstName) {
// 					name = this.firstName

// 					if (this.lastName && this.lastName.length > 0) {
// 						name += ` ${this.lastName.charAt(0)}.`
// 					}
// 				}
// 				return name
// 			}
// 		},
// 		casualName: {
// 			type: DataTypes.VIRTUAL,
// 			get() {
// 				let name = 'Friend'
// 				if (this.firstName) {
// 					name = this.firstName
// 				}
// 				return name
// 			}
// 		},
// 		profileImages: {
// 			type: DataTypes.VIRTUAL(DataTypes.JSON),
// 			get() {
// 				if (this.profileImageUUID) {
// 					const profileImages = {}
// 					const sizes = ['60', '60@2x', '150', '150@2x']
// 					sizes.forEach(size => {
// 						profileImages['profile' + size] =
// 							'https://s3.amazonaws.com/' +
// 							config.S3_BUCKET +
// 							'/userProfileImages/' +
// 							this.profileImageUUID +
// 							'--X' +
// 							size +
// 							'.png'
// 					})
// 					return profileImages
// 				}
// 				return null
// 			}
// 		},
// 		defaultProfileImages: {
// 			type: DataTypes.VIRTUAL(DataTypes.JSON),
// 			get() {
// 				const profileImages = {}
// 				const sizes = ['60', '60@2x', '150', '150@2x']
// 				sizes.forEach(size => {
// 					profileImages['profile' + size] =
// 						'https://s3.amazonaws.com/' +
// 						config.S3_BUCKET +
// 						'/default-profile--X' +
// 						size +
// 						'.jpg'
// 				})
// 				return profileImages
// 			}
// 		}
// 	}
// 	const options = {
// 		timestamps: true
// 	}
// 	const User = sequelize.define(modelName, attributes, options)

// 	User.associate = function(models) {
// 		User.belongsToMany(models.Location, {
// 			through: models.UserLocation
// 		})
// 		User.hasMany(models.UserLocation, {
// 			constraints: false
// 		})
// 		User.belongsToMany(models.Organization, {
// 			through: models.UserOrganization,
// 			constraints: false
// 		})
// 		User.hasMany(models.UserOrganization, {
// 			constraints: false
// 		})
// 		User.belongsToMany(models.Group, {
// 			through: models.UserGroup,
// 			constraints: false
// 		})
// 		User.hasMany(models.UserGroup, {
// 			constraints: false
// 		})
// 	}

// 	User.scopes = {
// 		public: {
// 			attributes: [
// 				'id',
// 				'firstName',
// 				'lastName',
// 				'name',
// 				'profileImageUUID',
// 				'profileImages',
// 				'defaultProfileImages',
// 				'casualName'
// 			]
// 		},
// 		team: {
// 			attributes: [
// 				'id',
// 				'firstName',
// 				'lastName',
// 				'name',
// 				'profileImageUUID',
// 				'profileImages',
// 				'defaultProfileImages',
// 				'casualName',
// 				'Locations',
// 				'UserLocations',
// 				'UserGroups',
// 				'UserOrganizations'
// 			]
// 		}
// 	}

// 	return User
// }
