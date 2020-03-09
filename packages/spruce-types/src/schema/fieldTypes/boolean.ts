import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export default interface ISpruceSchemaFieldTypeBoolean
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Boolean
	value?: boolean
	defaultValue?: boolean
	options?: {}
}
