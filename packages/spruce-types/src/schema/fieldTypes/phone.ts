import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldPhone extends IFieldBase {
	type: FieldType.Phone
	value?: string
	defaultValue?: string
	options?: {
		/** the format we should use, defaults to +1 (555)-555-5555 */
		phoneNumberFormat?: string
	}
}
