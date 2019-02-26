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

	function pathToScope(path, prevPath) {
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
		return scope.replace(/edges\.node\./g, '')
	}

	function cleanModelByScope(options) {
		const { model, context, info } = options
		const modelName = model.constructor.name

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
		} else if (has(scopes, `${pathScope}.${model.name}`)) {
			modelScope = scopes[`${pathScope}.${model.name}`]
		} else {
			const msg = `${
				model.name
			} does not contain the scope "${modelScope}" from ${pathScope}. If this should be allowed, check the config/scopes.js file.`
			context.warnings.push(msg)
			return null
		}

		context.scopeInfo.push(
			`Scoping ${modelName} through ${parentPathScope} using ${pathScope} with scope of ${modelScope}`
		)

		const scopeObj = ctx.db.models[modelName].scopeObj
		const allowedAttributes = scopeObj[modelScope]

		Object.keys(model.dataValues).forEach(field => {
			const allowedField = has(allowedAttributes, field)
			const requestedField = requestedFields[field]
			const willSkipField = ['warnings', 'totalCount'].includes(field)

			if (!allowedField && requestedField && !willSkipField) {
				context.attributeWarnings.push(
					`${modelName} scope of "${modelScope}" does not include the field "${field}". If this should be allowed, check the scopes in models/${modelName}.js`
				)
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

	function enhancedResolver(model, options, scope) {
		if (!options) {
			options = {}
		}
		if (!scope) {
			scope = 'public'
		}
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
			before: async (beforeOptions, args, context, info) => {
				let updatedOptions = beforeOptions
				if (!context.warnings) {
					context.warnings = []
				}
				if (!context.scopeInfo) {
					context.scopeInfo = []
				}
				if (!context.attributeWarnings) {
					context.attributeWarnings = []
				}
				if (!context.scopes) {
					context.scopes = {}
				}
				if (!context.findOptions) {
					context.findOptions = {}
				}
				if (!updatedOptions.where) {
					updatedOptions.where = {}
				}

				if (args) {
					updatedOptions = {
						...updatedOptions,
						...argsToFindOptions.default(args, [])
					}
				}

				let finalOptions = updatedOptions
				if (before) {
					finalOptions = await before(updatedOptions, args, context, info)
				}
				return finalOptions
			},
			after: (result, args, context, info) => {
				let cleanedResult = result
				if (after) {
					cleanedResult = after(result, args, context, info)
				}

				// clean for GraphQLObject
				if (cleanedResult && !Array.isArray(cleanedResult)) {
					cleanedResult = cleanModelByScope({
						model: cleanedResult,
						context,
						info
					})
				}

				// clean graphqllist
				if (cleanedResult && Array.isArray(cleanedResult)) {
					for (let i = 0; i < cleanedResult.length; i += 1) {
						const r = cleanedResult[i]
						const cleanResult = cleanModelByScope({
							model: r,
							context,
							info
						})

						if (cleanResult === null) {
							return null
						}
					}
				}

				return cleanedResult
			}
		})
	}

	function enhancedAttributeFields(model, options) {
		if (!options) {
			options = {}
		}
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

	function buildConnection(options) {
		const { model, type, associationName } = options
		let connectionOptions = options.connectionOptions
		let name = options.name || model.name
		let target = model

		let modelName = model.name || model.target.name

		if (model.associations[associationName]) {
			modelName = model.associations[associationName].target.name
			name = `${model.name}${
				model.associations[associationName].associationType
			}${associationName}`
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
					resolve(connection, args, context, info) {
						const fullCount = connection.fullCount || null
						return fullCount
					}
				},
				...connectionFields
			}),
			edgeFields,
			orderBy,
			before: async (beforeOptions, args, context, info) => {
				const pathScope = pathToScope(info.path)
				const rootPath = pathScope.replace(/\..*$/, '')

				let updatedOptions = beforeOptions
				if (!context.warnings) {
					context.warnings = []
				}
				if (!context.attributeWarnings) {
					context.attributeWarnings = []
				}
				if (!context.scopeInfo) {
					context.scopeInfo = []
				}
				if (!context.scopes) {
					context.scopes = {}
				}
				if (!context.findOptions) {
					context.findOptions = {}
				}
				if (!updatedOptions.where) {
					updatedOptions.where = {}
				}

				if (
					context.findOptions &&
					context.findOptions[rootPath] &&
					context.findOptions[rootPath][pathScope]
				) {
					updatedOptions.where = {
						...updatedOptions.where,
						...context.findOptions[rootPath][pathScope]
					}
				}

				if (args) {
					updatedOptions = {
						...updatedOptions,
						...argsToFindOptions.default(args, [])
					}
				}

				if (
					!updatedOptions.limit ||
					+updatedOptions.limit < 0 ||
					+updatedOptions.limit >= 50
				) {
					updatedOptions.limit = 50
				}

				let finalOptions = updatedOptions
				if (before) {
					finalOptions = await before(updatedOptions, args, context, info)
				}
				return finalOptions
			},
			after: (result, args, context, info) => {
				let cleanedResult = result
				if (after) {
					cleanedResult = after(result, args, context, info)
				}

				// clean connections
				if (cleanedResult && cleanedResult.edges) {
					for (let i = 0; i < cleanedResult.edges.length; i += 1) {
						const edge = cleanedResult.edges[i]

						const cleanResult = cleanModelByScope({
							model: edge.node,
							modelName,
							context,
							info
						})

						if (cleanResult === null) {
							return null
						}
					}
				}

				return cleanedResult
			}
		}

		const connection = createConnection(createConnectionOptions)
		const args = defaultListArgs()

		const opts = {
			type: connection.connectionType,
			args: {
				...args,
				...connection.connectionArgs
			},
			resolve: connection.resolve
		}

		return opts
	}

	function attributes(model, options) {
		if (!options) {
			options = {}
		}
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
		enhancedResolver,
		attributes,
		attributeFields,
		defaultArgs,
		buildConnection
	}
}
