import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export interface ISpruceSchemaFieldTypeDateTimeValue {
	gmt: string
}

export default interface ISpruceSchemaFieldTypeDateTime
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.DateTime
	value?: ISpruceSchemaFieldTypeDateTimeValue
	defaultValue?: ISpruceSchemaFieldTypeDateTimeValue
	options?: {
		/** how should this dateTime render using moment.js format */
		dateTimeFormat: string
	}
}
