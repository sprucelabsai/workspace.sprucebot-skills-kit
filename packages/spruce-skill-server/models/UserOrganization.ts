// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'
import { Organization } from './Organization'
import { User } from './User'
import SpruceCoreModel from '../lib/SpruceModel'

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

	public static readonly attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		role: {
			type: DataTypes.STRING
		}
	}

	public id!: string
	public role!: string
	public UserId?: string | null
	public User?: User | null
	public OrganizationId?: string | null
	public Organization?: Organization | null

	public static associate(models: ISpruceModels): void {
		this.belongsTo(models.User, { constraints: false })
		this.belongsTo(models.Organization, { constraints: false })
	}
}

export default (sequelize: Sequelize) => {
	const model = UserOrganization.init(UserOrganization.attributes, {
		sequelize
	})

	return model
}
