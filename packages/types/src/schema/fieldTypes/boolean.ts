import FieldBase, { IFieldBase } from './Base'
import { FieldType } from './types'

export interface IFieldBoolean extends IFieldBase {
	type: FieldType.Boolean
	value?: boolean
	defaultValue?: boolean
	options: {}
}

export default class FieldBoolean extends FieldBase<IFieldBoolean> {}
