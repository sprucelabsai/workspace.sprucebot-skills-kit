import { FieldType } from './types'
import FieldText from './Text'
import { IFieldBaseDefinition } from './Base'

export interface IFieldSelectDefinitionChoice {
	/**  machine readable way to identify this choice */
	value: string
	/** human readable label for when selecting a choice */
	label: string
}

export interface IFieldSelectDefinition extends IFieldBaseDefinition {
	type: FieldType.Select
	value?: string
	defaultValue?: string
	options: {
		choices: IFieldSelectDefinitionChoice[]
	}
}

export default class FieldSelect extends FieldText<IFieldSelectDefinition> {}
