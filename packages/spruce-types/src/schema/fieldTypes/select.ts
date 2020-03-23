import { FieldType } from './types'
import FieldText from './Text'
import { IFieldBase } from './Base'

export interface IFieldSelectChoice {
	/**  machine readable way to identify this choice */
	value: string
	/** human readable label for when selecting a choice */
	label: string
}

export interface IFieldSelect extends IFieldBase {
	type: FieldType.Select
	value?: string
	defaultValue?: string
	options: {
		choices: IFieldSelectChoice[]
	}
}

export default class FieldSelect extends FieldText<IFieldSelect> {}
