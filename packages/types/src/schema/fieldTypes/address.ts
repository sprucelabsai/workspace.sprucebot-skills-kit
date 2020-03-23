import { FieldType } from './index'
import FieldBase, { IFieldBase } from './Base'

export interface IFieldAddressValue {
	street1: string
	street2?: string
	city: string
	province: string
	country: string
	zip: string
}

export interface IFieldAddress extends IFieldBase {
	type: FieldType.Address
	value?: IFieldAddressValue
	defaultValue?: IFieldAddressValue
	options?: {}
}

export default class FieldAddress extends FieldBase<IFieldAddress> {}
