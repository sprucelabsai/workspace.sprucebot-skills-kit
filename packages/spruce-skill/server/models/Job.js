// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const config = require('config')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const modelName = 'Job'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		isDefault: {
			type: DataTypes.BOOLEAN,
			comment:
				'Whether this is a default job. Default jobs may not be changed or have their ACLs updated',
			allowNull: false,
			defaultValue: false
		},
		role: {
			type: DataTypes.STRING,
			comment:
				'The base role for this job. Will initially inherit the default values for this role but (if it is not a default Job) may have custom permissions set after creation. Will be one of: "owner", "groupManager", "manager", "teammate", "guest"',
			allowNull: false,
			validate: {
				isIn: {
					args: [['owner', 'groupManager', 'manager', 'teammate', 'guest']]
				}
			}
		},
		name: {
			type: DataTypes.STRING,
			comment: 'The Job name. This should be a user-facing friendly name',
			allowNull: false
		},
		acl: {
			type: DataTypes.JSONB,
			comment:
				'Custom ACL list of permissions. This will be ignored if isDefault=true.',
			allowNull: false,
			defaultValue: {}
		},
		inStoreAcl: {
			type: DataTypes.JSONB,
			comment:
				'Custom ACL list of permission overrides requiring a user to be online. This will be ignored if isDefault=true.',
			allowNull: false,
			defaultValue: {}
		}
	}
	const options = {
		timestamps: true
	}
	const Job = sequelize.define(modelName, attributes, options)

	Job.associate = function(models) {
		this.belongsTo(models.Organization, {
			constraints: false
		})
		this.hasMany(models.UserLocation, {
			constraints: false
		})
		this.hasMany(models.UserGroup, {
			constraints: false
		})
	}

	Job.scopes = {
		public: {
			attributes: []
		},
		team: {
			attributes: []
		}
	}

	return Job
}
