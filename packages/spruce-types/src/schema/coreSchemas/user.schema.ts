import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const profileImageSchema: ISpruceSchema = {
	id: 'profileImage',
	name: 'Profile Image Sizes',
	description: 'Profile images at various helpful sizes and resolutions.',
	fields: {
		profile60: {
			label: '60x60',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		profile150: {
			label: '150x150',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		'profile60@2x': {
			label: '60x60',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		'profile150@2x': {
			label: '150x150',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		}
	}
}

const userSchema: ISpruceSchema = {
	id: 'user',
	name: 'User',
	description: 'A human being.',
	fields: {
		id: {
			label: 'Id',
			type: SpruceSchemaFieldType.Id
		},
		firstName: {
			label: 'First name',
			type: SpruceSchemaFieldType.Text,
			isRequired: false
		},
		lastName: {
			label: 'Last name',
			type: SpruceSchemaFieldType.Text,
			isRequired: false
		},
		casualName: {
			label: 'Casual name',
			type: SpruceSchemaFieldType.Text,
			hint: 'Generated name that defaults to Friend!',
			isRequired: true
		},
		profileImages: {
			label: 'Profile photos',
			type: SpruceSchemaFieldType.Schema,
			options: {
				schema: profileImageSchema
			}
		},
		defaultProfileImages: {
			label: 'Default profile photos',
			type: SpruceSchemaFieldType.Schema,
			isRequired: true,
			options: {
				schema: profileImageSchema
			}
		}
	}
}

export default userSchema
