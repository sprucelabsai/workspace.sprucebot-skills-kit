import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const organizationSchema: ISpruceSchema = {
	id: 'organization',
	name: 'Organization',
	description: 'A company or team. Comprises of many people and locations.',
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
					id: 'slug',
					label: 'Slug',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				}
			]
		}
	]
}

export default organizationSchema
