/* eslint-disable @typescript-eslint/no-var-requires */

import Debug from 'debug'
import Koa from 'koa'
import nextjs from 'next'
import Router from 'koa-router'
import cron from 'node-cron'
import _ from 'lodash'
import koaBody from 'koa-body'
// @ts-ignore
import logger from '@sprucelabs/log'
import defaultErrors from './config/errors'
import path from 'path'
import cors from '@koa/cors'
import staticServe from 'koa-static'
import contextFactory from './factories/context'
import routesFactory from './factories/routes'
import waresFactory from './factories/wares'
import listenersFactory from './factories/listeners'
import sequelizeFactory from './factories/sequelize'
import lang from './helpers/lang'
import gqlRouter from './gql/router'
import gqlListeners from './gql/listeners'
import { Server } from 'http'
import Sprucebot from '@sprucelabs/spruce-node'
import { ISpruceContext } from './interfaces/ctx'
import SharedTypesSyncer from './lib/SharedTypesSyncer'
import HttpsMock from './tests/lib/HttpsMock'
// TODO: Is there a better way we can declare globals without needing to import this?
// @ts-ignore: Need to import this definitions file for globals
import * as globalDefinitions from './interfaces/global' // eslint-disable-line

const debug = Debug('spruce-skill-server')

interface IServeOptions {
	sprucebot: Sprucebot
	port: number
	serverHost: string
	interfaceHost: string
	nextConfig: nextjs.ServerOptions
	errors: Record<string, any>
	servicesDir: string
	utilitiesDir: string
	controllersDir: string
	middlewareDir: string
	listenersDir: string
	sequelizeOptions?: {
		runMigrations: boolean
		modelsDir: string
		migrationsDir: string
		options: Record<string, any>
	}
	langDir: string
	staticDir?: string
	bodyParserOptions?: koaBody.IKoaBodyOptions
	slug: string
	logLevel: string
	logUseColors: boolean
	logUseTrace: boolean
	logUseSourcemaps: boolean
	logAsJSON: boolean
	env: string
	packageName: string
	packageVersion: string
	metricsAppKey: string
	metricsUrl: string
	metricsEnabled: boolean
	metricsRequestsDisabled: boolean
	metricsServerStatsDisabled: boolean
	metricsSequelizeDisabled: boolean
	gqlOptions: Record<string, any>
	testing?: boolean
}

export interface ISpruceServeSkill<ISkillContext> {
	koa: Koa<{}, ISkillContext>
	server: Server
}

function getServer(options: {
	koa: Koa<{}, any>
	port?: number
}): Promise<Server> {
	const { koa, port } = options
	return new Promise((resolve, reject) => {
		const server = koa.listen(port, () => {
			resolve(server)
		})
	})
}

async function serve<ISkillContext extends ISpruceContext>(
	options: IServeOptions
): Promise<ISpruceServeSkill<ISkillContext>> {
	const {
		sprucebot,
		port,
		serverHost,
		interfaceHost,
		nextConfig,
		errors = {},
		servicesDir,
		utilitiesDir,
		controllersDir,
		middlewareDir,
		listenersDir,
		sequelizeOptions,
		langDir,
		staticDir,
		bodyParserOptions = { jsonLimit: '1mb' },
		slug,
		logLevel = 'info',
		logUseColors = true,
		logUseTrace = false,
		logUseSourcemaps = false,
		logAsJSON = false,
		env = 'default',
		packageName,
		packageVersion,
		metricsAppKey,
		metricsUrl,
		metricsEnabled,
		metricsRequestsDisabled,
		metricsServerStatsDisabled,
		metricsSequelizeDisabled,
		gqlOptions,
		testing = false
	} = options

	debug('Starting server boot sequence with port', port)
	// you can override error messages
	const allErrors = { ...defaultErrors, ...errors }

	const koa = new Koa<{}, ISkillContext>()
	koa.proxy = true

	// Set up global logger
	// @ts-ignore
	global.logger = logger
	// @ts-ignore
	const log = logger.log
	log.setOptions({
		level: logLevel,
		useTrace: logUseTrace,
		useSourcemaps: logUseSourcemaps,
		useColors: logUseColors,
		asJSON: logAsJSON,
		appName: slug,
		appKey: metricsAppKey,
		appEnv: env,
		packageName,
		packageVersion,
		metricsUrl,
		metricsEnabled
	})
	global.log = log

	// Kick off sync with platform
	debug('Starting sync with core')

	if (testing) {
		const {
			mockResolvers,
			mockModels
		} = require('./tests/mocks/apiMocks').default(koa.context)
		const adapter = new HttpsMock({
			ctx: koa.context,
			mockResolvers,
			mockModels
		})

		sprucebot.setAdapter(adapter)
	}

	let syncResponse
	try {
		syncResponse = await sprucebot.sync()
	} catch (e) {
		if (e && e.response && e.response.status === 502) {
			debug(e)
			console.error(
				"Unable to connect to API. Ensure the API is running and you've set up your env variables properly."
			)
		} else {
			console.error(e) // Server can't really start without sync settings
			console.error(
				`Failed to sync your skill's settings. See the full error above.`
			)
		}
		process.exit(1)
	}

	try {
		await SharedTypesSyncer.syncEventTypes()
	} catch (e) {
		// If we get a 404 response from the API it means that the api version running doesn't support generating event types
		if (e.status && e.status === 404) {
			log.info('Event types not synced because the API does not support it.')
			debug(e)
		} else {
			// If it's a different error, log a warning
			log.warn('Failed to sync event types', e)
		}
	}

	// TODO: remove this when skills are updated to use the file upload service
	if (syncResponse && syncResponse.s3Bucket) {
		process.env.S3_BUCKET = syncResponse.s3Bucket
	}

	debug('Sync complete. Response: ', syncResponse)

	// Fetch latest types from api

	if (metricsEnabled) {
		log.info('Metrics: enabled')
	} else {
		log.info('Metrics: disabled')
	}

	if (metricsEnabled && !metricsRequestsDisabled) {
		// Log request stats
		// @ts-ignore
		koa.use(logger.middleware.requests())
	} else {
		log.info('Metrics: Request middleware disabled')
	}

	if (metricsEnabled && !metricsServerStatsDisabled) {
		// Log OS stats
		// @ts-ignore
		logger.nodeMetrics()
	} else {
		log.info('Metrics: Server stats disabled')
	}

	/*=======================================
	=             	BASICS   	            =
	=======================================*/
	koa.use(cors())
	koa.use(
		koaBody({
			multipart: true,
			...bodyParserOptions
		})
	)

	staticDir && koa.use(staticServe(staticDir))

	staticDir && koa.use(staticServe(nextConfig.dir + '/out'))

	const router = new Router()

	/*=======================================
	=        Utilities/Services/Lang        =
	=======================================*/
	try {
		// services for core
		contextFactory(path.join(__dirname, 'services'), 'services', koa.context)

		// services for skill
		contextFactory(servicesDir, 'services', koa.context)

		debug('Kit services loaded')

		// utilities for core
		contextFactory(path.join(__dirname, 'utilities'), 'utilities', koa.context)

		debug('Core utilities loaded')

		// utilities for skills-kit
		contextFactory(utilitiesDir, 'utilities', koa.context)

		// make lang available via utilities
		if (langDir) {
			debug('langDir detected at', langDir)
			lang.configure(langDir)
			koa.context.utilities.lang = lang
		} else {
			debug(
				'No landDir detected. ctx.utilities.lang.getText() will fail sever side'
			)
		}

		debug('Kit utilities loaded')

		// make sure services and utilities can access each other
		_.each(koa.context.services, service => {
			// Legacy support. New services that are class based don't need this
			if (!service.serviceVersion) {
				// @ts-ignore: legacy monky patch services
				service.services = koa.context.services
				// @ts-ignore: legacy monky patch utilities
				service.utilities = koa.context.utilities
				// @ts-ignore: legacy monky patch sb
				service.sb = sprucebot
			}
		})

		_.each(koa.context.utilities, util => {
			// Legacy support. New utilities that are class based don't need this
			// @ts-ignore
			if (!util.utilityVersion) {
				// @ts-ignore: legacy monky patch utilities
				util.utilities = koa.context.utilities
				// @ts-ignore: legacy monky patch services
				util.services = koa.context.services
				// @ts-ignore: legacy monky patch sb
				util.sb = sprucebot
			}
		})

		// Add sb to the app context
		koa.context.sb = sprucebot

		debug('Utilities and services can now reference each other')

		// orm if enabled
		if (syncResponse && syncResponse.databaseUrl && sequelizeOptions) {
			sequelizeFactory(
				{
					...sequelizeOptions,
					database: {
						dialect: 'postgres',
						url: syncResponse.databaseUrl
					},
					metricsEnabled,
					metricsSequelizeDisabled
				},
				'db',
				koa.context
			)
			debug('Kit sequelize enabled')

			// Connect and run migrations if enabled
			// @ts-ignore: hidden method from interface so skills dev's don't call it by accident
			await koa.context.db.sync()

			// Services and utils can access the orm (LEGACY, everything is accessed through this.ctx in utils/services now)
			_.each(koa.context.utilities, util => {
				// @ts-ignore
				if (!util.utilityVersion) {
					// @ts-ignore: legacy monky patch db onto utilities
					util.db = koa.context.db
				}
			})

			_.each(koa.context.services, service => {
				if (!service.serviceVersion) {
					// @ts-ignore: legacy monky patch db onto services
					service.db = koa.context.db
				}
			})

			debug('Utilities and services can now reference the orm')
		}
	} catch (err) {
		console.error('Loading services & utilities failed.')
		console.error(err)
		throw err
	}

	/*======================================
	=            	Cron	        	   =
	======================================*/
	// @ts-ignore: variable require for cron controller
	try {
		const cronController = require(path.join(controllersDir, 'cron'))
		cronController({ ...koa.context, sb: sprucebot }, cron)
		debug('CronController running')
	} catch (e) {
		debug('No cron detected')
	}

	/*======================================
	=         	Event Listeners       	   =
	======================================*/
	try {
		listenersFactory({
			ctx: koa.context,
			dir: listenersDir
		})
	} catch (err) {
		console.error('Loading event listeners failed.')
		console.error(err.stack || err)
	}

	/*=========================================
	=            	Middleware	              =
	=========================================*/
	koa.use(async (ctx, next) => {
		// make Sprucebot available
		ctx.sb = sprucebot
		await next()
	})

	// Error Handling
	koa.use(async (ctx, next) => {
		try {
			await next()
		} catch (err) {
			// @ts-ignore
			const errKey = allErrors[err.message] ? err.message : 'UNKNOWN'
			const errorResponse = {
				// @ts-ignore
				...allErrors[errKey],
				name: errKey
			}

			// anything in the error thrown that matches these
			// keys, lets set back to the error
			for (const key of ['code', 'friendlyReason']) {
				if (err[key]) {
					errorResponse[key] = err[key]
				}
			}

			errorResponse.path = ctx.path
			ctx.status = errorResponse.code
			ctx.body = errorResponse
			console.error(err.stack || err)
		}
	})

	/*======================================
	=         	Core/Kit Middleware.       =
	======================================*/
	try {
		// build-in
		waresFactory(path.join(__dirname, 'middleware'), router, {})

		debug('Core middleware loaded')

		// skills-kit
		waresFactory(middlewareDir, router, {})

		debug('Kit middleware loaded')
	} catch (err) {
		console.error('Failed to boot middleware', err)
	}

	// Response headers
	koa.use(async (ctx, next) => {
		const date = Date.now()
		await next()
		const ms = Date.now() - date

		// On a redirect, headers have already been sent
		if (!ctx.res.headersSent) {
			ctx.set('X-Response-Time', `${ms}ms`)
			debug('x-headers set at end of response', ctx.path)
		} else {
			debug('x-headers ignored since headers have already been sent', ctx.path)
		}
	})

	// Response Code Handling
	koa.use(async (ctx, next) => {
		// default response code
		ctx.res.statusCode = 200
		await next()

		// If this is an API call with no body (no controller answered), respond with a 404 and a json body
		if (ctx.path.search('/api') === 0 && !ctx.body) {
			ctx.throw('ROUTE_NOT_FOUND')
			debug('404 hit on', ctx.path)
		}
	})

	/*======================================
	=          Server Side Routes          =
	======================================*/
	try {
		// built-in routes
		routesFactory(path.join(__dirname, 'controllers'), router, {})

		debug('Core controllers loaded')

		// skills-kit routes
		routesFactory(controllersDir, router, {})

		debug('Kit controllers loaded')
	} catch (err) {
		console.error('Loading controllers failed.')
		console.error(err)
		throw err
	}

	// tell Koa to use the router
	koa.use(router.routes())

	/*======================================
        =              	Serve            	   =
        ======================================*/
	// TODO better handling hosting only server or interface
	// const server = koa.listen(port, () => {
	// 	// @ts-ignore
	// 	gqlRouter(koa, gqlOptions, server)
	// 	gqlListeners(koa as any, gqlOptions)

	// 	console.clear()
	// 	console.log(
	// 		` 🌲  Skill launched (Port ${(server.address() as AddressInfo).port})`
	// 	)
	// })

	const server = await getServer({ koa, port })
	// @ts-ignore
	gqlRouter(koa, gqlOptions, server)
	gqlListeners(koa as any, gqlOptions)

	console.clear()
	console.log(
		` 🌲  Skill launched (Port ${(server.address() as AddressInfo).port})`
	)

	// @ts-ignore
	return { koa, server }
}

export default serve

// global interfaces
export { ISpruceModels } from './interfaces/models'
export { ISpruceServices } from './interfaces/services'
export { ISpruceUtilities } from './interfaces/utilities'
export { ISpruceContext } from './interfaces/ctx'

// errors
export { ISpruceErrors } from './interfaces/errors'
export { default as SpruceErrors } from './config/errors'

// Auth
export {
	ISpruceAuth,
	ISpruceAuthJob,
	ISpruceAuthGroup,
	ISpruceAuthUserLocation,
	ISpruceAuthOrganization,
	ISpruceAuthLocation,
	ISpruceAuthUser
} from './interfaces/auth'

// Big Search
export * from './interfaces/bigSearch'

// Base classes
export { default as SpruceSkillService } from './lib/SpruceSkillService'
export { default as SpruceSkillUtility } from './lib/SpruceSkillUtility'
export { default as SpruceCoreModel } from './lib/SpruceModel'
export { default as SpruceTest } from './tests/lib/SpruceTest'

// Export Models
export { FileItem } from './models/FileItem'
export { Group } from './models/Group'
export { Job } from './models/Job'
export { Location } from './models/Location'
export { LocationGroup } from './models/LocationGroup'
export { Organization } from './models/Organization'
export { Skill } from './models/Skill'
export { User } from './models/User'
export { UserGroup } from './models/UserGroup'
export { UserLocation } from './models/UserLocation'
export { UserOrganization } from './models/UserOrganization'
export { Metadata } from './models/Metadata'
import defaultConfig from './config/default'
import { AddressInfo } from 'ws'
export { defaultConfig as SpruceConfig }

// Mock data for tests
export {
	IMockUser,
	IMockOrganization,
	IMockSkill,
	IMockLocation
} from './tests/mocks/SandboxMock'

export {
	ISpruceGQLTypes,
	IGQLTypeResolver,
	IGQLResolvers,
	IGQLResolver
} from './interfaces/gql'

export { IBuildSequelizeResolver } from './gql/helpers'
export { ISpruceAcls } from './interfaces/acls'
