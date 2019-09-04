const globby = require('globby')
const { buildSchema } = require('graphql')
const { readFileSync } = require('fs')
const GraphQLJSON = require('graphql-type-json')
const {
	GraphQLDate,
	GraphQLTime,
	GraphQLDateTime
} = require('graphql-iso-date')

module.exports = function(schemaString) {
	// Define custom scalers we use from other libraries
	let schema = `
	scalar JSON
	scalar JSONObject
	scalar Date
	scalar Time
	scalar DateTime
	`

	// Loop through all the files and concat their definitions together to create a single schema
	globby.sync(schemaString).forEach(path => {
		const data = readFileSync(path, { encoding: 'utf-8' })
		schema += `\n\n${data}`
	})

	// Build the schema
	const builtSchema = buildSchema(schema)
	// Set resolvers for custom types
	Object.assign(builtSchema._typeMap.JSON, GraphQLJSON)
	Object.assign(builtSchema._typeMap.JSONObject, GraphQLJSON.GraphQLJSONObject)
	Object.assign(builtSchema._typeMap.Date, GraphQLDate)
	Object.assign(builtSchema._typeMap.Time, GraphQLTime)
	Object.assign(builtSchema._typeMap.DateTime, GraphQLDateTime)
	return builtSchema
}
