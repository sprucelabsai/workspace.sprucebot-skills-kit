// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
// const config = require('config')
// const moment = require('moment')
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

const config = require('config')

const modelName = 'Location'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING
		},
		addressLine1: {
			type: DataTypes.STRING
		},
		addressLine2: {
			type: DataTypes.STRING
		},
		addressCity: {
			type: DataTypes.STRING
		},
		addressState: {
			type: DataTypes.STRING
		},
		addressZip: {
			type: DataTypes.STRING
		},
		addressCountry: {
			type: DataTypes.STRING
		},
		timezone: {
			type: DataTypes.STRING
		},
		isPublic: {
			type: DataTypes.STRING
		},
		geo: {
			type: config.TESTING ? 'JSON' : 'POINT',
			get() {
				const geoPoint = this.getDataValue('geo')
				return geoPoint === null
					? null
					: {
							lat: geoPoint.y,
							lng: geoPoint.x
					  }
			}
		}
	}
	const options = {
		timestamps: true
	}
	const Location = sequelize.define(modelName, attributes, options)

	Location.associate = function(models) {
		Location.belongsTo(models.Organization, {
			constraints: false
		})
	}

	Location.scopes = {
		public: {
			attributes: [
				'id',
				'name',
				'addressLine1',
				'addressLine2',
				'addressCity',
				'addressState',
				'addressZip',
				'addressCountry',
				'timezone',
				'isPublic',
				'geo'
			]
		}
	}

	return Location
}
