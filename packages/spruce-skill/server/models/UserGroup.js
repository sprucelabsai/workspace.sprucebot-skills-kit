// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const modelName = 'UserGroup'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		}
	}
	const options = {
		timestamps: true
	}
	const UserGroup = sequelize.define(modelName, attributes, options)

	UserGroup.associate = function(models) {
		UserGroup.belongsTo(models.User, {
			constraints: false
		})
		UserGroup.belongsTo(models.Group, {
			constraints: false
		})
		UserGroup.belongsTo(models.Job, {
			constraints: false
		})
		UserGroup.belongsTo(models.Organization, {
			constraints: false
		})
	}

	UserGroup.scopes = {
		public: {
			attributes: []
		},
		team: {
			attributes: []
		}
	}

	return UserGroup
}
