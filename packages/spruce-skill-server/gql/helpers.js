// @flow
const parseFields = require('graphql-parse-fields')
const { GraphQLString, GraphQLInt } = require('graphql')
const {
	resolver,
	attributeFields,
	createConnection,
	defaultListArgs,
	defaultArgs,
	argsToFindOptions
} = require('graphql-sequelize')

const { has } = require('lodash')

module.exports = ctx => {
	function checkIsModel(target) {
		return !!target.getTableName
	}

	function checkIsAssociation(target) {
		return !!target.associationType
	}

	function enhancedDefaultArgs() {
		return {
			unauthorizedValue: {
				description:
					'The (string) value to use for fields that are not allowed. Default=null',
				type: GraphQLString
			}
		}
	}

	function pathToScope(path: Object, prevPath?: string) {
		let scope = ''
		if (prevPath && typeof path.key === 'string') {
			scope += `${path.key}.${prevPath}`
		} else if (typeof path.key === 'string') {
			scope = path.key
		} else if (prevPath) {
			scope = prevPath
		}
		if (path.prev) {
			return pathToScope(path.prev, scope)
		}
		return scope.replace('edges.node.', '')
	}

	function cleanModelByScope(options: {
		model: Object,
		modelName: string,
		context: Object,
		info: Object
	}) {
		const { model, modelName, context, info } = options

		// skip the process if we have already done the work
		if (model.cleanedScope) {
			return model
		}

		let requestedFields = parseFields(info)

		if (requestedFields && requestedFields.edges) {
			requestedFields = requestedFields.edges.node
		}

		const pathScope = pathToScope(info.path)
		const rootPath = pathScope.replace(/\..*$/, '')
		const scopes = context.scopes[rootPath]
		const parentPathScope = pathScope.replace(/\.[^.]+$/, '')
		let modelScope = 'public'

		if (has(scopes, pathScope)) {
			modelScope = scopes[pathScope]
		}

		if (!has(scopes, pathScope)) {
			// TODO: add to warnings for full model
			const msg = `${modelName} does not contain the scope ${modelScope} from ${pathScope}`
			log.warn(msg)
			context.warnings.push(msg)
			return null
		}

		log.debug(
			`Scoping ${modelName} through ${parentPathScope} using ${pathScope} with scope of ${modelScope}`
		)

		const scopeObj = ctx.db.models[modelName].scopeObj
		const allowedAttributes = scopeObj[modelScope]

		Object.keys(model.dataValues).forEach(field => {
			const allowedField = has(allowedAttributes, field)
			const requestedField = requestedFields[field]
			const willSkipField = ['warnings', 'totalCount'].includes(field)

			if (!allowedField && requestedField && !willSkipField) {
				log.warn(`${field} unauthorized on ${modelName} via ${pathScope}`)
				model.setDataValue(field, null)
				model[field] = null

				let warnings = model.getDataValue('warnings')
				if (!warnings) {
					model.setDataValue('warnings', { scopes: [] })
				}
				warnings = model.getDataValue('warnings')

				warnings.scopes.push({ field })
				model.setDataValue('warnings', warnings)
				model.warnings = warnings
			}
		})

		if (!model.cleanedScope) {
			model.cleanedScope = true
		}

		return model
	}

	function enhancedResolver(
		model: any,
		options: Object = {},
		scope: string = 'public'
	) {
		const {
			// list,
			// handleConnection,
			before,
			after
			// contextToOptions
		} = options

		const modelName = model.name || model.target.name

		return resolver(model, {
			...options,
			before: (findOptions, args, context, info) => {
				let finalFindOptions = findOptions
				if (!context.warnings) {
					context.warnings = []
				}
				if (!context.scopes) {
					context.scopes = {}
				}
				if (!findOptions.where) {
					findOptions.where = {}
				}
				if (before) {
					finalFindOptions = before(findOptions, args, context, info)
				}

				return finalFindOptions
			},
			after: (result, args, context, info) => {
				let cleanedResult = result
				if (after) {
					cleanedResult = after(result, args, context, info)
				}

				// clean for GraphQLObject
				if (cleanedResult && !Array.isArray(cleanedResult)) {
					return cleanModelByScope({
						model: cleanedResult,
						modelName,
						context,
						info
					})
				}

				// clean graphqllist
				if (cleanedResult && Array.isArray(cleanedResult)) {
					// log.debug('GraphQLList')
					cleanedResult.forEach(r =>
						cleanModelByScope({
							model: r,
							modelName,
							context,
							info
						})
					)
				}

				return cleanedResult
			}
		})
	}

	function enhancedAttributeFields(model: any, options?: Object = {}) {
		const attrFields = attributeFields(model, {
			allowNull: true,
			commentToDescription: true,
			...options
		})

		// append the gql warnings when requesting values not in scope
		attrFields.warnings = {
			description:
				'Optionally include warnings for values not authorized in this scope',
			type: ctx.gql.types.Warning
		}

		return attrFields
	}

	function buildConnection(options: {
		model: Object,
		associationName: string,
		type: any,
		connectionOptions: Object
	}) {
		const { model, type, associationName } = options
		let connectionOptions = options.connectionOptions
		let name = `${model.name}`
		let target = model

		// const modelName = model.associations[associationName].target.modelName
		let modelName = model.name || model.target.name

		if (model.associations[associationName]) {
			modelName = model.associations[associationName].target.name
			name = `${model.name}${associationName}`
			target = model.associations[associationName]
		}

		if (!connectionOptions) {
			connectionOptions = {}
		}
		const {
			before,
			after,
			where,
			connectionFields,
			edgeFields,
			orderBy
		} = connectionOptions

		const createConnectionOptions = {
			name,
			nodeType: type,
			target,
			where,
			connectionFields: () => ({
				totalCount: {
					type: GraphQLInt,
					resolve(connection, args, { logging }) {
						const { source } = connection
						const connectionWhere = connection.where
						const countMethodName = `count${associationName}`
						return source[countMethodName]({
							where: connectionWhere,
							logging
						})
					}
				},
				...connectionFields
			}),
			edgeFields,
			orderBy,
			before: (beforeOptions, args, context, info) => {
				let updatedOptions = beforeOptions
				if (!context.warnings) {
					context.warnings = []
				}
				if (!context.scopes) {
					context.scopes = {}
				}
				if (!updatedOptions.where) {
					updatedOptions.where = {}
				}

				if (args || info.variableValues) {
					// updatedOptions.where = JSON.stringify(args.where)
					updatedOptions = {
						...argsToFindOptions.default(args),
						...argsToFindOptions.default(info.variableValues, [])
					}
				}

				if (
					!updatedOptions.limit ||
					+updatedOptions.limit > 0 ||
					+updatedOptions.limit <= 50
				) {
					updatedOptions.limit = 50
				}

				if (before) {
					updatedOptions = before(updatedOptions, args, context, info)
				}
				return updatedOptions
			},
			after: (result, args, context, info) => {
				let cleanedResult = result
				if (after) {
					cleanedResult = after(result, args, context, info)
				}

				// clean connections
				// log.debug('Connections Array')
				cleanedResult.edges.forEach(edge => {
					let node = edge.node
					node = cleanModelByScope({
						model: edge.node,
						modelName,
						context,
						info
					})

					return {
						...edge,
						node
					}
				})

				return cleanedResult
			}
		}

		const connection = createConnection(createConnectionOptions)

		const opts = {
			type: connection.connectionType,
			args: {
				...defaultListArgs(),
				...connection.connectionArgs
			},
			resolve: connection.resolve
		}

		return opts
	}

	function attributes(model: any, options?: Object = {}) {
		const attrs = {
			...enhancedAttributeFields(model, options)
		}

		if (process.env.ENABLE_GRAPHQL_LOGGING) {
			options.logging = true
		}

		// loop over associations and create connections for each model
		Object.keys(model.associations).forEach(associationName => {
			const modelAssociation = model.associations[associationName]
			const type = ctx.gql.types[modelAssociation.target.name]
			log.debug(
				'modelAssociation',
				associationName,
				modelAssociation.associationType,
				model.name
			)
			if (!type) {
				throw new Error(
					`No GraphQL type exists for ${
						modelAssociation.target.name
					}. Please create one.`
				)
			}

			// create a 1to1 relationship with BelongsTo
			if (modelAssociation.associationType === 'BelongsTo') {
				attrs[associationName] = {
					type,
					args: defaultArgs(modelAssociation),
					resolve: enhancedResolver(modelAssociation)
				}
			} else {
				// build the relay connection for all other types
				attrs[associationName] = buildConnection({
					model,
					type,
					associationName,
					connectionOptions: options
				})
			}
		})

		return attrs
	}
	return {
		resolver,
		attributes,
		attributeFields,
		defaultArgs,
		buildConnection
	}
}
