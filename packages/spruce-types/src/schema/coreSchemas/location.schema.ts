import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const locationSchema: ISpruceSchema = {
	id: 'location',
	name: 'Location',
	description:
		'A physical location where people meet. An organization has at least one of them.',
	sections: [
		{
			id: 'basics',
			title: 'The Basics',
			fields: [
				{
					id: 'name',
					label: 'Name',
					type: SpruceSchemaFieldType.Text,
					isRequired: true,
					options: {}
				},
				{
					id: 'num',
					label: 'Store Number',
					type: SpruceSchemaFieldType.Text,
					hint: 'You can use other symbols, like # or dashes. #123 or 32-US-5',
					isRequired: true,
					options: {}
				}
			]
		},
		{
			id: 'contact',
			title: 'Contact',
			fields: [
				{
					id: 'phone',
					label: 'Main Phone',
					type: SpruceSchemaFieldType.Phone
				},
				{
					id: 'address',
					label: 'Address',
					type: SpruceSchemaFieldType.Address,
					isRequired: true
				}
			]
		}
	]
}

export default locationSchema
