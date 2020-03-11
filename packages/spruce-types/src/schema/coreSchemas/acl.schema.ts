import { ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

const aclSchema: ISpruceSchema = {
	id: 'acl',
	name: 'Access control list lookup table',
	dynamicKeySignature: {
		type: SpruceSchemaFieldType.Text,
		isArray: true,
		label: 'Permissions grouped by slug',
		key: 'slug'
	}
}

export default aclSchema
