import { IFieldBase } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldRaw extends IFieldBase {
	type: FieldType.Raw
	value?: any
	defaultValue?: any
	options: {
		interfaceName: string
	}
}
