import IFieldBoolean from './boolean'
import IFieldText from './text'
import IFieldSelect from './select'
import IFieldDuration from './duration'
import IFieldId from './id'
import IFieldAddress from './address'
import IFieldPhone from './phone'
import IFieldSchema from './schema'
import IFieldRaw from './raw'
import IFieldNumber from './number'
import IFieldDateTime from './dateTime'

export type IField =
	| IFieldBoolean
	| IFieldSelect
	| IFieldDuration
	| IFieldId
	| IFieldText
	| IFieldAddress
	| IFieldPhone
	| IFieldSchema
	| IFieldRaw
	| IFieldNumber
	| IFieldDateTime

export enum FieldType {
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
	Id = 'id',
	/** 🛑 Core API only */
	Raw = 'raw'
}

/** useful for type lookups for generics */
export type IFieldTypeMap = {
	boolean: IFieldBoolean
	select: IFieldSelect
	duration: IFieldDuration
	id: IFieldId
	text: IFieldText
	address: IFieldAddress
	phone: IFieldPhone
	schema: IFieldSchema
	raw: IFieldRaw
	number: IFieldNumber
	dateTime: IFieldDateTime
}

/** export everything */
export { default as IFieldBoolean } from './boolean'
export { default as IFieldText } from './text'
export { default as IFieldDuration, IFieldDurationValue } from './duration'
export { default as IFieldId } from './id'
export { default as IFieldSelect, IFieldSelectChoice } from './select'
export { default as IFieldAddress, IFieldAddressValue } from './address'
export { default as IFieldPhone } from './phone'
export { default as IFieldSchema } from './schema'
export { default as IFieldRaw } from './raw'
export { default as IFieldNumber } from './number'
