import { FieldType } from '.'
import FieldBase, { IFieldBase } from './Base'

export interface IFieldRaw extends IFieldBase {
	type: FieldType.Raw
	value?: any
	defaultValue?: any
	options: {
		interfaceName: string
	}
}

export default class FieldRaw extends FieldBase<IFieldRaw> {}
