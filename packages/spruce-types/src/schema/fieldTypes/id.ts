import { FieldType } from '.'
import FieldBase, { IFieldBase } from './Base'

export interface IFieldId extends IFieldBase {
	type: FieldType.Id
	value?: string
	defaultValue?: string
	options?: {}
}

export default class FieldId extends FieldBase<IFieldId> {}
