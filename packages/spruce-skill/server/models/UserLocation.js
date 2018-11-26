// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html

const modelName = 'UserLocation'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		role: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		visits: {
			type: DataTypes.INTEGER
		},
		lastRecordedVisit: {
			type: DataTypes.DATE
		}
	}
	const options = {
		timestamps: true
	}
	const UserLocation = sequelize.define(modelName, attributes, options)

	UserLocation.associate = function(models) {
		UserLocation.belongsTo(models.User, { constraints: false })
		UserLocation.belongsTo(models.Location, { constraints: false })
	}

	return UserLocation
}
