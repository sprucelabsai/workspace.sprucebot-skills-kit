import { ISpruceSchema } from '../Schema'
import { FieldType } from '../fieldTypes'
import { roleSelectChoices } from './role.schema'

const userLocationSchema: ISpruceSchema = {
	id: 'userLocation',
	name: 'User location',
	description: 'A location a person has given access to themselves.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		role: {
			label: 'Name',
			type: FieldType.Select,
			isRequired: true,
			options: {
				choices: roleSelectChoices
			}
		},
		status: {
			label: 'Status',
			type: FieldType.Text
		},
		visits: {
			label: 'Total visits',
			type: FieldType.Number,
			isRequired: true,
			options: {
				choices: roleSelectChoices
			}
		},
		lastRecordedVisit: {
			label: 'Last visit',
			type: FieldType.DateTime
		},
		job: {
			label: 'Job',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'job'
			}
		},
		location: {
			label: 'Location',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'location'
			}
		},
		user: {
			label: 'User',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'user'
			}
		}
	}
}

export default userLocationSchema