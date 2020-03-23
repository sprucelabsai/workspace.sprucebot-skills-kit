import FieldBase, { IFieldBase } from './Base'
import { ISpruceSchema } from '../Schema'
import { FieldType } from './types'

export interface IFieldSchema extends IFieldBase {
	type: FieldType.Schema
	value?: ISpruceSchema
	defaultValue?: ISpruceSchema
	options: {
		/** the id of the schema you are relating to */
		schemaId?: string
		/** the actual schema */
		schema?: ISpruceSchema
	}
}

export default class FieldSchema extends FieldBase<IFieldSchema> {}
