// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
import { Sequelize, DataTypes } from 'sequelize'
import { SpruceCoreModel, ISpruceCoreSkillModels } from '../interfaces/models'
import { Location } from './Location'
import { Job } from './Job'
import { User } from './User'

export class UserLocation extends SpruceCoreModel<UserLocation> {
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
				'status',
				'visits',
				'lastRecordedVisit',
				'User',
				'Location',
				'Job'
			]
		}
	}

	public id!: string
	public role!: string
	public status!: string
	public visits!: number
	public lastRecordedVisit!: Date
	public UserId?: string | null
	public User?: User | null
	public LocationId?: string | null
	public Location?: Location | null
	public JobId?: string | null
	public Job?: Job | null

	public static associate(models: ISpruceCoreSkillModels): void {
		this.belongsTo(models.User, { constraints: false })
		this.belongsTo(models.Location, { constraints: false })
		this.belongsTo(models.Job, { constraints: false })
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
	},
	status: {
		type: DataTypes.STRING
	},
	visits: {
		type: DataTypes.INTEGER
	},
	lastRecordedVisit: {
		type: DataTypes.DATE
	}
}

export default (sequelize: Sequelize) => {
	const model = UserLocation.init(attributes, {
		sequelize
	})

	return model
}
