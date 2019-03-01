// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const modelName = 'LocationGroup'

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
	const LocationGroup = sequelize.define(modelName, attributes, options)

	LocationGroup.associate = function(models) {
		LocationGroup.belongsTo(models.Location, {
			constraints: false
		})
		LocationGroup.belongsTo(models.Group, {
			constraints: false
		})
	}

	LocationGroup.scopes = {
		public: {
			attributes: []
		},
		team: {
			attributes: []
		}
	}

	return LocationGroup
}
