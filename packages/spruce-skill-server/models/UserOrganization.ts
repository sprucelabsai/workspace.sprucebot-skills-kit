// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { SpruceCoreModel, ISpruceCoreSkillModels } from '../interfaces/models'
import { Organization } from './Organization'
import { User } from './User'

export class UserOrganization extends SpruceCoreModel<UserOrganization> {
	// Prevents sequelize from trying to run sync against this model
	public static readonly doNotSync = true
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: ['id']
		},
		team: {
			attributes: [
				'id',
				'role',
				'UserId',
				'User',
				'OrganizationId',
				'Organization'
			]
		}
	}

	public id!: string
	public role!: string
	public UserId?: string | null
	public User?: User | null
	public OrganizationId?: string | null
	public Organization?: Organization | null

	public static associate(models: ISpruceCoreSkillModels): void {
		this.belongsTo(models.User, { constraints: false })
		this.belongsTo(models.Organization, { constraints: false })
	}
}

const attributes = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	role: {
		type: DataTypes.STRING
	}
}

export default (sequelize: Sequelize) => {
	const model = UserOrganization.init(attributes, {
		sequelize
	})

	return model
}
