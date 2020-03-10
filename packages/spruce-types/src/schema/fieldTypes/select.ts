import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export interface ISpruceSchemaFieldTypeSelectChoice {
	/**  machine readable way to identify this choice */
	value: string
	/** human readable label for when selecting a choice */
	label: string
}
export default interface ISpruceSchemaFieldTypeSelect
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Select
	value?: string
	defaultValue?: string
	options?: {
		choices: ISpruceSchemaFieldTypeSelectChoice[]
	}
}
