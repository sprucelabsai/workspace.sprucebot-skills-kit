import FieldBoolean, { IFieldBoolean } from './Boolean'
import FieldSelect, { IFieldSelect } from './Select'
import FieldDuration, { IFieldDuration } from './Duration'
import FieldId, { IFieldId } from './Id'
import FieldAddress, { IFieldAddress } from './Address'
import FieldPhone, { IFieldPhone } from './Phone'
import FieldSchema, { IFieldSchema } from './Schema'
import FieldRaw, { IFieldRaw } from './Raw'
import FieldNumber, { IFieldNumber } from './Number'
import FieldDateTime, { IFieldDateTime } from './DateTime'
import FieldText, { IFieldText } from './Text'

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

export type FieldClass =
	| typeof FieldBoolean
	| typeof FieldSelect
	| typeof FieldDuration
	| typeof FieldId
	| typeof FieldText
	| typeof FieldAddress
	| typeof FieldPhone
	| typeof FieldSchema
	| typeof FieldRaw
	| typeof FieldNumber
	| typeof FieldDateTime

export type Field =
	| FieldBoolean
	| FieldSelect
	| FieldDuration
	| FieldId
	| FieldText
	| FieldAddress
	| FieldPhone
	| FieldSchema
	| FieldRaw
	| FieldNumber
	| FieldDateTime

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
export type FieldTypeMap = {
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

// TODO: why does this have to be any?
/** a global place to reference all field type classes */
export const FieldClassMap: Record<FieldType, any> = {
	[FieldType.Boolean]: FieldBoolean,
	[FieldType.Select]: FieldSelect,
	[FieldType.Duration]: FieldDuration,
	[FieldType.Id]: FieldId,
	[FieldType.Address]: FieldAddress,
	[FieldType.Phone]: FieldPhone,
	[FieldType.Schema]: FieldSchema,
	[FieldType.Raw]: FieldRaw,
	[FieldType.Number]: FieldNumber,
	[FieldType.DateTime]: FieldDateTime,
	[FieldType.Text]: FieldText
}
