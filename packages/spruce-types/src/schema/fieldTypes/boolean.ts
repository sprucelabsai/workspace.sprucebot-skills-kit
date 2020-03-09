import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export default interface ISpruceSchemaFieldTypeBoolean
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Boolean
	value?: boolean
	defaultValue?: boolean
	options?: {
		/** the minimum length we'll allow of this field */
		minLength?: number
		/** the max length possible with this string */
		maxLength?: number
	}
}
