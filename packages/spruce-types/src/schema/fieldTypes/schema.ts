import { ISpruceSchemaFieldBase, ISpruceSchema } from '../schema'
import { SpruceSchemaFieldType } from '../fieldTypes'

export default interface ISpruceSchemaFieldTypeSchema
	extends ISpruceSchemaFieldBase {
	type: SpruceSchemaFieldType.Schema
	value?: ISpruceSchema
	defaultValue?: ISpruceSchema
	options: {
		/** the id of the schema you are relating to */
		schemaId?: string
		/** the actual schema */
		schema?: ISpruceSchema
	}
}
