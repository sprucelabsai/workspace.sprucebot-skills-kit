// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const config = require('config')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const modelName = 'Group'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			comment: 'The group name',
			allowNull: false
		},
		isDefault: {
			type: DataTypes.BOOLEAN,
			comment:
				'Whether this is a default group. Default groups may not be deleted',
			allowNull: false,
			defaultValue: false
		}
	}
	const options = {
		timestamps: true
	}
	const Group = sequelize.define(modelName, attributes, options)

	Group.associate = function(models) {
		Group.belongsTo(models.Organization, {
			constraints: false
		})
		Group.hasMany(models.LocationGroup, {
			constraints: false
		})
		Group.hasMany(models.UserGroup, {
			constraints: false
		})
		Group.belongsToMany(models.Location, {
			constraints: false,
			through: models.LocationGroup
		})
		Group.belongsToMany(models.User, {
			constraints: false,
			through: models.UserGroup
		})
	}

	Group.scopes = {
		public: {
			attributes: []
		},
		team: {
			attributes: []
		}
	}

	return Group
}
