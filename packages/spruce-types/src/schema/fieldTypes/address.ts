import { ISpruceSchemaFieldBase } from '../schema'
import { SpruceSchemaFieldType } from './index'

export interface ISpruceSchemaFieldTypeAddressValue {
	street1: string
	street2?: string
	city: string
	province: string
	country: string
	zip: string
}

export default interface ISpruceSchemaFieldTypeAddress
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Address
	value?: ISpruceSchemaFieldTypeAddressValue
	defaultValue?: ISpruceSchemaFieldTypeAddressValue
	options?: {}
}
