import { SpruceFieldType } from '.'
import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'

export interface ISpruceFieldDefinitionNumber
	extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Number
	value?: number
	defaultValue?: number
}

export default class SpruceFieldNumber<
	T extends ISpruceFieldDefinitionNumber = ISpruceFieldDefinitionNumber
> extends SpruceFieldBase<T> {}
