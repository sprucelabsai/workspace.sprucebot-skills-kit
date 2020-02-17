// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { User } from './User'
import { Location } from './Location'
import { Organization } from './Organization'
import SpruceCoreModel from '../lib/SpruceModel'
import { ISpruceModels } from '../interfaces/models'

export class Metadata extends SpruceCoreModel<Metadata> {
	public static readonly paranoid = false
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
		},
		key: {
			type: DataTypes.STRING,
			comment: 'The name of the key',
			allowNull: false
		},
		val: {
			type: DataTypes.JSONB,
			comment: 'The value',
			allowNull: true
		},
		refId: {
			type: DataTypes.UUID,
			allowNull: true
		},
		SkillId: {
			type: DataTypes.UUID,
			allowNull: true
		}
	}

	public id!: string
	/** The key to store the metadata under */
	public key!: string
	/** The value to store */
	public val!: Record<string, any> | Record<string, any>[]
	/** Use refId to associate Metadata to your own models */
	public refId!: string | null
	public UserId!: string | null
	public User?: User | null
	public LocationId!: string | null
	public Location?: Location | null
	public OrganizationId!: string | null
	public Organization?: Organization | null
	public SkillId!: string | null

	public static associate(models: ISpruceModels): void {
		Metadata.belongsTo(models.Location, {
			constraints: false
		})
		Metadata.belongsTo(models.User, {
			constraints: false
		})
		Metadata.belongsTo(models.Organization, {
			constraints: false
		})
	}

	public static includeAttributes() {
		return [
			'key',
			'val',
			'refId',
			'UserId',
			'LocationId',
			'OrganizationId',
			'createdAt',
			'updatedAt'
		]
	}
}

export default (sequelize: Sequelize) => {
	const model = Metadata.initialize(sequelize)

	return model
}
