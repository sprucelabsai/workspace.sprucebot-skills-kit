import { IFieldBase } from '../schema'
import { FieldType } from './index'

export interface IFieldAddressValue {
	street1: string
	street2?: string
	city: string
	province: string
	country: string
	zip: string
}

export default interface IFieldAddress extends IFieldBase {
	type: FieldType.Address
	value?: IFieldAddressValue
	defaultValue?: IFieldAddressValue
	options?: {}
}
