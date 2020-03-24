import FieldBase, { IFieldBase } from './Base'

export interface IFieldNumber extends IFieldBase {
	type: Fie.Number
	value?: number
	defaultValue?: number
}

export default class FieldNumber extends FieldBase<IFieldNumber> {}
