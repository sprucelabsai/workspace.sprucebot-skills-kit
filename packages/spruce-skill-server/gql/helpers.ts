import { ISpruceContext } from '../interfaces/ctx'

// @ts-ignore: No definition available
import parseFields from 'graphql-parse-fields'

import { GraphQLInt, GraphQLResolveInfo, GraphQLObjectType } from 'graphql'
import {
	resolver,
	attributeFields,
	createConnection,
	createConnectionResolver,
	defaultListArgs,
	defaultArgs,
	argsToFindOptions,
	IResolverLikeFunction
} from 'graphql-sequelize'

import globby from 'globby'
import config from 'config'

import { has } from 'lodash'
import SpruceCoreModel from '../lib/SpruceModel'
import { FindOptions } from 'sequelize/types'
import { IGQLResolver } from '../interfaces/gql'

type SpruceCoreModelType = typeof SpruceCoreModel

export interface IBuildSequelizeResolver {
	(options: {
		modelName: string
		associationName?: string
		many?: boolean
		options?: Record<string, any>
		before?: (
			findOptions: FindOptions,
			args: Record<string, any>,
			context: ISpruceContext,
			info: GraphQLResolveInfo
		) => FindOptions | Promise<FindOptions>
		after?: (
			result: Record<string, any>,
			args: Record<string, any>,
			context: ISpruceContext,
			info: GraphQLResolveInfo
		) => Record<string, any> | null
	}): IGQLResolver
}

export interface ISpruceGQLHelpers {
	// Single resolver for all sequelize needs
	buildSequelizeResolver: IBuildSequelizeResolver

	// lock out fields based on scopes, keep private data private!
	cleanModelByScope(options: {
		model: SpruceCoreModel<any>
		context: ISpruceContext
		info: GraphQLResolveInfo
	}): Record<string, any> | null

	attributes(model: SpruceCoreModelType, options?: Record<string, any>): any

	enhancedResolver(
		/** The model. For example ctx.db.models.User */
		model: SpruceCoreModelType,
		options?: Record<string, any>,
		scope?: string
	): IResolverLikeFunction<any, any>

	buildConnection(options: {
		/** Name your connection. This must be unique */
		name?: string
		/** The model you're connecting. For example ctx.db.models.User */
		model: SpruceCoreModelType
		associationName: string
		type: GraphQLObjectType
		connectionOptions: {
			before?: (
				findOptions: FindOptions,
				args: Record<string, any>,
				context: any
			) => Promise<FindOptions>
			// TODO: Define after
			// after?: (
			// 	findOptions: FindOptions,
			// 	args: Record<string, any>,
			// 	context: any
			// ) => Promise<FindOptions>
		}
	}): any
}

export default (ctx: ISpruceContext) => {
	// Get any custom connectionOptions and save for later when we're building connections
	const connectionPaths = globby.sync([
		`${config.gqlOptions.gqlDir}/connections/**/!(index|types|_helpers).js`
	])
	const connections: Record<string, any> = {}

	connectionPaths.forEach(path => {
		try {
			log.debug(`Importing custom connection options from file: ${path}`)
			// $FlowIgnore
			const connectionOptions = require(path)(ctx) // eslint-disable-line
			let name = path.replace(/^(.*[\\/])/, '')
			name = name.replace('.js', '')
			connections[name] = connectionOptions
		} catch (e) {
			log.warn(`Unable to import GraphQL connectionOptions from ${path}`, e)
		}
	})

	function pathToScope(path: Record<string, any>, prevPath?: string): string {
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

	function cleanModelByScope(options: {
		model: SpruceCoreModel<any> | Record<string, any>
		modelName?: string
		context: ISpruceContext
		info: GraphQLResolveInfo
	}): Record<string, any> | null {
		const { model, context, info, modelName: passedModelName } = options
		const modelName: string = passedModelName || model.constructor.name

		// skip the process if we have already done the work
		// @ts-ignore
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
		} else if (has(scopes, `${pathScope}.${modelName}`)) {
			modelScope = scopes[`${pathScope}.${modelName}`]
		} else {
			const msg = `${modelName} does not contain the scope "${modelScope}" from ${pathScope}. If this should be allowed, check the config/scopes.js file.`
			context.warnings.push(msg)
			return null
		}

		context.scopeInfo.push(
			`Scoping ${modelName} through ${parentPathScope} using ${pathScope} with scope of ${modelScope}`
		)

		// @ts-ignore
		const scopeObj = ctx.db.models[modelName].scopeObj
		const allowedAttributes = scopeObj[modelScope]

		// could be a sequelize model or an plain object
		// @ts-ignore
		const values = model.dataValues || model

		// @ts-ignore
		Object.keys(values).forEach(field => {
			const allowedField = has(allowedAttributes, field)
			const requestedField = requestedFields[field]
			const willSkipField = ['warnings', 'totalCount'].includes(field)

			if (!allowedField && requestedField && !willSkipField) {
				context.attributeWarnings.push(
					`${modelName} scope of "${modelScope}" does not include the field "${field}". If this should be allowed, check the scopes in models/${modelName}.js`
				)

				if (model.setDataValue) {
					model.setDataValue(field, null)
				}
				// @ts-ignore
				model[field] = null

				// @ts-ignore
				if (model.getDataValue) {
					let warnings = model.getDataValue('warnings')
					if (!warnings) {
						// @ts-ignore
						model.setDataValue('warnings', { scopes: [] })
					}
					// @ts-ignore
					warnings = model.getDataValue('warnings')

					// @ts-ignore
					warnings.scopes.push({ field })
					// @ts-ignore
					model.setDataValue('warnings', warnings)
					// @ts-ignore
					model.warnings = warnings
				}
			}
		})

		// @ts-ignore
		if (!model.cleanedScope) {
			// @ts-ignore
			model.cleanedScope = true
		}

		return model
	}

	function enhancedResolver(
		model: SpruceCoreModelType,
		options?: Record<string, any>,
		scope?: string
	): IResolverLikeFunction<any, any> {
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

		//@ts-ignore TODO figure out why this property is set on Sequelize model classes but TS does not know
		const name = model.name

		return resolver<any, any>(model, {
			...options,
			before: async (
				beforeOptions: Record<string, any>,
				args: any,
				context: ISpruceContext,
				info: GraphQLResolveInfo
			) => {
				let updatedOptions = beforeOptions

				if (!updatedOptions.where) {
					updatedOptions.where = {}
				}

				if (args) {
					updatedOptions = {
						...updatedOptions,
						// @ts-ignore
						...argsToFindOptions.default(args, [])
					}
				}

				let finalOptions = updatedOptions
				if (before) {
					finalOptions = await before(updatedOptions, args, context, info)
				}
				return finalOptions
			},
			after: (
				result: any,
				args: any,
				context: ISpruceContext,
				info: GraphQLResolveInfo
			) => {
				let cleanedResult = result
				if (after) {
					cleanedResult = after(result, args, context, info)
				}

				// clean for GraphQLObject
				if (cleanedResult && !Array.isArray(cleanedResult)) {
					cleanedResult = cleanModelByScope({
						modelName: name,
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
							modelName: name,
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

	function enhancedAttributeFields(
		model: SpruceCoreModel<any>,
		options?: Record<string, any>
	): any {
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

	function buildConnection(options: Record<string, any>): any {
		const { model, type, associationName } = options
		let connectionOptions = options.connectionOptions
		let name = options.name || model.name
		const modelName = name
		let target = model

		if (model.associations[associationName]) {
			name = `${model.name}${
				model.associations[associationName].associationType
			}${associationName}`
			target = model.associations[associationName]
		}

		if (!connectionOptions) {
			connectionOptions = {}
		}

		const customConnectionOptions = connections[name] || {}

		connectionOptions = {
			...connectionOptions,
			...customConnectionOptions
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
					resolve(connection: any) {
						const fullCount = connection.fullCount || null
						return fullCount
					}
				},
				...connectionFields
			}),
			edgeFields,
			orderBy,
			before: async (
				beforeOptions: any,
				args: any,
				context: any,
				info: any
			) => {
				const pathScope = pathToScope(info.path)
				const rootPath = pathScope.replace(/\..*$/, '')

				let updatedOptions = beforeOptions

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
						// @ts-ignore
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
			after: (result: any, args: any, context: any, info: any) => {
				let cleanedResult = result
				if (after) {
					cleanedResult = after(result, args, context, info)
				}

				// clean connections
				if (cleanedResult && cleanedResult.edges) {
					for (let i = 0; i < cleanedResult.edges.length; i += 1) {
						const edge = cleanedResult.edges[i]

						const constructorName =
							edge.node.constructor && edge.node.constructor.name
						const modelNameForCleaning = has(ctx.gql.types, constructorName)
							? constructorName
							: modelName

						const cleanResult = cleanModelByScope({
							modelName: modelNameForCleaning,
							model: edge.node,
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

		const connection = type
			? createConnection(createConnectionOptions)
			: createConnectionResolver(createConnectionOptions)

		const args = defaultListArgs()

		const opts = {
			type: connection.connectionType,
			args: {
				...args,
				...connection.connectionArgs
			},
			resolve: type ? connection.resolve : connection.resolveConnection
		}

		return opts
	}

	const buildSequelizeResolver: IBuildSequelizeResolver = (options): any => {
		const {
			modelName,
			many,
			associationName,
			options: connectionOptions,
			before,
			after
		} = options

		// @ts-ignore
		const model = ctx.db.models[modelName] as typeof SpruceCoreModel | null

		// @ts-ignore
		const type = ctx.gql.types[modelName]

		if (!model) {
			throw new Error(`No sequelize model named ${options.modelName} exists.`)
		}

		let resolver: (
			source: Record<string, any>,
			args: Record<string, any>,
			context: Request,
			info: GraphQLResolveInfo
		) => Promise<any> | undefined

		if (many) {
			const connection = buildConnection({
				model,
				type,
				associationName: associationName || modelName,
				connectionOptions: {
					...(connectionOptions || {}),
					before,
					after
				}
			})

			resolver = connection.resolve.bind(connection)
		} else {
			resolver = enhancedResolver(model, {
				before,
				after
			})
		}

		return resolver
	}

	function attributes(model: any, options: Record<string, any>): any {
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
			// @ts-ignore
			const type = ctx.gql.types[modelAssociation.target.name]

			if (!type) {
				// TODO find way to relate to models defined in SDL
				log.warn(
					`No GraphQL type exists for ${
						modelAssociation.target.name
					}. Please create one.`
				)
				return true
			}

			// create a 1to1 relationship with BelongsTo
			if (modelAssociation.associationType === 'BelongsTo') {
				attrs[associationName] = {
					type,
					args: defaultArgs(modelAssociation),
					resolve: enhancedResolver(modelAssociation)
				}
			} else {
				// const customConnectionOptions = connections[associationName] || {}
				// build the relay connection for all other types
				attrs[associationName] = buildConnection({
					model,
					type,
					associationName,
					connectionOptions: {
						...options
						// ...customConnectionOptions
					}
				})
			}

			return true
		})

		return attrs
	}
	return {
		enhancedResolver,
		attributes,
		attributeFields,
		defaultArgs,
		buildConnection,
		buildSequelizeResolver,
		cleanModelByScope
	}
}
