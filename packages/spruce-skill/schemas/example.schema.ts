import { SpruceSchemaFieldType, ISpruceSchema } from '@sprucelabs/spruce-types'

const appointmentSchema: ISpruceSchema = {
	id: 'appointment',
	name: 'Appointment',
	fields: {
		time: {
			type: SpruceSchemaFieldType.Text
		}
	}
}

namespace SpruceSchemas.booking.Appointment {
	export const schema = appointmentSchema

	export interface IAppointment {
		time: string
	}
}

const x: SpruceSchemas.booking.Appointment.ISchema = {
	time: 'aalskjdf'
}

const exampleSchema: ISpruceSchema = {
	id: 'example',
	name: 'Example',
	fields: {
		one: {
			type: SpruceSchemaFieldType.Schema,
			isArray: true,
			options: {
				schema: {
					id: 'test',
					name: 'test',
					fields: {
						desiredAppointment: {
							hint: 'This is what we try to get',
							label: 'Primry appointment',
							type: SpruceSchemaFieldType.Schema,
							options: {
								schema: SpruceSchemas.booking.Appointment.schema
							}
						},
						someOtherAppointment: {
							hint: 'This is some other appointment if we have it',
							label: 'Fallbck appointment',
							type: SpruceSchemaFieldType.Schema,
							options: {
								schema: SpruceSchemas.booking.Appointment.schema
							}
						}
					}
				}
			}
		}
	}
}

namespace SpruceSchemas.workspace.Example {
	export const schema = appointmentSchema

	export interface ISchema {
		time: string
	}
}

export default exampleSchema
