import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'
import { roleSelectChoices } from './role.schema'
import aclSchema from './acl.schema'

const groupSchema: ISpruceSchema = {
	id: 'job',
	name: 'Job',
	description:
		'A position at a company. The answer to the question; What is your job?',
	fields: {
		id: {
			label: 'Id',
			type: SpruceSchemaFieldType.Id
		},
		isDefault: {
			label: 'Is default',
			hint:
				'Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest).',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		name: {
			label: 'Name',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		role: {
			label: 'Role',
			type: SpruceSchemaFieldType.Select,
			isRequired: true,
			options: {
				choices: roleSelectChoices
			}
		},
		inStoreAcls: {
			label: 'On work permissions',
			type: SpruceSchemaFieldType.Schema,
			options: {
				schemaId: 'acl'
			}
		},
		acls: {
			label: 'Off work permissions',
			type: SpruceSchemaFieldType.Schema,
			options: {
				schemaId: 'acl'
			}
		}
	}
}

export default groupSchema
