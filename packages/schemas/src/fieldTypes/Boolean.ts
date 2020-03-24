import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'
import { SpruceFieldType } from './types'

export interface ISpruceFieldBooleanDefinition
	extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Boolean
	value?: boolean
	defaultValue?: boolean
	options: {}
}

export default class SpruceFieldBoolean extends SpruceFieldBase<
	ISpruceFieldBooleanDefinition
> {}
