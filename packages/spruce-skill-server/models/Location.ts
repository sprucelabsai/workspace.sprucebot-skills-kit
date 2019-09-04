// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import config from 'config'
import { Sequelize, DataTypes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'
import { Organization } from './Organization'
import { UserLocation } from './UserLocation'
import { User } from './User'
import SpruceCoreModel from '../lib/SpruceModel'

export class Location extends SpruceCoreModel<Location> {
	// Prevents sequelize from trying to run sync against this model
	public static readonly doNotSync = true
	// Scopes
	public static readonly scopes = {
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

	public static readonly attributes = {
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
		storeNum: {
			type: DataTypes.STRING
		},
		geo: {
			type: config.TESTING ? DataTypes.JSON : DataTypes.GEOGRAPHY('POINT'),
			get(this: Location) {
				const geoPoint: Record<string, number> | null = this.getDataValue(
					'geo'
				) as any | null
				return geoPoint === null
					? null
					: {
							lat: geoPoint.y,
							lng: geoPoint.x
					  }
			}
		}
	}

	public id!: string
	public name!: string
	public addressLine1!: string
	public addressLine2!: string
	public addressCity!: string
	public addressState!: string
	public addressZip!: string
	public addressCountry!: string
	public timezone!: string
	public isPublic!: string
	public geo!: string
	public OrganizationId?: string | null
	public Organization?: Organization | null
	public UserLocations?: UserLocation[] | null
	public Users?: User[] | null

	public static associate(models: ISpruceModels): void {
		this.belongsTo(models.Organization, {
			constraints: false
		})
		this.hasMany(models.UserLocation, {
			constraints: false
		})
		this.belongsToMany(models.User, {
			through: models.UserLocation
		})
	}
}

export default (sequelize: Sequelize) => {
	const model = Location.init(Location.attributes, {
		sequelize
	})

	return model
}
