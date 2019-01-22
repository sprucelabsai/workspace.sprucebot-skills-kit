// 🌲🤖 This is a core model, available if DB_ENABLED=true

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
// const config = require('config')
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

const modelName = 'FileItem'

module.exports = (sequelize, DataTypes) => {
	const attributes = {
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
	const options = {
		timestamps: true
	}
	const FileItem = sequelize.define(modelName, attributes, options)

	FileItem.associate = function(models) {
		// To associate a FileItem with your own model, you can use "refId"
		// FileItem.belongsTo(models.MyModel, {
		// 	foreignKey: 'refId'
		// 	constraints: false
		// })
		FileItem.belongsTo(models.Location, {
			constraints: false
		})
		FileItem.belongsTo(models.Organization, {
			constraints: false
		})
		FileItem.belongsTo(models.User, {
			as: 'Guest',
			constraints: false
		})
		FileItem.belongsTo(models.User, {
			as: 'Teammate',
			constraints: false
		})
	}

	FileItem.scopes = {
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

	return FileItem
}
