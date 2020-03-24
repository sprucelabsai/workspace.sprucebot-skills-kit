// build schema definiton files

import {
	ISchemaDefinition,
	Generator as SchemaGenerator
} from '@sprucelabs/schemas'
import path from 'path'
import fs from 'fs'

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
	const map = SchemaGenerator.generateSchemaMap(schemas)
	debugger
	console.log(schemaDir, schemas, map)
}

setTimeout(generate, 1000)
