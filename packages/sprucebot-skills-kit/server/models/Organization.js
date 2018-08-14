// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html

const modelName = 'Organization'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING
		}
	}
	const options = {
		timestamps: true
	}
	const Organization = sequelize.define(modelName, attributes, options)

	Organization.associate = function(models) {
		Organization.hasMany(models.Location, { constraints: false })
		Organization.hasMany(models.Service, { constraints: false })
	}

	return Organization
}
