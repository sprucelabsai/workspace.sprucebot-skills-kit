import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'
import { ISpruceSchemaFieldTypeSelectChoice } from '../fieldTypes/select'

const roleSchema: ISpruceSchema = {
	id: 'role',
	name: 'Role',
	description: 'All people in Spruce fall into 5 roles.',
	fields: {
		slug: {
			label: 'Slug',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		},
		name: {
			label: 'Name',
			type: SpruceSchemaFieldType.Text,
			isRequired: true
		}
	}
}

export default roleSchema

export enum RoleSlugs {
	Owner = 'owner',
	GroupManager = 'groupManager',
	Manager = 'manager',
	Teammate = 'teammate',
	Guest = 'guest'
}

export const roleSelectChoices: ISpruceSchemaFieldTypeSelectChoice[] = [
	{
		value: 'owner',
		label: 'Owner'
	},
	{
		value: 'groupManager',
		label: 'District/region manager'
	},
	{
		value: 'manager',
		label: 'Store manager'
	},
	{
		value: 'teammate',
		label: 'Teammate'
	},
	{
		value: 'guest',
		label: 'Guest'
	}
]
