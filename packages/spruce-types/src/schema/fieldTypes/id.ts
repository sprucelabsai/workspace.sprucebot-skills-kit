import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export default interface ISpruceSchemaFieldTypeId
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Id
	value?: string
	defaultValue?: string
	options?: {}
}
