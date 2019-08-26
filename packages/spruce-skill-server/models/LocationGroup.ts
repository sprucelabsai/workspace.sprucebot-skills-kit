// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes, ModelAttributes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'
import { Group } from './Group'
import { Location } from './Location'
import SpruceCoreModel from '../lib/SpruceModel'

export class LocationGroup extends SpruceCoreModel<LocationGroup> {
	// Prevents sequelize from trying to run sync against this model
	public static readonly doNotSync = true
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: []
		},
		team: {
			attributes: []
		}
	}

	public id!: string
	public name!: string
	public LocationId?: string | null
	public GroupId?: string | null
	public Location?: Location | null
	public Group?: Group | null

	public static associate(models: ISpruceModels): void {
		this.belongsTo(models.Location, {
			constraints: false
		})
		this.belongsTo(models.Group, {
			constraints: false
		})
	}
}

const attributes: ModelAttributes = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	}
}

export default (sequelize: Sequelize) => {
	const model = LocationGroup.init(attributes, {
		sequelize
	})

	return model
}
