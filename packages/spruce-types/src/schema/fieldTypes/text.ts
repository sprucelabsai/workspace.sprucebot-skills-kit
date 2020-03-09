import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export default interface ISpruceSchemaFieldTypeText
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Text
	value?: string
	defaultValue?: string
	options?: {
		/** the minimum length we'll allow of this field */
		minLength?: number
		/** the max length possible with this string */
		maxLength?: number
	}
}
