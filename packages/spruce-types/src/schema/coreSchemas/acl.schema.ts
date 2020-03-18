import { ISpruceSchema } from '../schema'
import { FieldType } from '../fieldTypes'

const aclSchema: ISpruceSchema = {
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
