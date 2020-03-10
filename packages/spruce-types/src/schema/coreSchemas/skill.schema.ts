import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const skillSchema: ISpruceSchema = {
	id: 'skill',
	name: 'Skill',
	description: 'An ability Sprucebot has learned.',
	sections: [
		{
			id: 'basics',
			title: 'The basics',
			fields: [
				{
					id: 'name',
					label: 'Name',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				},
				{
					id: 'description',
					label: 'Description',
					type: SpruceSchemaFieldType.Text,
					isRequired: false
				},
				{
					id: 'slug',
					label: 'Slug',
					type: SpruceSchemaFieldType.Text,
					isRequired: false
				},
				{
					id: 'icon',
					label: 'Icon',
					type: SpruceSchemaFieldType.Text,
					isRequired: false
				}
			]
		}
	]
}

export default skillSchema
