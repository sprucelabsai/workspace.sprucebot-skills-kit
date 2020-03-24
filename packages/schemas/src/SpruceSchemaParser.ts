// import Debug from 'debug'
import SpruceSchema, { ISpruceSchemaDefinition } from './SpruceSchema'
import { SpruceFieldType } from './fieldTypes'

// const debug = Debug('@sprucelabs/spruce-types')

export default class SpruceSchemaParser {
	public static parseSchema<T extends ISpruceSchemaDefinition>(schema: T) {
		if (!this.isValidSchema(schema)) {
			throw new Error('INVALID_SCHEMA')
		}

		const templateSchema: T = schema

		const { fields } = schema

		// Parse the fields
		if (fields) {
			Object.keys(fields).forEach(field => {
				if (templateSchema.fields) {
					templateSchema.fields[field] = {
						...fields[field]
					}
				}
			})
		}

		return templateSchema
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

				case SpruceFieldType.Schema:
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

	private static isValidSchema<T extends ISpruceSchemaDefinition>(
		definition: T
	) {
		const schema = new SpruceSchema(definition)
		return schema.isValid()
	}

	/** Returns a primative TS type for the given data type, defaulting to "any" if none was found  */
	private static getPrimativeType(
		primativeType: SpruceFieldType | string
	): string {
		let type = 'any'
		switch (primativeType) {
			case SpruceFieldType.Text:
				type = 'string'
				break
			case SpruceFieldType.Boolean:
				type = 'boolean'
				break
			case SpruceFieldType.Number:
				type = 'number'
				break
			default:
				break
		}

		return type
	}
}
