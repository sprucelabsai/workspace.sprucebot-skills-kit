import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const profileImageSchema: ISpruceSchema = {
	id: 'profileImage',
	name: 'Profile Image Sizes',
	description: 'Profile images at various helpful sizes and resolutions.',
	sections: [
		{
			id: 'sizes',
			title: '72dpi sizes',
			fields: [
				{
					id: 'profile60',
					label: '60x60',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				},
				{
					id: 'profile150',
					label: '150x150',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				}
			]
		},
		{
			id: 'sizes',
			title: '144dpi sizes',
			fields: [
				{
					id: 'profile60@2x',
					label: '60x60',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				},
				{
					id: 'profile150@2x',
					label: '150x150',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				}
			]
		}
	]
}

const userSchema: ISpruceSchema = {
	id: 'user',
	name: 'User',
	description: 'A human being.',
	sections: [
		{
			id: 'basics',
			title: 'The basics',
			fields: [
				{
					id: 'firstName',
					label: 'First name',
					type: SpruceSchemaFieldType.Text,
					isRequired: false
				},
				{
					id: 'lastName',
					label: 'Last name',
					type: SpruceSchemaFieldType.Text,
					isRequired: false
				},
				{
					id: 'casualName',
					label: 'Casual name',
					type: SpruceSchemaFieldType.Text,
					hint: 'Generated name that defaults to Friend!',
					isRequired: true
				}
			]
		},
		{
			id: 'avatar',
			title: 'Profile Photo',
			fields: [
				{
					id: 'profileImages',
					label: 'Profile photos',
					type: SpruceSchemaFieldType.Schema,
					options: {
						schema: profileImageSchema
					}
				},
				{
					id: 'defaultProfileImages',
					label: 'Default profile photos',
					type: SpruceSchemaFieldType.Schema,
					isRequired: true,
					options: {
						schema: profileImageSchema
					}
				}
			]
		}
	]
}

export default userSchema
