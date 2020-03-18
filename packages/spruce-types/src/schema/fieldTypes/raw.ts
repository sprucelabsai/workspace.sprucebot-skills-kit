import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldTypeRaw extends IFieldBase {
	type: FieldType.Raw
	value?: any
	defaultValue?: any
	options: {
		interfaceName: string
	}
}
