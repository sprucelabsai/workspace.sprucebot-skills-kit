const parseFields = require('graphql-parse-fields')
// Sequelize uses the inflection library for it's naming
const inflection = require('inflection')
const {
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLObjectType
} = require('graphql')

const {
	resolver,
	attributeFields,
	defaultListArgs,
	defaultArgs
} = require('graphql-sequelize')

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
	return scope
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

	Object.keys(attrFields).forEach(field => {
		attrFields[field].resolve = (obj, args, context, info) => {
			if (!context.warnings) {
				context.warnings = []
			}
			const fullPathScope = pathToScope(info.path)
			const pathScope = fullPathScope.replace(/\.[^.]+$/, '')
			const rootPath = fullPathScope.replace(/\..*$/, '')
			const scopes = context.scopes[rootPath]
			let scope = 'public'

			const pluralModelName = inflection.pluralize(model.name)
			if (scopes && scopes[model.name]) {
				scope = scopes[model.name]
			} else if (scopes && scopes[pluralModelName]) {
				scope = scopes[pluralModelName]
			} else if (scopes && scopes[pathScope]) {
				scope = scopes[pathScope]
			}
			if (model.scopeObj[scope] && model.scopeObj[scope][field]) {
				return obj[field]
			}

			context.warnings.push(`Field Not Authorized: ${model.name}.${field}`)
			if (context.unauthorizedValue) {
				return context.unauthorizedValue
			}
			return null
		}
	})

	return attrFields
}

module.exports = ctx => {
	const methods = {
		defaultArgs: function defaultArgs() {
			return {
				unauthorizedValue: {
					description:
						'The (string) value to use for fields that are not allowed. Default=null',
					type: GraphQLString
				}
			}
		},
		defaultBefore: function defaultBefore(findOptions, args, context, info) {
			context.warnings = []
			if (args.unauthorizedValue) {
				context.unauthorizedValue = args.unauthorizedValue
			}
		},
		association: function association({ model, type, complexity }) {
			if (!model) {
				log.warn('No model supplied')
				return
			}
			const modelName = model.as
			return {
				complexity: complexity || 100,
				type,
				args: defaultArgs(model),
				resolve: async (obj, args, context, info) => {
					if (!context.warnings) {
						context.warnings = []
					}

					const pathScope = pathToScope(info.path)
					const rootPath = pathScope.replace(/\..*$/, '')
					const scopes = context.scopes[rootPath]
					const parentPathScope = pathScope.replace(/\.[^.]+$/, '')
					let parentScope = 'public'
					const parentModelName = obj.constructor.name
					const pluralParentModelName = inflection.pluralize(parentModelName)
					if (scopes && scopes[parentPathScope]) {
						parentScope = scopes[parentPathScope]
					}

					if (
						!ctx.db.models[parentModelName].scopeObj ||
						!ctx.db.models[parentModelName].scopeObj[parentScope] ||
						!ctx.db.models[parentModelName].scopeObj[parentScope][modelName]
					) {
						context.warnings.push(
							`Association for ${parentModelName} with scope '${parentScope}' does not include '${modelName}'`
						)
						return null
					}

					const requestedFields = parseFields(info)
					let scope = 'public'
					if (scopes && scopes[pathScope]) {
						scope = scopes[pathScope]
					} else {
						context.warnings.push(`Model Not Authorized: ${pathScope}`)
						return null
					}

					const result = await resolver(model, {
						before: async (findOptions, args, context, info) => {
							if (!findOptions.where) {
								findOptions.where = {}
							}
							if (
								context.findOptions &&
								context.findOptions[rootPath] &&
								context.findOptions[rootPath][pathScope]
							) {
								findOptions.where = {
									...findOptions.where,
									...context.findOptions[rootPath][pathScope]
								}
							}
							return findOptions
						}
					})(obj, args, context, info, pathScope)
					if (result && result.dataValues) {
						const modelName = result.constructor.name
						Object.keys(result.dataValues).forEach(field => {
							if (
								!ctx.db.models[modelName].scopeObj[scope] ||
								!ctx.db.models[modelName].scopeObj[scope][field]
							) {
								if (requestedFields[field]) {
									context.warnings.push(
										`Field Not Authorized: ${modelName}.${field}`
									)
								}
								if (context.unauthorizedValue) {
									result.setDataValue(field, context.unauthorizedValue)
								} else {
									result.setDataValue(field, null)
								}
							}
						})
					}

					return result
				}
			}
		},

		associationList: function associationList({ model, type, complexity }) {
			const modelName = model.target.name
			return {
				complexity: complexity || 100,
				type: new GraphQLList(type),
				args: defaultListArgs(model),
				resolve: async (obj, args, context, info) => {
					if (!context.warnings) {
						context.warnings = []
					}

					const pluralModelName = inflection.pluralize(modelName)
					const pathScope = pathToScope(info.path)

					let parentScope = 'public'

					const parentModelName = obj.constructor.name
					const pluralParentModelName = inflection.pluralize(parentModelName)

					const rootPath = pathScope.replace(/\..*$/, '')
					const scopes = context.scopes[rootPath]
					const parentPathScope = pathScope.replace(/\.[^.]+$/, '')
					if (scopes && scopes[parentPathScope]) {
						parentScope = scopes[parentPathScope]
					}

					if (
						!ctx.db.models[parentModelName] ||
						!ctx.db.models[parentModelName].scopeObj ||
						!ctx.db.models[parentModelName].scopeObj[parentScope] ||
						!ctx.db.models[parentModelName].scopeObj[parentScope][
							pluralModelName
						]
					) {
						context.warnings.push(
							`Association for ${parentModelName} with scope '${parentScope}' does not include '${pluralModelName}'`
						)
						return null
					}

					const requestedFields = parseFields(info)
					let scope = 'public'
					if (scopes && scopes[pathScope]) {
						scope = scopes[pathScope]
					} else {
						context.warnings.push(`Model Not Authorized: ${pathScope}`)
						return null
					}

					const result = await resolver(model, {
						before: async (findOptions, args, context, info) => {
							if (!findOptions.where) {
								findOptions.where = {}
							}
							if (
								context.findOptions &&
								context.findOptions[rootPath] &&
								context.findOptions[rootPath][pathScope]
							) {
								findOptions.where = {
									...findOptions.where,
									...context.findOptions[rootPath][pathScope]
								}
							}
							return findOptions
						}
					})(obj, args, context, info)
					if (result && Array.isArray(result)) {
						result.forEach(r => {
							const modelName = r.constructor.name
							Object.keys(r.dataValues).forEach(field => {
								const s = ctx.db.models[modelName].scopeObj[scope]
								if (
									!ctx.db.models[modelName].scopeObj[scope] ||
									!ctx.db.models[modelName].scopeObj[scope][field]
								) {
									if (requestedFields[field]) {
										context.warnings.push(
											`Field Not Authorized: ${modelName}.${field}`
										)
									}
									if (context.unauthorizedValue) {
										r.setDataValue(field, context.unauthorizedValue)
									} else {
										r.setDataValue(field, null)
									}
								}
							})
						})
					}
					return result
				}
			}
		},

		attributes: function attributes(model, options) {
			const attrs = {
				...enhancedAttributeFields(model, options)
			}

			Object.keys(model.associations).forEach(associationName => {
				const modelAssociation = model.associations[associationName]
				const associationFunc =
					modelAssociation.associationType === 'BelongsTo'
						? methods.association
						: methods.associationList
				if (ctx.gql.types[modelAssociation.target.name]) {
					attrs[modelAssociation.as] = associationFunc({
						model: modelAssociation,
						type: ctx.gql.types[modelAssociation.target.name]
					})
				} else {
					log.warn(
						`Unable to create GQL association for ${model.name} -> ${
							modelAssociation.target.name
						}. Check that a GQL type is defined for ${
							modelAssociation.target.name
						}`
					)
				}
			})

			return attrs
		}
	}

	return methods
}
