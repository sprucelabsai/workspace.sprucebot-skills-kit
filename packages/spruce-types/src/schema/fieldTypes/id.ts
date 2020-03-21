import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldId extends IFieldBase {
	type: FieldType.Id
	value?: string
	defaultValue?: string
	options?: {}
}
