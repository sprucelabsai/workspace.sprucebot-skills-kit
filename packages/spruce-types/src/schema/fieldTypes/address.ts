import { IFieldBase } from '../schema'
import { FieldType } from './index'

export interface IFieldTypeAddressValue {
	street1: string
	street2?: string
	city: string
	province: string
	country: string
	zip: string
}

export default interface IFieldTypeAddress extends IFieldBase {
	type: FieldType.Address
	value?: IFieldTypeAddressValue
	defaultValue?: IFieldTypeAddressValue
	options?: {}
}
