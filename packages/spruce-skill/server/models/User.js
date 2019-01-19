// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const config = require('config')
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

const modelName = 'User'

module.exports = (sequelize, DataTypes) => {
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
			get() {
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
			type: DataTypes.VIRTUAL,
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
			type: DataTypes.VIRTUAL,
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
	const options = {
		timestamps: true
	}
	const User = sequelize.define(modelName, attributes, options)

	User.associate = function(models) {
		User.belongsToMany(models.Location, {
			through: 'UserLocation',
			constraints: false
		})
		User.hasMany(models.UserLocation, {
			constraints: false
		})
	}

	User.scopes = {
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

	return User
}
