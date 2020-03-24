import { SpruceFieldType } from '.'
import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'

export interface IFieldDateTimeValue {
	gmt: string
}

export interface IFieldDateTime extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.DateTime
	value?: IFieldDateTimeValue
	defaultValue?: IFieldDateTimeValue
	options?: {
		/** how should this dateTime render using moment.js format */
		dateTimeFormat: string
	}
}

export default class FieldDateTime extends SpruceFieldBase<IFieldDateTime> {}
