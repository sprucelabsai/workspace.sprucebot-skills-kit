import {
	SpruceFieldType,
	ISpruceFieldDefinition,
	SpruceFieldTypeMap,
	SpruceFieldClassMap,
	SpruceField
} from './fieldTypes'
import { ISpruceFieldDefinitionBase } from './fieldTypes/Base'
import SchemaFieldValidationError from './SchemaFieldValidationError'

/** the structure of schema.fields. key is field name, value is field definition */
export interface ISpruceSchemaFieldsDefinition {
	[fieldName: string]: ISpruceFieldDefinition
}

/** the form of schema.fields based on an actual definition  */
export type SpruceSchemaFields<T extends ISpruceSchemaDefinition> = Record<
	SpruceSchemaFieldNames<T>,
	SpruceField
>

/** A schema defines the data structure of something */
export interface ISpruceSchemaDefinition {
	/** give this schema a machine friendly id */
	id: string
	/** the name of this schema a human will see */
	name: string
	/** a brief human readable explanation of this schema */
	description?: string
	/** how we type dynamic keys on this schema, if defined you cannot define fields */
	dynamicKeySignature?: ISpruceFieldDefinitionBase & { key: string }
	/** all the fields, keyed by name, required if no dynamicKeySignature is set */
	fields?: ISpruceSchemaFieldsDefinition
}

/** to map a schema to an object with values */
export type SpruceSchemaDefinitionValues<T extends ISpruceSchemaDefinition> = {
	[K in keyof T['fields']]: T['fields'][K] extends ISpruceFieldDefinition
		? T['fields'][K]['isRequired'] extends true
			? Required<SpruceFieldTypeMap[T['fields'][K]['type']]>['value']
			: Partial<SpruceFieldTypeMap[T['fields'][K]['type']]>['value']
		: never
}

/** a union of all field names */
export type SpruceSchemaFieldNames<
	T extends ISpruceSchemaDefinition
> = keyof T['fields']

/** pluck out the field definition from the schema */
export type SpruceSchemaFieldDefinition<
	T extends ISpruceSchemaDefinition,
	K extends keyof T['fields']
> = T['fields'][K] extends ISpruceFieldDefinition
	? SpruceFieldTypeMap[T['fields'][K]['type']] & T['fields'][K]
	: never

export type SpruceSchemaFieldDefinitionType<
	T extends ISpruceSchemaDefinition,
	K extends keyof T['fields']
> = T['fields'][K] extends ISpruceFieldDefinition
	? T['fields'][K]['type']
	: never

/** get the type of the value of a schema's field */
export type SpruceSchemaFieldDefinitionValueType<
	T extends ISpruceSchemaDefinition,
	K extends keyof T['fields']
> = T['fields'][K] extends ISpruceFieldDefinition
	? T['fields'][K]['isRequired'] extends true
		? Required<SpruceFieldTypeMap[T['fields'][K]['type']]>['value']
		: Partial<SpruceFieldTypeMap[T['fields'][K]['type']]>['value']
	: never

/** response to getNamedFields */
export interface ISpruceSchemaNamedField<T extends ISpruceSchemaDefinition> {
	name: SpruceSchemaFieldNames<T>
	field: SpruceField
}

/** options you can pass to schema.get() */
export interface ISpruceSchemaGetSetOptions {
	validate?: boolean
}

/** response when calling validate() */
export interface ISpruceSchemaValidationError<
	T extends ISpruceSchemaDefinition
> {
	fieldName: SpruceSchemaFieldNames<T>
	errors: string[]
}

/** universal schema class  */
export default class SpruceSchema<T extends ISpruceSchemaDefinition> {
	/** the schema definition */
	public definition: T

	/** the values of this schema */
	public values: Partial<SpruceSchemaDefinitionValues<T>>

	/** all the field objects keyed by field name, use getField rather than accessing this directly */
	public fields: SpruceSchemaFields<T>

	public constructor(
		definition: T,
		values?: Partial<SpruceSchemaDefinitionValues<T>>,
		fieldClassMap: Record<SpruceFieldType, any> = SpruceFieldClassMap
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
			this.fields[name as SpruceSchemaFieldNames<T>] = field
		})
	}

	public get<F extends SpruceSchemaFieldNames<T>>(
		fieldName: F,
		options: ISpruceSchemaGetSetOptions = {}
	): SpruceSchemaFieldDefinitionValueType<T, F> {
		// get value off self
		let value: SpruceSchemaFieldDefinitionValueType<T, F> | undefined =
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

		return value as SpruceSchemaFieldDefinitionValueType<T, F>
	}

	/** set a value and ensure its type */
	public set<F extends SpruceSchemaFieldNames<T>>(
		fieldName: F,
		value: SpruceSchemaFieldDefinitionValueType<T, F>,
		options: ISpruceSchemaGetSetOptions = {}
	): this {
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

	/** is this schema valid? */
	public isValid() {
		return this.validate().length > 0
	}

	/** returns an array of schema validation errors */
	public validate(): ISpruceSchemaValidationError<T>[] {
		const errors: ISpruceSchemaValidationError<T>[] = []

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
	public getValues(): SpruceSchemaDefinitionValues<T> {
		const values: Partial<SpruceSchemaDefinitionValues<T>> = { ...this.values }

		this.getNamedFields().forEach(namedField => {
			const { name } = namedField
			const value = this.get(name)
			values[name] = value
		})

		return values as SpruceSchemaDefinitionValues<T>
	}

	/** get all fields as an array for easy looping and mapping */
	public getNamedFields(): ISpruceSchemaNamedField<T>[] {
		const namedFields: ISpruceSchemaNamedField<T>[] = []

		const names = Object.keys(this.fields) as SpruceSchemaFieldNames<T>[]

		names.forEach(name => {
			const field = this.fields[name]
			namedFields.push({ name, field })
		})

		return namedFields
	}
}
