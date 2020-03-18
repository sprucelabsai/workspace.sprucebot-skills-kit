import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldTypeId extends IFieldBase {
	type: FieldType.Id
	value?: string
	defaultValue?: string
	options?: {}
}
