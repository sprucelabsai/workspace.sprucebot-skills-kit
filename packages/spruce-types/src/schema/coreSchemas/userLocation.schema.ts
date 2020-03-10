import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'
import { roleSelectChoices } from './role.schema'

const userLocationSchema: ISpruceSchema = {
	id: 'userLocation',
	name: 'User location',
	description: 'A location a person has given access to themselves.',
	sections: [
		{
			id: 'basics',
			title: 'The basics',
			fields: [
				{
					id: 'role',
					label: 'Name',
					type: SpruceSchemaFieldType.Select,
					isRequired: true,
					options: {
						choices: roleSelectChoices
					}
				},
				{
					id: 'status',
					label: 'Status',
					type: SpruceSchemaFieldType.Text
				}
			]
		},
		{
			id: 'visits',
			title: 'Visits',
			fields: [
				{
					id: 'visits',
					label: 'Total visits',
					type: SpruceSchemaFieldType.Number,
					isRequired: true,
					options: {
						choices: roleSelectChoices
					}
				},
				{
					id: 'lastRecordedVisit',
					label: 'Last visit',
					type: SpruceSchemaFieldType.DateTime
				}
			]
		},
		{
			id: 'related',
			title: 'Relationships',
			fields: [
				{
					id: 'Job',
					label: 'Job',
					type: SpruceSchemaFieldType.Schema,
					isRequired: true,
					options: {
						schemaId: 'job'
					}
				},
				{
					id: 'Location',
					label: 'Location',
					type: SpruceSchemaFieldType.Schema,
					isRequired: true,
					options: {
						schemaId: 'location'
					}
				},
				{
					id: 'User',
					label: 'User',
					type: SpruceSchemaFieldType.Schema,
					isRequired: true,
					options: {
						schemaId: 'user'
					}
				}
			]
		}
	]
}

export default userLocationSchema
