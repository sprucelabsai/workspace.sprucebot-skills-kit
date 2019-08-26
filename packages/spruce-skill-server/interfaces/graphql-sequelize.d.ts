/* eslint-disable @typescript-eslint/interface-name-prefix */
declare module 'graphql-sequelize' {
	import {
		GraphQLEnumType,
		GraphQLFieldConfig,
		GraphQLFieldConfigMap,
		GraphQLFieldResolver,
		GraphQLInterfaceType,
		GraphQLResolveInfo,
		GraphQLScalarType,
		GraphQLType
	} from 'graphql'
	import * as Sequelize from 'sequelize'

	export type IBeforeFn<TContext, TArgs> = <T>(
		options: T,
		args: TArgs,
		context: TContext,
		info: GraphQLResolveInfo
	) => T
	export type IAfterFn<TContext, TArgs> = <T>(
		result: T,
		args: TArgs,
		context: TContext,
		info: GraphQLResolveInfo
	) => T

	interface IMapType {
		[k: string]: string
	}

	export interface IAttributeOptions<TInstance, TAttributes> {
		allowNull: boolean // disable wrapping mandatory fields in `GraphQLNonNull` - default: false
		cache: {} // Cache enum types to prevent duplicate type name error - default: {}
		commentToDescription: boolean // convert model comment to GraphQL description - default: false
		exclude: (keyof TAttributes)[] // array of model attributes to ignore - default: []
		globalId: boolean // return an relay global id field - default: false
		map:
			| ((k: string) => string)
			| {
					[k: string]: string
			  } // rename fields - default: {}
		only: (keyof TAttributes)[] // only generate definitions for these model attributes - default: null
	}

	export interface IResolverOptions<TContext, TArgs> {
		after: IAfterFn<TContext, TArgs>
		before: IBeforeFn<TContext, TArgs>
		handleConnection: boolean
	}

	// export type IResolverLikeFunction<TContext, TArgs> = <TInstance, TAttributes>(
	// 	model: Sequelize.Model<TInstance, TAttributes>,
	// 	options?: Partial<IResolverOptions<TContext, TArgs>>
	// ) => any
	export type IResolverLikeFunction<TContext, TArgs> = <TInstance, TAttributes>(
		options: any,
		args: TArgs,
		context?: TContext,
		info?: GraphQLResolveInfo
	) => any

	// https://github.com/mickhansen/graphql-sequelize#field-helpers
	const attributeFields: <TInstance, TAttributes>(
		model: Sequelize.Model<TInstance, TAttributes>,
		options?: Partial<IAttributeOptions<TInstance, TAttributes>>
	) => any
	const resolver: IResolverLikeFunction<any, any>

	const defaultArgs: <TInstance, TAttributes>(
		model: Sequelize.Model<TInstance, TAttributes>
	) => any
	const defaultListArgs: () => any

	const argsToFindOptions: (options: any) => any
	const createConnection: (options: any) => any

	class NodeTypeMapper {
		public map: any
		public item(type: any): any // TODO: add typings
		public mapTypes(types: any): any // TODO: add typings
	}

	// see https://github.com/Microsoft/TypeScript/issues/4890
	// and https://github.com/Microsoft/TypeScript/pull/13604
	type Constructor<T> = new () => T

	export interface ISequelizeConnectionOptions<
		TInstance,
		TAttributes,
		TContext,
		TArgs
	> {
		after: IAfterFn<TContext, TArgs>
		before: IBeforeFn<TContext, TArgs>
		connectionFields: GraphQLFieldConfigMap<any, TContext>
		edgeFields: GraphQLFieldConfigMap<any, TContext>
		name: string
		nodeType: GraphQLType
		orderBy: GraphQLEnumType
		target: Sequelize.Model<TInstance, TAttributes> | void // unfortuately, associations return is defined as void in sequelize typings
		where: <V>(
			key: string,
			value: V,
			previousWhere: any
		) => {
			// previousWhere added in graphql-sequelize@v5.1.0
			[key: string]: V
		}
	}

	export interface ISequelizeConnectionReturn {
		connectionArgs: any
		connectionType: any
		edgeType: GraphQLType
		nodeType: GraphQLType
		resolve: GraphQLFieldResolver<any, any>
		resolveEdge: GraphQLFieldResolver<any, any>
	}

	// @ts-ignore
	export interface RelaySequelizeNodeInterfaceConfig {
		nodeField: GraphQLFieldConfig<any, any>
		nodeInterface: GraphQLInterfaceType
		nodeTypeMapper: NodeTypeMapper
	}

	const relay: {
		handleConnection: (values: any, args: any) => any
		idFetcher: (
			sequelize: Sequelize.Sequelize,
			nodeTypeMapper: NodeTypeMapper
		) => any
		isConnection: (type: any) => boolean
		nodeType: (connectionType: any) => any
		NodeTypeMapper: Constructor<NodeTypeMapper>
		sequelizeConnection: <TInstance, TAttributes, TContext, TArgs>(
			options: Partial<
				ISequelizeConnectionOptions<TInstance, TAttributes, TContext, TArgs>
			>
		) => ISequelizeConnectionReturn
		sequelizeNodeInterface: (
			sequelize: Sequelize.Sequelize
		) => RelaySequelizeNodeInterfaceConfig
		typeResolver: (nodeTypeMapper: NodeTypeMapper) => any
	}

	const typeMapper: {
		// TODO exchange type:any with Sequelize.DataTypeAbstract?
		mapType(mapFunc: any): boolean | GraphQLType
		toGraphQL(
			sequelizeType: any,
			sequelizeTypes: Constructor<Sequelize.Sequelize>
		): any
	}

	const JSONType: {
		default: GraphQLScalarType
	}

	const DateType: {
		default: GraphQLScalarType
	}

	const simplifyAST: (ast: any, info: any, parent: any) => any
}
