// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'
import { Location } from './Location'
import SpruceCoreModel from '../lib/SpruceModel'

export class Organization extends SpruceCoreModel<Organization> {
	// Prevents sequelize from trying to run sync against this model
	public static readonly doNotSync = true
	public static readonly paranoid = false
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: ['id', 'name', 'slug']
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
		slug: {
			type: DataTypes.STRING
		}
	}

	public id!: string
	public name!: string
	public Locations?: Location[] | null
	public slug!: string

	public static associate(models: ISpruceModels): void {
		this.hasMany(models.Location, { constraints: false })
	}
}

export default (sequelize: Sequelize) => {
	const model = Organization.initialize(sequelize)

	return model
}
