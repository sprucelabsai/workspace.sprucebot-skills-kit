import { ISpruceSchemaField, SpruceSchemaFieldType } from './fieldTypes'

export interface ISpruceSchemaFieldBase {
	/** unique id for this field, rendered as name & id in forms */
	id: string
	/** the type of field this is, will strongly type props for us */
	type: SpruceSchemaFieldType
	/** the permissions used in different contexts */
	acls?: {
		create: {
			[slug: string]: string[]
		}
		read: {
			[slug: string]: string[]
		}
		update: {
			[slug: string]: string[]
		}
		delete: {
			[slug: string]: string[]
		}
	}
	/** does this value store more than one item? */
	isArray?: boolean
	/** how this field is represented to the end-user as an html label or when collecting input from cli */
	label?: string
	/** give an example of how someone should think about this field or give an example of what it may be */
	hint?: string
	/** the default for for this if no value is set */
	defaultValue?: any
	/** the curret value for this field */
	value?: any
	/** is this field required */
	isRequired?: boolean
	/** unique options overriden by the fields that extend it */
	options?: Record<string, any>
}

export interface ISpruceSchema {
	/** give this schema a machine friendly id */
	id: string
	/** the name of this schema a human will see */
	name: string
	/** a brief human readable explanation of this schema */
	description?: string
	/** the sections that make up this schema */
	sections: ISpruceSchemaSection[]
}

export interface ISpruceSchemaSection {
	/** machine friendly identifier for this section */
	id: string
	/** a human readable name for this section, no title is ok, especially if you have only 1 schema */
	title?: string
	/** the fields that comprise this section */
	fields: ISpruceSchemaField[]
}
