import { SpruceFieldType } from './index'
import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'

export interface IFieldAddressValue {
	street1: string
	street2?: string
	city: string
	province: string
	country: string
	zip: string
}

export interface ISpruceFieldAddressDefinition
	extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Address
	value?: IFieldAddressValue
	defaultValue?: IFieldAddressValue
	options?: {}
}

export default class SpruceFieldAddress extends SpruceFieldBase<
	ISpruceFieldAddressDefinition
> {}
