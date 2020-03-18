import { assert } from 'chai'
// import { Parser } from '../src/schema/Parser'
// import userSchema from '../src/schema/coreSchemas/user.schema'
import Base from './Base'
// import { FieldType } from '../src/schema/fieldTypes'

class SchemaTests extends Base {
	public constructor() {
		super()
		it('Can check a schema', () => this.checkSchema())
	}

	public async checkSchema(): Promise<void> {
		assert.isTrue(true)

		// TODO
		// Parser.parseSchema({
		// 	def: {
		// 		id: 'example',
		// 		name: 'Example',
		// 		fields: {
		// 			one: {
		// 				type: FieldType.Schema,
		// 				isArray: true,
		// 				options: {
		// 					schema: {
		// 						id: 'test',
		// 						name: 'test',
		// 						fields: {
		// 							someUser: {
		// 								hint: 'This is what we try to get',
		// 								label: 'Primry appointment',
		// 								type: FieldType.Schema,
		// 								options: {
		// 									schema: userSchema
		// 								}
		// 							}
		// 							// someOtherAppointment: {
		// 							// 	hint: 'This is some other appointment if we have it',
		// 							// 	label: 'Fallbck appointment',
		// 							// 	type: FieldType.Schema,
		// 							// 	options: {
		// 							// 		schema: SpruceSchemas.booking.Appointment.schema
		// 							// 	}
		// 							// }
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// })
	}
}

describe('SchemaTests', function Tests() {
	new SchemaTests()
})
