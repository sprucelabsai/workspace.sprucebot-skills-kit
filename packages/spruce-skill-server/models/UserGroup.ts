// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'
import { Group } from './Group'
import { Job } from './Job'
import { User } from './User'
import { Organization } from './Organization'
import SpruceCoreModel from '../lib/SpruceModel'

export class UserGroup extends SpruceCoreModel<UserGroup> {
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

	public static readonly attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		}
	}

	public id!: string
	public UserId?: string | null
	public User?: User | null
	public GroupId?: string | null
	public Group?: Group | null
	public JobId?: string | null
	public Job?: Job | null
	public OrganizationId?: string | null
	public Organization?: Organization | null

	public static associate(models: ISpruceModels): void {
		this.belongsTo(models.User, {
			constraints: false
		})
		this.belongsTo(models.Group, {
			constraints: false
		})
		this.belongsTo(models.Job, {
			constraints: false
		})
		this.belongsTo(models.Organization, {
			constraints: false
		})
	}
}

export default (sequelize: Sequelize) => {
	const model = UserGroup.init(UserGroup.attributes, {
		sequelize
	})

	return model
}
