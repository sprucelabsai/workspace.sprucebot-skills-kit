import { IFieldBase, ISpruceSchema } from '../schema'
import { FieldType } from '../fieldTypes'

export default interface IFieldSchema extends IFieldBase {
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
