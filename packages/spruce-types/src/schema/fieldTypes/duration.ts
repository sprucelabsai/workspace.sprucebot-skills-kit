import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

/** a duration value object */
export interface IFieldTypeDurationValue {
	hours: number
	minutes: number
	seconds: number
	ms: number
}

export default interface IFieldTypeDuration extends IFieldBase {
	type: FieldType.Duration
	value?: IFieldTypeDurationValue
	defaultValue?: IFieldTypeDurationValue
	options?: {
		/** how it should be rendered, defaults to {{h}}h{{m}}min */
		durationFormat?: string
		/** the minimum duration we'll allow of this field */
		minDuration?: IFieldTypeDurationValue
		/** the max duration possible with this field */
		maxDuration?: IFieldTypeDurationValue
	}
}
