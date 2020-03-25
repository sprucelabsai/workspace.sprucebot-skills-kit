// build schema definiton files

import {
	ISchemaDefinition,
	IFieldDefinition,
	Generator as SchemaGenerator,
	FieldType,
	FieldBase
} from '@sprucelabs/schemas'
import path from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

async function generate() {
	// all schemas
	const schemas: ISchemaDefinition[] = []

	// schema dir
	const schemaDir = path.join(__dirname, '../src/schemas')

	// load schemas
	const schemaFileNames = fs
		.readdirSync(schemaDir)
		.filter(fileName => fileName.substr(-10) === '.schema.js')

	// loop through each defined schema and start generating the template
	const promises = Promise.all(
		schemaFileNames.map(async fileName => {
			const schemaPath = path.join(schemaDir, fileName)

			// try loading the schema definition
			try {
				const definition = (await import(schemaPath))
					.default as ISchemaDefinition

				// add definition
				schemas.push(definition)
			} catch (err) {
				console.log(`Could not import schema ${schemaPath}`)
				// we do NOT want to continue if one fails
				throw err
			}
		})
	)

	await promises

	debugger
	// get the global schema map
	const map = SchemaGenerator.generateSchemaMap(schemas)
	const context = {
		namespaces: [
			{
				namespace: 'core',
				schemas: Object.values(map)
			}
		]
	}

	debugger
	const hbsPath = path.join(__dirname, 'templates', 'schemas.hbs')
	const hbs = fs.readFileSync(hbsPath)

	// helpers we need to rock this
	handlebars.registerHelper('escape', function(variable) {
		return variable.replace(/(['])/g, '\\$1')
	})

	handlebars.registerHelper('isEqual', function(arg1, arg2, options) {
		//@ts-ignore // TODO how should this work in a typed environment?
		return arg1 == arg2 ? options.fn(this) : options.inverse(this)
	})

	handlebars.registerHelper('fieldTypeEnum', function(
		fieldDefinition: IFieldDefinition
	) {
		const field = FieldBase.field(fieldDefinition)
		return field.typeEnumStringLiteral()
	})

	handlebars.registerHelper('fieldValueType', function(
		fieldDefinition: IFieldDefinition,
		options
	) {
		const {
			data: { root }
		} = options

		const namespaces = root && root.namespaces
		const typeMap = root && root.typeMap

		if (!namespaces || !typeMap) {
			throw new Error(
				'You must pass namespaces and a typeMap to render this script'
			)
		}

		let typeLiteral
		switch (fieldDefinition.type) {
			case FieldType.Schema: {
				for (const namespace of namespaces) {
					if (namespace.schemas[fieldDefinition.options.schemaId || '']) {
						typeLiteral =
							namespace.schemas[fieldDefinition.options.schemaId || '']
								.interfaceName
						break
					}
				}
				if (!typeLiteral) {
					throw new Error(
						`could not find schema with id ${fieldDefinition.options.schemaId}`
					)
				}
				break
			}
			default:
				typeLiteral = 'text'
		}

		if (fieldDefinition.isArray) {
			typeLiteral = typeLiteral + '[]'
		}

		return typeLiteral
	})

	const template = handlebars.compile(hbs)
	const definitionFile = template(context)

	console.log(definitionFile)
}

// timeout handles debugger delays
setTimeout(generate, 1000)
