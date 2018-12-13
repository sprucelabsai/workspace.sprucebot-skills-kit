// @flow
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
	return scope
}

function enhancedAttributeFields(model: any, options?: Object) {
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
			const pluralModelName = inflection.pluralize(model.modelName)
			if (scopes && scopes[model.modelName]) {
				scope = scopes[model.modelName]
			} else if (scopes && scopes[pluralModelName]) {
				scope = scopes[pluralModelName]
			} else if (scopes && scopes[pathScope]) {
				scope = scopes[pathScope]
			}
			if (model.scopeObj[scope] && model.scopeObj[scope][field]) {
				return obj[field]
			}

			context.warnings.push(`Field Not Authorized: ${model.modelName}.${field}`)
			if (context.unauthorizedValue) {
				return context.unauthorizedValue
			}
			return null
		}
	})

	return attrFields
}

function association({
	model,
	type,
	complexity
}: {
	model: any,
	type: GraphQLObjectType,
	complexity?: number
}) {
	if (!model) {
		log.warn('No model supplied')
		return
	}
	const modelName = model.as
	return {
		complexity: complexity || 100,
		type,
		args: defaultArgs(model),
		resolve: async (
			obj: Object,
			args: Object,
			context: Object,
			info: Object
		) => {
			if (!context.warnings) {
				context.warnings = []
			}

			const pathScope = pathToScope(info.path)
			const rootPath = pathScope.replace(/\..*$/, '')
			const scopes = context.scopes[rootPath]
			const parentPathScope = pathScope.replace(/\.[^.]+$/, '')
			let parentScope = 'public'
			const pluralParentModelName = inflection.pluralize(obj.modelName)
			if (scopes && scopes[parentPathScope]) {
				parentScope = scopes[parentPathScope]
			}

			if (
				!orm.models[obj.modelName].scopeObj ||
				!orm.models[obj.modelName].scopeObj[parentScope] ||
				!orm.models[obj.modelName].scopeObj[parentScope][modelName]
			) {
				context.warnings.push(
					`Association for ${
						obj.modelName
					} with scope '${parentScope}' does not include '${modelName}'`
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
					if (context.findOptions && context.findOptions[pathScope]) {
						findOptions.where = {
							...findOptions.where,
							...context.findOptions[pathScope]
						}
					}
					return findOptions
				}
			})(obj, args, context, info, pathScope)
			if (result && result.dataValues) {
				Object.keys(result.dataValues).forEach(field => {
					if (
						!orm.models[result.modelName].scopeObj[scope] ||
						!orm.models[result.modelName].scopeObj[scope][field]
					) {
						if (requestedFields[field]) {
							context.warnings.push(
								`Field Not Authorized: ${result.modelName}.${field}`
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
}

function associationList({
	model,
	type,
	complexity
}: {
	model: any,
	type: GraphQLObjectType,
	complexity?: number
}) {
	const modelName = model.target.modelName
	return {
		complexity: complexity || 100,
		type: new GraphQLList(type),
		args: defaultListArgs(model),
		resolve: async (obj: any, args: Object, context: Object, info: Object) => {
			if (!context.warnings) {
				context.warnings = []
			}
			const pluralModelName = inflection.pluralize(modelName)
			const pathScope = pathToScope(info.path)

			let parentScope = 'public'
			const pluralParentModelName = inflection.pluralize(obj.modelName)

			const rootPath = pathScope.replace(/\..*$/, '')
			const scopes = context.scopes[rootPath]
			const parentPathScope = pathScope.replace(/\.[^.]+$/, '')
			if (scopes && scopes[parentPathScope]) {
				parentScope = scopes[parentPathScope]
			}

			if (
				!orm.models[obj.modelName].scopeObj ||
				!orm.models[obj.modelName].scopeObj[parentScope] ||
				!orm.models[obj.modelName].scopeObj[parentScope][pluralModelName]
			) {
				context.warnings.push(
					`Association for ${
						obj.modelName
					} with scope '${parentScope}' does not include '${pluralModelName}'`
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
					if (context.findOptions && context.findOptions[pathScope]) {
						findOptions.where = {
							...findOptions.where,
							...context.findOptions[pathScope]
						}
					}
					return findOptions
				}
			})(obj, args, context, info)
			if (result && Array.isArray(result)) {
				result.forEach(r => {
					Object.keys(r.dataValues).forEach(field => {
						// if (!orm.models[r.modelName].scopeObj[scope] || !orm.models[r.modelName].scopeObj[scope][field]) {
						const s = orm.models[r.modelName].scopeObj[scope]
						if (
							!orm.models[r.modelName].scopeObj[scope] ||
							!orm.models[r.modelName].scopeObj[scope][field]
						) {
							if (requestedFields[field]) {
								context.warnings.push(
									`Field Not Authorized: ${r.modelName}.${field}`
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
}

function attributes(model: any, options?: Object) {
	const attrs = {
		...enhancedAttributeFields(model, options)
	}

	Object.keys(model.associations).forEach(associationName => {
		const modelAssociation = model.associations[associationName]
		const associationFunc =
			modelAssociation.associationType === 'BelongsTo'
				? association
				: associationList
		attrs[modelAssociation.as] = associationFunc({
			model: modelAssociation,
			type: orm.types[modelAssociation.target.modelName]
		})
	})

	return attrs
}

module.exports.attributes = attributes
module.exports.attributeFields = enhancedAttributeFields
module.exports.association = association
module.exports.associationList = associationList

module.exports.defaultArgs = () => {
	return {
		unauthorizedValue: {
			description:
				'The (string) value to use for fields that are not allowed. Default=null',
			type: GraphQLString
		}
	}
}

module.exports.defaultBefore = (
	findOptions: Object,
	args: Object,
	context: Object,
	info: Object
) => {
	context.warnings = []
	if (args.unauthorizedValue) {
		context.unauthorizedValue = args.unauthorizedValue
	}
}
