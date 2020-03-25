import { ISchemaDefinition, FieldType } from '@sprucelabs/schemas'

const profileImageSchema: ISchemaDefinition = {
	id: 'profileImage',
	name: 'Profile Image Sizes',
	description: 'Profile images at various helpful sizes and resolutions.',
	fields: {
		profile60: {
			label: '60x60',
			type: FieldType.Text,
			isRequired: true
		},
		profile150: {
			label: '150x150',
			type: FieldType.Text,
			isRequired: true
		},
		'profile60@2x': {
			label: '60x60',
			type: FieldType.Text,
			isRequired: true
		},
		'profile150@2x': {
			label: '150x150',
			type: FieldType.Text,
			isRequired: true
		}
	}
}

const userSchema: ISchemaDefinition = {
	id: 'user',
	name: 'User',
	description: 'A human being.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		firstName: {
			label: 'First name',
			type: FieldType.Text,
			isRequired: false
		},
		lastName: {
			label: 'Last name',
			type: FieldType.Text,
			isRequired: false
		},
		casualName: {
			label: 'Casual name',
			type: FieldType.Text,
			hint: 'Generated name that defaults to Friend!',
			isRequired: true
		},
		profileImages: {
			label: 'Profile photos',
			type: FieldType.Schema,
			options: {
				schema: profileImageSchema
			}
		},
		defaultProfileImages: {
			label: 'Default profile photos',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: profileImageSchema
			}
		}
	}
}

export default userSchema
