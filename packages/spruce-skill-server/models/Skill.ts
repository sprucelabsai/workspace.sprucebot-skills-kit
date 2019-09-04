// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes, ModelAttributes } from 'sequelize'
import SpruceCoreModel from '../lib/SpruceModel'

export class Skill extends SpruceCoreModel<Skill> {
	// Prevents sequelize from trying to run sync against this model
	public static readonly doNotSync = true
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: []
		},
		organization: {
			attributes: ['id', 'name', 'description', 'icon']
		}
	}

	public static readonly attributes: ModelAttributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			comment: 'The skill name',
			allowNull: false,
			unique: true
		},
		slug: {
			type: DataTypes.STRING,
			comment: 'The skill slug that will also be used as the stripe plan id',
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			comment: 'The skill description',
			allowNull: false
		},
		icon: {
			type: DataTypes.TEXT,
			comment: 'The skill icon',
			allowNull: false
		}
	}

	public id!: string
	public name!: string
	public slug!: string
	public description!: string
	public icon!: string
}

export default (sequelize: Sequelize) => {
	const model = Skill.init(Skill.attributes, {
		sequelize
	})

	return model
}
