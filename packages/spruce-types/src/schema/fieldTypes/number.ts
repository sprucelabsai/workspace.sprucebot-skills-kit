import { FieldType } from '.'
import FieldBase, { IFieldBase } from './Base'

export interface IFieldNumber extends IFieldBase {
	type: FieldType.Number
	value?: number
	defaultValue?: number
}

export default class FieldNumber extends FieldBase<IFieldBase> {}
