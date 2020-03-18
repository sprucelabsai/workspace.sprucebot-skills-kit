import { ISpruceSchema } from '../schema'
import { FieldType } from '../fieldTypes'
import { roleSelectChoices } from './role.schema'

const groupSchema: ISpruceSchema = {
	id: 'job',
	name: 'Job',
	description:
		'A position at a company. The answer to the question; What is your job?',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		isDefault: {
			label: 'Is default',
			hint:
				'Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest).',
			type: FieldType.Text,
			isRequired: true
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true
		},
		role: {
			label: 'Role',
			type: FieldType.Select,
			isRequired: true,
			options: {
				choices: roleSelectChoices
			}
		},
		inStoreAcls: {
			label: 'On work permissions',
			type: FieldType.Schema,
			options: {
				schemaId: 'acl'
			}
		},
		acls: {
			label: 'Off work permissions',
			type: FieldType.Schema,
			options: {
				schemaId: 'acl'
			}
		}
	}
}

export default groupSchema
