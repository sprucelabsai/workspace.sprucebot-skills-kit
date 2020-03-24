import { ISchemaDefinition } from '../'
import { camelCase } from 'lodash'
import { FieldType } from '../fieldTypes'
import { ISchemaFieldsDefinition } from '../Schema'

export interface IGeneratorInterfaceTypeNames {
	interfaceName: string
	typeName: string
}

export interface ISchemaDefinitionMap {
	[id: string]: ISchemaDefinitionMapValue
}

export interface ISchemaDefinitionMapValue {
	definition: ISchemaDefinition
	typeName: string
	interfaceName: string
}

function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export default class Generator {
	/** generate interface and type names based off schema name */
	public static generateNames(
		schemaName: string
	): IGeneratorInterfaceTypeNames {
		return {
			interfaceName: `I${capitalizeFirstLetter(camelCase(schemaName))}`,
			typeName: `${capitalizeFirstLetter(camelCase(schemaName))}`
		}
	}

	/** a map of names keyed by interface name */
	public static generateSchemaMap(
		definitions: ISchemaDefinition[],
		map: ISchemaDefinitionMap = {},
		depth = 0
	): ISchemaDefinitionMap {
		let newMap = { ...map }

		definitions.forEach(definition => {
			const { typeName, interfaceName } = Generator.generateNames(
				definition.name
			)

			// we've already mapped this type
			if (definition.id in newMap) {
				if (depth === 0) {
					throw new Error(`Schema with id ${definition.id} already exists!`)
				}
				return
			}

			newMap[definition.id] = {
				interfaceName,
				typeName,
				definition
			}

			// check children
			Object.values(definition.fields ?? {}).forEach(field => {
				if (field.type === FieldType.Schema) {
					const schemaDefinition = field.options.schema
					if (schemaDefinition) {
						newMap = Generator.generateSchemaMap([schemaDefinition], newMap, depth + 1)
					}
				}
			})
		})

		// now that everything is mapped, lets change schema fields to id's (vs sub schemas)
		newMap = Object.keys(newMap).reduce<ISchemaDefinitionMap>((map, name) => {
			const { definition } = map[name]
			
			let newFields : ISchemaFieldsDefinition | undefined

			Object.keys(definition.fields ?? {}).forEach(name => {
				debugger
				const field = definition.fields?[name]

				// if this is a schema field, lets make sure schema id is set correctly
				if (field && field.types === FieldType.Schema) {
					
					if (!newFields) {
						newFields = {}
					}

					// get the one true id
					const schemaId = field.options.schema ? field.options.schema.id : field.options.schemaId
					const newOptions = {...field.options}

					// no schema or schema id options (set again below)
					delete newOptions.schema

					// setup new field
					newFields[name] = {
						...field,
						options: {
							...newOptions,
							schemaId: schemaId
						}
					}

				}
			})

			return map
		}, newMap)

		debugger

		return newMap
	}
}
