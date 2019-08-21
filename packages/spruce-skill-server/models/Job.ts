// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { SpruceCoreModel, ISpruceCoreSkillModels } from '../types/models'
import { Organization } from './Organization'
import { UserLocation } from './UserLocation'
import { UserGroup } from './UserGroup'

export class Job extends SpruceCoreModel<Job> {
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
	public isDefault!: boolean
	public role!: string
	public name!: string
	public acl!: Record<string, any>
	public inStoreAcl!: Record<string, any>
	public OrganizationId?: string | null
	public Organization?: Organization | null
	public UserLocations?: UserLocation[] | null
	public UserGroups?: UserGroup[] | null

	public static associate(models: ISpruceCoreSkillModels): void {
		this.belongsTo(models.Organization, {
			constraints: false
		})
		this.hasMany(models.UserLocation, {
			constraints: false
		})
		this.hasMany(models.UserGroup, {
			constraints: false
		})
	}
}

const attributes = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	isDefault: {
		type: DataTypes.BOOLEAN,
		comment:
			'Whether this is a default job. Default jobs may not be changed or have their ACLs updated',
		allowNull: false,
		defaultValue: false
	},
	role: {
		type: DataTypes.STRING,
		comment:
			'The base role for this job. Will initially inherit the default values for this role but (if it is not a default Job) may have custom permissions set after creation. Will be one of: "owner", "groupManager", "manager", "teammate", "guest"',
		allowNull: false,
		validate: {
			isIn: {
				args: [['owner', 'groupManager', 'manager', 'teammate', 'guest']]
			}
		}
	},
	name: {
		type: DataTypes.STRING,
		comment: 'The Job name. This should be a user-facing friendly name',
		allowNull: false
	},
	acl: {
		type: DataTypes.JSONB,
		comment:
			'Custom ACL list of permissions. This will be ignored if isDefault=true.',
		allowNull: false,
		defaultValue: {}
	},
	inStoreAcl: {
		type: DataTypes.JSONB,
		comment:
			'Custom ACL list of permission overrides requiring a user to be online. This will be ignored if isDefault=true.',
		allowNull: false,
		defaultValue: {}
	}
}

export default (sequelize: Sequelize) => {
	const model = Job.init(attributes, {
		sequelize
	})

	return model
}
