import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'
import { roleSelectChoices } from './role.schema'

/** A permission keyed by skill slug or "core" and values are an array of permission keys starting with "can-" */
export interface IAcl {
	[slug: string]: string[]
}

const jobSchema: ISpruceSchema = {
	id: 'job',
	name: 'Job',
	description:
		'A position at a company. The answer to the question; What is your job?',
	sections: [
		{
			id: 'basics',
			title: 'The basics',
			fields: [
				{
					id: 'isDefault',
					label: 'Is default',
					hint:
						'Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest).',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				},
				{
					id: 'name',
					label: 'Name',
					type: SpruceSchemaFieldType.Text,
					isRequired: true
				},
				{
					id: 'role',
					label: 'Role',
					type: SpruceSchemaFieldType.Select,
					isRequired: true,
					options: {
						choices: roleSelectChoices
					}
				}
			]
		},
		{
			id: 'permissions',
			title: 'Permissions',
			fields: [
				{
					id: 'inStoreAcls',
					label: 'On work permissions',
					type: SpruceSchemaFieldType.Raw,
					options: {
						interfaceName: 'IAcl'
					}
				},
				{
					id: 'acls',
					label: 'Off work permissions',
					type: SpruceSchemaFieldType.Raw,
					options: {
						interfaceName: 'IAcl'
					}
				}
			]
		}
	]
}

export default jobSchema
