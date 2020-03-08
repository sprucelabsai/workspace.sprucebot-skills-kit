import ISpruceSchemaFieldBoolean from './boolean'
import ISpruceSchemaFieldText from './text'
import ISpruceSchemaFieldSelect from './select'
import ISpruceSchemaFieldDuration from './duration'
import ISpruceSchemaFieldAddress from './address'
import ISpruceSchemaFieldPhone from './phone'

export type ISpruceSchemaField =
	| ISpruceSchemaFieldBoolean
	| ISpruceSchemaFieldSelect
	| ISpruceSchemaFieldDuration
	| ISpruceSchemaFieldText
	| ISpruceSchemaFieldAddress
	| ISpruceSchemaFieldPhone

export enum SpruceSchemaFieldType {
	/** a string, something like varchar(255), configure size using options to impact rendering and storage length */
	Text = 'text',
	/** a true/false, renders as a toggle or checkbox, or a Y/N if used in cli */
	Boolean = 'boolean',
	/** a multiple choice option, setting isArray to true will allow multiple selection */
	Select = 'select',
	/** a span of time, using in the form 1h or 30min */
	Duration = 'duration',
	/** a much more complex option, see props for definition */
	Object = 'object',
	/** an address input, anything google can resolve */
	Address = 'address',
	/** a phone number, international */
	Phone = 'phone',
	/** 🛑 Core API only */
	Raw = 'raw'
}

/** export everything */
export { default as ISpruceSchemaFieldBoolean } from './boolean'
export { default as ISpruceSchemaFieldText } from './text'
export { default as ISpruceSchemaFieldDuration } from './duration'
export { default as ISpruceSchemaFieldSelect } from './select'
