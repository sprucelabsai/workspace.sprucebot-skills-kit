// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { SpruceCoreModel, ISpruceCoreSkillModels } from '../types/models'
import { Location } from './Location'

export class Organization extends SpruceCoreModel<Organization> {
	public static readonly timestamps = true
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: ['id', 'name']
		}
	}

	public id!: string
	public name!: string
	public Locations?: Location[] | null

	public static associate(models: ISpruceCoreSkillModels): void {
		this.hasMany(models.Location, { constraints: false })
	}
}

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

export default (sequelize: Sequelize) => {
	const model = Organization.init(attributes, {
		sequelize
	})

	return model
}
