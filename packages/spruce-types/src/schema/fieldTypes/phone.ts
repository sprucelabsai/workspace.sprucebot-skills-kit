import { IFieldBase } from './Base'
import { FieldType } from './types'
import FieldText from './Text'

export interface IFieldPhone extends IFieldBase {
	type: FieldType.Phone
	value?: string
	defaultValue?: string
	options?: {
		/** the format we should use, defaults to +1 (555)-555-5555 */
		phoneNumberFormat?: string
	}
}

export default class FieldPhone extends FieldText<IFieldPhone> {
	toValueType = (value: any): string => {
		debugger

		return value as string
	}
}
