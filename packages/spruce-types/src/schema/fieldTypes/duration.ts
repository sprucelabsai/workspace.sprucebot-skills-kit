import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

/** a duration value object */
export interface IFieldDurationValue {
	hours: number
	minutes: number
	seconds: number
	ms: number
}

export default interface IFieldDuration extends IFieldBase {
	type: FieldType.Duration
	value?: IFieldDurationValue
	defaultValue?: IFieldDurationValue
	options?: {
		/** how it should be rendered, defaults to {{h}}h{{m}}min */
		durationFormat?: string
		/** the minimum duration we'll allow of this field */
		minDuration?: IFieldDurationValue
		/** the max duration possible with this field */
		maxDuration?: IFieldDurationValue
	}
}
