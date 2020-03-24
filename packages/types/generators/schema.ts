// build schema definiton files

import {
	ISchemaDefinition,
	Generator as SchemaGenerator
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

	const template = handlebars.compile(hbs)
	const definitionFile = template(context)

	console.log(definitionFile)
}

setTimeout(generate, 1000)
