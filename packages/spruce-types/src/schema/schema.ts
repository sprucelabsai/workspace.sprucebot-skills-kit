import {
	FieldType,
	IField,
	FieldTypeMap,
	FieldClassMap,
	Field
} from './fieldTypes'
import { IFieldBase } from './fieldTypes/Base'
import SchemaFieldValidationError from './SchemaFieldValidationError'

export interface ISpruceSchemaFields {
	[fieldName: string]: IField
}

export type SpruceSchemaFields<T extends ISpruceSchema> = Record<
	SchemaFieldNames<T>,
	Field
>

/** A schema defines the data structure of something */
export interface ISpruceSchema {
	/** give this schema a machine friendly id */
	id: string
	/** the name of this schema a human will see */
	name: string
	/** a brief human readable explanation of this schema */
	description?: string
	/** how we type dynamic keys on this schema, if defined you cannot define fields */
	dynamicKeySignature?: IFieldBase & { key: string }
	/** all the fields, keyed by name, required if no dynamicKeySignature is set */
	fields?: ISpruceSchemaFields
}

/** to map a schema to an object with values */
export type SchemaToValues<T extends ISpruceSchema> = {
	[K in keyof T['fields']]: T['fields'][K] extends IField
		? T['fields'][K]['isRequired'] extends true
			? Required<FieldTypeMap[T['fields'][K]['type']]>['value']
			: Partial<FieldTypeMap[T['fields'][K]['type']]>['value']
		: never
}

/** a union of all field names */
export type SchemaFieldNames<T extends ISpruceSchema> = keyof T['fields']

/** pluck out the field definition from the schema */
export type SchemaField<
	T extends ISpruceSchema,
	K extends keyof T['fields']
> = T['fields'][K] extends IField
	? FieldTypeMap[T['fields'][K]['type']] & T['fields'][K]
	: never

export type SchemaFieldType<
	T extends ISpruceSchema,
	K extends keyof T['fields']
> = T['fields'][K] extends IField ? T['fields'][K]['type'] : never

/** get the type of the value of a schema's field */
export type SchemaValueType<
	T extends ISpruceSchema,
	K extends keyof T['fields']
> = T['fields'][K] extends IField
	? T['fields'][K]['isRequired'] extends true
		? Required<FieldTypeMap[T['fields'][K]['type']]>['value']
		: Partial<FieldTypeMap[T['fields'][K]['type']]>['value']
	: never

/** response to getNamedFields */
export interface INamedField<T extends ISpruceSchema> {
	name: SchemaFieldNames<T>
	field: Field
}

/** options you can pass to schema.get() */
export interface ISpruceSchemaGetSetOptions {
	validate?: boolean
}

/** response when calling validate() */
export interface ISchemaValidationError<T extends ISpruceSchema> {
	fieldName: SchemaFieldNames<T>
	errors: string[]
}

/** universal schema class  */
export class SpruceSchema<T extends ISpruceSchema> {
	/** the schema definition */
	definition: T

	/** the values of this schema */
	values: Partial<SchemaToValues<T>>

	/** all the field objects keyed by field name, use getField rather than accessing this directly */
	fields: SpruceSchemaFields<T>

	constructor(
		definition: T,
		values?: Partial<SchemaToValues<T>>,
		fieldClassMap: Record<FieldType, any> = FieldClassMap
	) {
		// set definition and values
		this.definition = definition
		this.values = values ? values : {}

		// pull field definitions off schema definition
		const fieldDefinitions = this.definition.fields
		if (!fieldDefinitions) {
			throw new Error(`Schemas don't support dynamic fields yet`)
		}

		// empty fields to start
		this.fields = {} as SpruceSchemaFields<T>

		Object.keys(fieldDefinitions).forEach(name => {
			const definition = fieldDefinitions[name]
			const fieldClass = fieldClassMap[definition.type]
			const field = new fieldClass(definition)
			this.fields[name as SchemaFieldNames<T>] = field
		})
	}

	public get = <F extends SchemaFieldNames<T>>(
		fieldName: F,
		options: ISpruceSchemaGetSetOptions = {}
	): SchemaValueType<T, F> => {
		// get value off self
		let value: SchemaValueType<T, F> | undefined =
			typeof this.values[fieldName] !== undefined
				? this.values[fieldName]
				: undefined

		const { validate = true } = options

		// get field
		const field = this.fields[fieldName]

		// validate if we're supposed to
		const errors = validate ? field.validate(value) : []

		// if there are any errors, bail
		if (errors.length > 0) {
			throw new SchemaFieldValidationError(fieldName as string, errors)
		}

		// if there is a value, transform it to it's expected value
		if (value !== null && typeof value !== undefined) {
			value = field.toValueType(value)
		}

		return value as SchemaValueType<T, F>
	}

	/** set a value and ensure its type */
	public set = <F extends SchemaFieldNames<T>>(
		fieldName: F,
		value: SchemaValueType<T, F>,
		options: ISpruceSchemaGetSetOptions = {}
	): this => {
		let localValue = value
		const { validate = true } = options

		// get the field
		const field = this.fields[fieldName]

		// if there is a value, transform it to it's expected value
		if (localValue !== null && typeof localValue !== undefined) {
			localValue = field.toValueType(localValue)
		}

		// validate if we're supposed to
		const errors = validate ? field.validate(localValue) : []

		if (errors.length > 0) {
			throw new SchemaFieldValidationError(fieldName as string, errors)
		}

		this.values[fieldName] = localValue

		return this
	}

	public validate = (): ISchemaValidationError<T>[] => {
		const errors: ISchemaValidationError<T>[] = []

		this.getNamedFields().forEach(item => {
			const { name, field } = item
			const value = this.get(name, { validate: false })
			const fieldErrors = field.validate(value)

			if (fieldErrors.length > 0) {
				errors.push({
					fieldName: name,
					errors: fieldErrors
				})
			}
		})

		return errors
	}

	/** get all values valued */
	public getValues = (): SchemaToValues<T> => {
		const values: Partial<SchemaToValues<T>> = { ...this.values }

		this.getNamedFields().forEach(namedField => {
			const { name } = namedField
			const value = this.get(name)
			values[name] = value
		})

		return values as SchemaToValues<T>
	}

	/** get all fields as an array for easy looping and mapping */
	public getNamedFields = (): INamedField<T>[] => {
		const namedFields: INamedField<T>[] = []

		const names = Object.keys(this.fields) as SchemaFieldNames<T>[]

		names.forEach(name => {
			const field = this.fields[name]
			namedFields.push({ name, field })
		})

		return namedFields
	}
}
