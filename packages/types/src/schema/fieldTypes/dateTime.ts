import { FieldType } from '.'
import FieldBase, { IFieldBase } from './Base'

export interface IFieldDateTimeValue {
	gmt: string
}

export interface IFieldDateTime extends IFieldBase {
	type: FieldType.DateTime
	value?: IFieldDateTimeValue
	defaultValue?: IFieldDateTimeValue
	options?: {
		/** how should this dateTime render using moment.js format */
		dateTimeFormat: string
	}
}

export default class FieldDateTime extends FieldBase<IFieldDateTime> {}
