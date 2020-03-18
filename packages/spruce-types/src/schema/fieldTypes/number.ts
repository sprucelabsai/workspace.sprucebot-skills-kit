import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldTypeNumber extends IFieldBase {
	type: FieldType.Number
	value?: number
	defaultValue?: number
}
