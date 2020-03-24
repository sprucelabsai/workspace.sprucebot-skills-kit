import { SpruceFieldType } from '.'
import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'

export interface ISpruceFieldDefinitionId extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Id
	value?: string
	defaultValue?: string
	options?: {}
}

export default class SpruceFieldId extends SpruceFieldBase<
	ISpruceFieldDefinitionId
> {}
