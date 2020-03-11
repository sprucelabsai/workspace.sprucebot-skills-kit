// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { SpruceCoreModel, User } from '@sprucelabs/spruce-skill-server'
import { ISkillModels } from 'server/interfaces/models'

export class Example extends SpruceCoreModel<Example> {
	public static readonly timestamps = true
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: ['id']
		}
	}

	public static readonly attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		}
	}

	public id!: string
	public UserId!: string | null
	public User?: User | null

	public static associate(models: ISkillModels): void {
		this.belongsTo(models.User, {
			constraints: false
		})
	}
}

export default (sequelize: Sequelize) => {
	const model = Example.initialize(sequelize)

	return model
}
