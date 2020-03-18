import { ISpruceSchema, SpruceSchemaFieldType } from '@sprucelabs/spruce-types'

interface ITemplateSchema extends ISpruceSchema {
	type: string
}

export class Parser {
	public static parseSchema(schema: ISpruceSchema) {
		if (!this.isValidSchema(schema)) {
			throw new Error('INVALID_SCHEMA')
		}

		const templateSchema: ITemplateSchema = {}

		const { id, name, description, fields } = schema

		// Parse the fields
		if (fields) {
			Object.keys(fields).forEach(field => {
				if (templateSchema[field]) {
					templateSchema[field] = {
						...fields[field]
					}
				}
			})
		}
	}
	/** Recursively parses a payload (or body) to the format we need to generate types. This gets fed into a handlebars template */
	public static parseDefinition(options: {
		def?: Record<string, any>
		allowRaw?: boolean
		hasArbitraryPayload?: boolean
		hasArbitraryBody?: boolean
	}): Record<string, any> | null {
		const { def, allowRaw, hasArbitraryPayload, hasArbitraryBody } = options
		if (!def) {
			return null
		}
		const parsed: Record<string, any> = {}
		Object.keys(def).forEach(key => {
			const item = def[key]
			let type: any = 'any'
			let isObject = false
			const isArray = item.isArray === true
			let itemType: string | undefined

			switch (item.type) {
				// case SpruceDataTypes.Raw:
				// 	if (allowRaw) {
				// 		type = item.raw
				// 	} else {
				// 		type = 'any'
				// 	}
				// 	break

				case SpruceSchemaFieldType.Schema:
					isObject = true
					type = this.parseDefinition({
						def: item.fields,
						allowRaw,
						hasArbitraryPayload,
						hasArbitraryBody
					})
					break

				default:
					type = this.getPrimativeType(item.type)
					break
			}

			parsed[key] = {
				...item,
				isObject,
				isArray,
				hasArbitraryPayload,
				hasArbitraryBody,
				type,
				itemType
			}
		})

		return parsed
	}

	private static isValidSchema(schema: ISpruceSchema) {
		// TODO: Implement validation

		return true
	}

	/** Returns a primative TS type for the given data type, defaulting to "any" if none was found  */
	private static getPrimativeType(
		primativeType: SpruceSchemaFieldType | string
	): string {
		let type = 'any'
		switch (primativeType) {
			case SpruceSchemaFieldType.Text:
				type = 'string'
				break
			case SpruceSchemaFieldType.Boolean:
				type = 'boolean'
				break
			case SpruceSchemaFieldType.Number:
				type = 'number'
				break
			default:
				break
		}

		return type
	}
}
