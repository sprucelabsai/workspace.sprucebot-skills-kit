import { IFieldBaseDefinition } from './Base'
import { FieldType } from './types'
import FieldText from './Text'

export interface IFieldPhoneDefinition extends IFieldBaseDefinition {
	type: FieldType.Phone
	value?: string
	defaultValue?: string
	options?: {
		/** the format we should use, defaults to +1 (555)-555-5555 */
		phoneNumberFormat?: string
	}
}

export default class FieldPhone extends FieldText<IFieldPhoneDefinition> {
	public toValueType = (value: any): string => {
		debugger
		// TODO format as phone number

		return value as string
	}
}
