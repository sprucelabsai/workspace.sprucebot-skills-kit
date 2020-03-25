import { ISchemaDefinition, FieldType } from '@sprucelabs/schemas'

const aclSchema: ISchemaDefinition = {
	id: 'acl',
	name: 'Access control list lookup table',
	dynamicKeySignature: {
		type: FieldType.Text,
		isArray: true,
		label: 'Permissions grouped by slug',
		key: 'slug'
	}
}

export default aclSchema
