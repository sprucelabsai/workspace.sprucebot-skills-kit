import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const skillSchema: ISpruceSchema = {
	id: 'skill',
	name: 'Skill',
	description: 'An ability Sprucebot has learned.',
	fields: {
		id: {
			label: 'Id',
			type: SpruceSchemaFieldType.Id
		},
		apiKey: {
			label: 'Id',
			isPrivate: true,
			type: SpruceSchemaFieldType.Id
		},
		name: {
			label: 'Name',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		description: {
			label: 'Description',
			type: SpruceSchemaFieldType.Text,
			isRequired: false
		},
		slug: {
			label: 'Slug',
			type: SpruceSchemaFieldType.Text,
			isRequired: false
		},
		icon: {
			label: 'Icon',
			type: SpruceSchemaFieldType.Text,
			isRequired: false
		}
	}
}

export default skillSchema
