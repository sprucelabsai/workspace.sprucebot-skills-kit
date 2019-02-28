// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
const modelName = 'Skill'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
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
	const options = {
		timestamps: false
	}
	const Skill = sequelize.define(modelName, attributes, options)

	// Skill.associate = function(models) {}

	Skill.scopes = {
		public: {
			attributes: []
		},
		organization: {
			attributes: ['id', 'name', 'description', 'icon']
		}
	}

	return Skill
}
