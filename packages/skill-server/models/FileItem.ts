// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { Location } from './Location'
import { Organization } from './Organization'
import { User } from './User'
import ISpruceModel from '../lib/SpruceModel'
import { ISpruceModels } from '../interfaces/models'

export class FileItem extends ISpruceModel<FileItem> {
	// Prevents sequelize from trying to run sync against this model
	public static readonly doNotSync = true
	// Scopes
	public static readonly scopes = {
		public: {
			attributes: []
		},
		team: {
			attributes: [
				'id',
				'name',
				'mimeType',
				'ext',
				'type',
				'meta',
				'sizeBytes',
				'width',
				'height',
				'createdAt',
				'updatedAt',
				'LocationId',
				'Location',
				'GuestId',
				'Guest',
				'TeammateId',
				'Teammate',
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
		name: {
			type: DataTypes.STRING,
			comment: 'The File name'
		},
		mimeType: {
			type: DataTypes.STRING,
			comment: 'The File type'
		},
		ext: {
			type: DataTypes.STRING,
			comment: 'The File extension'
		},
		type: {
			type: DataTypes.STRING,
			comment: '"image", "video", or "other"',
			allowNull: false,
			defaultValue: 'other'
		},
		meta: {
			type: DataTypes.JSONB,
			comment: 'Additional metadata',
			allowNull: false,
			defaultValue: {}
		},
		sizeBytes: {
			type: DataTypes.BIGINT,
			comment: 'The size of the file in bytes',
			allowNull: false,
			defaultValue: 0
		},
		width: {
			type: DataTypes.INTEGER,
			comment: 'The width of the file (if image or video)'
		},
		height: {
			type: DataTypes.INTEGER,
			comment: 'The height of the file (if image or video)'
		}
	}

	public id!: string
	public name!: string
	public mimeType!: string
	public ext!: string
	public type!: string
	public meta!: Record<string, any>
	public sizeBytes!: number
	public width!: number
	public height!: number
	public LocationId?: string | null
	public Location?: Location | null
	public OrganizationId?: string | null
	public Organization?: Organization | null
	public TeammateId?: string | null
	public Teammate?: User | null
	public GuestId?: string | null
	public Guest?: User | null

	public static associate(models: ISpruceModels): void {
		this.belongsTo(models.Location, {
			constraints: false
		})
		this.belongsTo(models.Organization, {
			constraints: false
		})
		this.belongsTo(models.User, {
			as: 'Guest',
			constraints: false
		})
		this.belongsTo(models.User, {
			as: 'Teammate',
			constraints: false
		})
	}
}

export default (sequelize: Sequelize) => {
	const model = FileItem.initialize(sequelize)

	return model
}
