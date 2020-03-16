import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export default interface ISpruceSchemaFieldTypeNumber
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Number
	value?: number
	defaultValue?: number
}
