import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export interface IFieldTypeDateTimeValue {
	gmt: string
}

export default interface IFieldTypeDateTime extends IFieldBase {
	type: FieldType.DateTime
	value?: IFieldTypeDateTimeValue
	defaultValue?: IFieldTypeDateTimeValue
	options?: {
		/** how should this dateTime render using moment.js format */
		dateTimeFormat: string
	}
}
