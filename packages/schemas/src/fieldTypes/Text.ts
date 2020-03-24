import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'
import { ISpruceFieldDefinition, SpruceFieldType } from './types'

export interface ISpruceFieldDefinitionText extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Text
	value?: string
	defaultValue?: string
	options?: {
		/** the minimum length we'll allow of this field */
		minLength?: number
		/** the max length possible with this string */
		maxLength?: number
	}
}

export default class SpruceFieldText<
	T extends ISpruceFieldDefinition = ISpruceFieldDefinition
> extends SpruceFieldBase<T> {
	/** tranform to match the value type */
	public toValueType = (value: any): string => {
		const transformed =
			typeof value === 'string' ? value : value && value.toString()

		if (typeof transformed === 'string') {
			return transformed
		}

		throw new Error(`"${value}" is not transformable to a string`)
	}
}
