import SpruceFieldBoolean, { ISpruceFieldBooleanDefinition } from './Boolean'
import SpruceFieldSelect, { ISpruceFieldDefinitionSelect } from './Select'
import FieldDuration, { IFieldDuration } from './Duration'
import SpruceFieldId, { ISpruceFieldDefinitionId } from './Id'
import SpruceFieldAddress, { ISpruceFieldAddressDefinition } from './Address'
import SpruceFieldPhone, { ISpruceFieldDefinitionPhone } from './Phone'
import SpruceFieldSchema, { ISpruceFieldDefinitionSchema } from './Schema'
import SpruceFieldRaw, { ISpruceFieldDefinitionRaw } from './Raw'
import FieldNumber, { ISpruceFieldDefinitionNumber } from './Number'
import FieldDateTime, { IFieldDateTime } from './DateTime'
import SpruceFieldText, { ISpruceFieldDefinitionText } from './Text'

export type ISpruceFieldDefinition =
	| ISpruceFieldBooleanDefinition
	| ISpruceFieldDefinitionSelect
	| IFieldDuration
	| ISpruceFieldDefinitionId
	| ISpruceFieldDefinitionText
	| ISpruceFieldAddressDefinition
	| ISpruceFieldDefinitionPhone
	| ISpruceFieldDefinitionSchema
	| ISpruceFieldDefinitionRaw
	| ISpruceFieldDefinitionNumber
	| IFieldDateTime

export type SpruceFieldClass =
	| typeof SpruceFieldBoolean
	| typeof SpruceFieldSelect
	| typeof FieldDuration
	| typeof SpruceFieldId
	| typeof SpruceFieldText
	| typeof SpruceFieldAddress
	| typeof SpruceFieldPhone
	| typeof SpruceFieldSchema
	| typeof SpruceFieldRaw
	| typeof FieldNumber
	| typeof FieldDateTime

export type SpruceField =
	| SpruceFieldBoolean
	| SpruceFieldSelect
	| FieldDuration
	| SpruceFieldId
	| SpruceFieldText
	| SpruceFieldAddress
	| SpruceFieldPhone
	| SpruceFieldSchema
	| SpruceFieldRaw
	| FieldNumber
	| FieldDateTime

export enum SpruceFieldType {
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
export type SpruceFieldTypeMap = {
	boolean: ISpruceFieldBooleanDefinition
	select: ISpruceFieldDefinitionSelect
	duration: IFieldDuration
	id: ISpruceFieldDefinitionId
	text: ISpruceFieldDefinitionText
	address: ISpruceFieldAddressDefinition
	phone: ISpruceFieldDefinitionPhone
	schema: ISpruceFieldDefinitionSchema
	raw: ISpruceFieldDefinitionRaw
	number: ISpruceFieldDefinitionNumber
	dateTime: IFieldDateTime
}

// TODO: why does this have to be any?
/** a global place to reference all field type classes */
export const SpruceFieldClassMap: Record<SpruceFieldType, any> = {
	[SpruceFieldType.Boolean]: SpruceFieldBoolean,
	[SpruceFieldType.Select]: SpruceFieldSelect,
	[SpruceFieldType.Duration]: FieldDuration,
	[SpruceFieldType.Id]: SpruceFieldId,
	[SpruceFieldType.Address]: SpruceFieldAddress,
	[SpruceFieldType.Phone]: SpruceFieldPhone,
	[SpruceFieldType.Schema]: SpruceFieldSchema,
	[SpruceFieldType.Raw]: SpruceFieldRaw,
	[SpruceFieldType.Number]: FieldNumber,
	[SpruceFieldType.DateTime]: FieldDateTime,
	[SpruceFieldType.Text]: SpruceFieldText
}
