import ISpruceSchemaFieldTypeBoolean from './boolean'
import ISpruceSchemaFieldTypeText from './text'
import ISpruceSchemaFieldTypeSelect from './select'
import ISpruceSchemaFieldTypeDuration from './duration'
import ISpruceSchemaFieldTypeAddress from './address'
import ISpruceSchemaFieldTypePhone from './phone'
import ISpruceSchemaFieldTypeSchema from './schema'
import ISpruceSchemaFieldTypeRaw from './raw'
import ISpruceSchemaFieldTypeNumber from './number'
import ISpruceSchemaFieldTypeDateTime from './dateTime'

export type ISpruceSchemaField =
	| ISpruceSchemaFieldTypeBoolean
	| ISpruceSchemaFieldTypeSelect
	| ISpruceSchemaFieldTypeDuration
	| ISpruceSchemaFieldTypeText
	| ISpruceSchemaFieldTypeAddress
	| ISpruceSchemaFieldTypePhone
	| ISpruceSchemaFieldTypeSchema
	| ISpruceSchemaFieldTypeRaw
	| ISpruceSchemaFieldTypeNumber
	| ISpruceSchemaFieldTypeDateTime

export enum SpruceSchemaFieldType {
	/** a string, something like varchar(255), configure size using options to impact rendering and storage length */
	Text = 'text',
	/** a true/false, renders as a toggle or checkbox, or a Y/N if used in cli */
	Boolean = 'boolean',
	/** a multiple choice option, setting isArray to true will allow multiple selection */
	Select = 'select',
	/** a span of time, using in the form 1h or 30min */
	Duration = 'duration',
	/** a number, integer, float, etc */
	Number = 'number',
	/** an address input, anything google can resolve */
	Address = 'address',
	/** a phone number, international */
	Phone = 'phone',
	/** for storing a date, a time, or both */
	DateTime = 'dateTime',
	/** points to another schema */
	Schema = 'schema',
	/** unique id */
	Id = 'id'
}

/** export everything */
export { default as ISpruceSchemaFieldTypeBoolean } from './boolean'
export { default as ISpruceSchemaFieldTypeText } from './text'
export { default as ISpruceSchemaFieldTypeDuration } from './duration'
export { default as ISpruceSchemaFieldTypeSelect } from './select'
export { default as ISpruceSchemaFieldTypeAddress } from './address'
export { default as ISpruceSchemaFieldTypePhone } from './phone'
export { default as ISpruceSchemaFieldTypeSchema } from './schema'
export { default as ISpruceSchemaFieldTypeRaw } from './raw'
export { default as ISpruceSchemaFieldTypeNumber } from './number'
