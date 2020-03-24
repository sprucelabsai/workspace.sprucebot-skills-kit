import { SpruceFieldType } from '.'
import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'

export interface ISpruceFieldDefinitionRaw extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Raw
	value?: any
	defaultValue?: any
	options: {
		interfaceName: string
	}
}

export default class SpruceFieldRaw extends SpruceFieldBase<
	ISpruceFieldDefinitionRaw
> {}
