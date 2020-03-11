import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'
import { roleSelectChoices } from './role.schema'

const userLocationSchema: ISpruceSchema = {
	id: 'userLocation',
	name: 'User location',
	description: 'A location a person has given access to themselves.',
	fields: {
		id: {
			label: 'Id',
			type: SpruceSchemaFieldType.Id
		},
		role: {
			label: 'Name',
			type: SpruceSchemaFieldType.Select,
			isRequired: true,
			options: {
				choices: roleSelectChoices
			}
		},
		status: {
			label: 'Status',
			type: SpruceSchemaFieldType.Text
		},
		visits: {
			label: 'Total visits',
			type: SpruceSchemaFieldType.Number,
			isRequired: true,
			options: {
				choices: roleSelectChoices
			}
		},
		lastRecordedVisit: {
			label: 'Last visit',
			type: SpruceSchemaFieldType.DateTime
		},
		job: {
			label: 'Job',
			type: SpruceSchemaFieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'job'
			}
		},
		location: {
			label: 'Location',
			type: SpruceSchemaFieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'location'
			}
		},
		user: {
			label: 'User',
			type: SpruceSchemaFieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'user'
			}
		}
	}
}

export default userLocationSchema
