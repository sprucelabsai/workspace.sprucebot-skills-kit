import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export default interface ISpruceSchemaFieldTypeRaw
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Raw
	value?: any
	defaultValue?: any
	options?: {}
}
