import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export interface IFieldDateTimeValue {
	gmt: string
}

export default interface IFieldDateTime extends IFieldBase {
	type: FieldType.DateTime
	value?: IFieldDateTimeValue
	defaultValue?: IFieldDateTimeValue
	options?: {
		/** how should this dateTime render using moment.js format */
		dateTimeFormat: string
	}
}
