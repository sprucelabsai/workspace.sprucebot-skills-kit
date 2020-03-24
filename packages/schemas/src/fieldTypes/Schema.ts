import SpruceFieldBase, { ISpruceFieldDefinitionBase } from './Base'
import { ISpruceSchemaDefinition } from '../SpruceSchema'
import { SpruceFieldType } from './types'

export interface ISpruceFieldDefinitionSchema
	extends ISpruceFieldDefinitionBase {
	type: SpruceFieldType.Schema
	value?: ISpruceSchemaDefinition
	defaultValue?: ISpruceSchemaDefinition
	options: {
		/** the id of the schema you are relating to */
		schemaId?: string
		/** the actual schema */
		schema?: ISpruceSchemaDefinition
	}
}

export default class SpruceFieldSchema extends SpruceFieldBase<
	ISpruceFieldDefinitionSchema
> {}
