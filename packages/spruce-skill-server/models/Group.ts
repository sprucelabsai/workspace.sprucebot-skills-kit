// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes, ModelAttributes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'
import { Organization } from './Organization'
import { LocationGroup } from './LocationGroup'
import { UserGroup } from './UserGroup'
import { Location } from './Location'
import { User } from './User'
import SpruceCoreModel from '../lib/SpruceModel'

export class Group extends SpruceCoreModel<Group> {
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
	public isDefault!: boolean
	public LocationId?: string | null
	public Location?: Location | null
	public OrganizationId?: string | null
	public Organization?: Organization | null
	public LocationGroups?: LocationGroup[] | null
	public UserGroups?: UserGroup[] | null
	public Locations?: Location[] | null
	public Users?: User[] | null

	public static associate(models: ISpruceModels): void {
		this.belongsTo(models.Organization, {
			constraints: false
		})
		this.hasMany(models.LocationGroup, {
			constraints: false
		})
		this.hasMany(models.UserGroup, {
			constraints: false
		})
		this.belongsToMany(models.Location, {
			constraints: false,
			through: models.LocationGroup
		})
		this.belongsToMany(models.User, {
			constraints: false,
			through: models.UserGroup
		})
	}
}

const attributes: ModelAttributes = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		comment: 'The group name',
		allowNull: false
	},
	isDefault: {
		type: DataTypes.BOOLEAN,
		comment:
			'Whether this is a default group. Default groups may not be deleted',
		allowNull: false,
		defaultValue: false
	}
}

export default (sequelize: Sequelize) => {
	const model = Group.init(attributes, {
		sequelize
	})

	return model
}
