import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export interface IFieldTypeSelectChoice {
	/**  machine readable way to identify this choice */
	value: string
	/** human readable label for when selecting a choice */
	label: string
}
export default interface IFieldTypeSelect extends IFieldBase {
	type: FieldType.Select
	value?: string
	defaultValue?: string
	options?: {
		choices: IFieldTypeSelectChoice[]
	}
}
