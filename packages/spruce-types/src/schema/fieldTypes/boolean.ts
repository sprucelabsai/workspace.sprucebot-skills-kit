import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldBoolean extends IFieldBase {
	type: FieldType.Boolean
	value?: boolean
	defaultValue?: boolean
	options: {}
}
