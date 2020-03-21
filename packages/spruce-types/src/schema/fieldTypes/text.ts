import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldText extends IFieldBase {
	type: FieldType.Text
	value?: string
	defaultValue?: string
	options?: {
		/** the minimum length we'll allow of this field */
		minLength?: number
		/** the max length possible with this string */
		maxLength?: number
	}
}
