import { SpruceFieldType } from './types'
import SpruceFieldText from './Text'
import { ISpruceFieldDefinitionBase } from './Base'

export interface ISpruceFieldSelectChoice {
	/**  machine readable way to identify this choice */
	value: string
	/** human readable label for when selecting a choice */
	label: string
}

export interface ISpruceFieldDefinitionSelect
	extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Select
	value?: string
	defaultValue?: string
	options: {
		choices: ISpruceFieldSelectChoice[]
	}
}

export default class SpruceFieldSelect extends SpruceFieldText<
	ISpruceFieldDefinitionSelect
> {}
