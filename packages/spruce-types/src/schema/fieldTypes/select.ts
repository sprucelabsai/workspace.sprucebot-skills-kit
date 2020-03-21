import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export interface IFieldSelectChoice {
	/**  machine readable way to identify this choice */
	value: string
	/** human readable label for when selecting a choice */
	label: string
}
export default interface IFieldSelect extends IFieldBase {
	type: FieldType.Select
	value?: string
	defaultValue?: string
	options: {
		choices: IFieldSelectChoice[]
	}
}
