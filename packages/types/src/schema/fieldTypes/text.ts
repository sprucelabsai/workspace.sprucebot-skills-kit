import FieldBase, { IFieldBase } from './Base'
import { IField, FieldType } from './types'

export interface IFieldText extends IFieldBase {
	type: FieldType.Text
	value?: string
	defaultValue?: string
	options?: {
		/** the minimum length we'll allow of this field */
		minLength?: number
		/** the max length possible with this string */
		maxLength?: number
	}
}

export default class FieldText<T extends IField = IFieldText> extends FieldBase<
	T
> {
	/** tranform to match the value type */
	toValueType = (value: any): string => {
		const transformed =
			typeof value === 'string' ? value : value && value.toString()

		if (typeof transformed === 'string') {
			return transformed
		}

		throw new Error(`"${value}" is not transformable to a string`)
	}
}
