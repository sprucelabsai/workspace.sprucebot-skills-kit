// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html

const modelName = 'UserOrganization'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		role: {
			type: DataTypes.STRING
		}
	}
	const options = {
		timestamps: true
	}
	const UserOrganization = sequelize.define(modelName, attributes, options)

	UserOrganization.associate = function(models) {
		UserOrganization.belongsTo(models.User, { constraints: false })
		UserOrganization.belongsTo(models.Organization, { constraints: false })
	}

	UserOrganization.scopes = {
		public: {
			attributes: ['id']
		},
		team: {
			attributes: [
				'id',
				'role',
				'UserId',
				'User',
				'OrganizationId',
				'Organization'
			]
		}
	}

	return UserOrganization
}
