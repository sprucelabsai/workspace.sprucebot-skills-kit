import { ISpruceFieldDefinitionBase } from './Base'
import { SpruceFieldType } from './types'
import SpruceFieldText from './Text'

export interface ISpruceFieldDefinitionPhone
	extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Phone
	value?: string
	defaultValue?: string
	options?: {
		/** the format we should use, defaults to +1 (555)-555-5555 */
		phoneNumberFormat?: string
	}
}

export default class SpruceFieldPhone extends SpruceFieldText<
	ISpruceFieldDefinitionPhone
> {
	public toValueType = (value: any): string => {
		debugger
		// TODO format as phone number

		return value as string
	}
}
