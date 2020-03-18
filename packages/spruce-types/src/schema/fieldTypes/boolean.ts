import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldTypeBoolean extends IFieldBase {
	type: FieldType.Boolean
	value?: boolean
	defaultValue?: boolean
	options?: {}
}
