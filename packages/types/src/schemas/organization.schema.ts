import { ISpruceSchema } from '../Schema'
import { FieldType } from '../fieldTypes'

const organizationSchema: ISpruceSchema = {
	id: 'organization',
	name: 'Organization',
	description: 'A company or team. Comprises of many people and locations.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true
		},
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			isRequired: true
		}
	}
}

export default organizationSchema