import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

/** a duration value object */
export interface ISpruceSchemaFieldTypeDurationValue {
	hours: number
	minutes: number
	seconds: number
	ms: number
}

export default interface ISpruceSchemaFieldTypeDuration
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Duration
	value?: ISpruceSchemaFieldTypeDurationValue
	defaultValue?: ISpruceSchemaFieldTypeDurationValue
	options?: {
		/** how it should be rendered, defaults to {{h}}h{{m}}min */
		renderFormat?: string
		/** the minimum duration we'll allow of this field */
		minDuration?: ISpruceSchemaFieldTypeDurationValue
		/** the max duration possible with this field */
		maxDuration?: ISpruceSchemaFieldTypeDurationValue
	}
}
