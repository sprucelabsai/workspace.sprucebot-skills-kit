import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const organizationSchema: ISpruceSchema = {
	id: 'organization',
	name: 'Organization',
	description: 'A company or team. Comprises of many people and locations.',
	fields: {
		id: {
			label: 'Id',
			type: SpruceSchemaFieldType.Id
		},
		name: {
			label: 'Name',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		slug: {
			label: 'Slug',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		}
	}
}

export default organizationSchema
