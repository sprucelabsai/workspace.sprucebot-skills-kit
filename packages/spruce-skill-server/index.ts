/* eslint-disable @typescript-eslint/no-var-requires */

import Debug from 'debug'
import Koa from 'koa'
import next from 'next'
import Router from 'koa-router'
import cron from 'node-cron'
import _ from 'lodash'
import koaBody from 'koa-body'
// @ts-ignore
import logger from '@sprucelabs/log'
import defaultErrors from './support/errors'
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
import { Server } from 'https'
import Sprucebot from '@sprucelabs/spruce-node'
import { ISpruceContext } from './interfaces/ctx'
import HttpsMock from './tests/lib/HttpsMock'
// @ts-ignore
// import global from './interfaces/global'

const debug = Debug('spruce-skill-server')

interface IServeOptions {
	sprucebot: Sprucebot
	port: number
	serverHost: string
	interfaceHost: string
	nextConfig: next.ServerOptions
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
	metricsEnabled: string
	metricsRequestsDisabled: string
	metricsServerStatsDisabled: string
	metricsSequelizeDisabled: string
	gqlOptions: Record<string, any>
	testing?: boolean
}

export interface ISpruceServeSkill<ISkillContext> {
	koa: Koa<{}, ISkillContext>
	server: Server
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

	const isApiOnly = process.env.API_ONLY === 'true'

	if (isApiOnly) {
		debug('API_ONLY: Next.js frontend disabled')
	}

	// Setup NextJS App
	debug('Setting up Nextjs with', nextConfig)
	let app
	let handle: Function | undefined

	if (!isApiOnly) {
		app = next(nextConfig)
		handle = app.getRequestHandler()
	} else {
		console.warn('⚠️  The frontend UI is disabled because API_ONLY=true')
	}

	// Next app ready
	if (app) {
		await app.prepare()
	}

	const koa = new Koa<{}, ISkillContext>()
	koa.proxy = true

	// Set up global logger
	global.logger = logger
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
		const { mockResolvers, mockModels } = require('./tests/mocks/apiMocks')(
			koa.context
		)
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
		console.error(`Failed to sync your skill's settings`)
		console.error(e) // Server can't really start without sync settings
		process.exit(1)
	}

	// TODO: remove this when skills are updated to use the file upload service
	if (syncResponse.s3Bucket) {
		process.env.S3_BUCKET = syncResponse.s3Bucket
	}

	debug('Sync complete. Response: ', syncResponse)

	if (metricsEnabled) {
		log.info('Metrics: enabled')
	} else {
		log.info('Metrics: disabled')
	}

	if (metricsEnabled && !metricsRequestsDisabled) {
		// Log request stats
		koa.use(logger.middleware.requests())
	} else {
		log.info('Metrics: Request middleware disabled')
	}

	if (metricsEnabled && !metricsServerStatsDisabled) {
		// Log OS stats
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
			if (!util.utilVersion) {
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
		if (syncResponse.databaseUrl && sequelizeOptions) {
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
				if (!util.utilVersion) {
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
	const cronController = require(path.join(controllersDir, 'cron'))
	cronController({ ...koa.context, sb: sprucebot }, cron)
	debug('CronController running')

	/*======================================
        =         	Event Listeners       	   =
        ======================================*/
	let listenersByEventName
	try {
		listenersByEventName = listenersFactory(listenersDir)
		debug('Event listeners found for events', Object.keys(listenersByEventName))
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
			const errKey = allErrors[err.message] ? err.message : 'UNKNOWN'
			const errorResponse = {
				...allErrors[errKey],
				name: errKey
			}

			// anything in the error thrown that matches these
			// keys, lets set back to the error
			for (let key of ['code', 'friendlyReason']) {
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
		waresFactory(path.join(__dirname, 'middleware'), router, {
			listenersByEventName
		})

		debug('Core middleware loaded')

		// skills-kit
		waresFactory(middlewareDir, router, { listenersByEventName })

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
		routesFactory(path.join(__dirname, 'controllers'), router, {
			listenersByEventName
		})

		debug('Core controllers loaded')

		// skills-kit routes
		routesFactory(controllersDir, router, { listenersByEventName })

		debug('Kit controllers loaded')
	} catch (err) {
		console.error('Loading controllers failed.')
		console.error(err)
		throw err
	}

	/*======================================
        =          Client Side Routes          =
        ======================================*/

	// The logic before handle() is to suppress nextjs from responding and letting koa finish the request
	// This allows our middleware to fire even after
	if (!isApiOnly) {
		router.get('*', async ctx => {
			// if a controller already responded or we are making an API call, don't let next run at all
			if (ctx.body || ctx.path.search('/api') === 0) {
				debug('api call found, letting controllers handle it', ctx)
				return
			}
			debug('handing off to next and backing off', ctx.path, ctx)
			if (handle) {
				await handle(ctx.req, ctx.res)
			}
			ctx.respond = false
			return

			// this does not work as desired
			// ctx.body = await new Promise(resolve => {
			// 	const _end = ctx.res.end
			// 	ctx.res._end = _end

			// 	// Hijack stream to set ctx.body
			// 	const pipe = stream => {
			// 		ctx.res.end = _end
			// 		stream.unpipe(ctx.res)
			// 		resolve(stream)
			// 	}
			// 	ctx.res.once('pipe', pipe)

			// 	// Monkey patch res.end to set ctx.body
			// 	ctx.res.end = body => {
			// 		debug('Next has finished for', ctx.path)
			// 		ctx.res.end = _end
			// 		ctx.res.removeListener('pipe', pipe)
			// 		if (ctx.res.redirect) {
			// 			debug('Next wants us to redirect to', ctx.res.redirect)
			// 			body = `Redirecting to ${ctx.res.redirect}`
			// 			ctx.redirect(ctx.res.redirect)
			// 			ctx.res.end(body)
			// 			// return
			// 		}
			// 		resolve(body)
			// 	}

			// 	debug('Handing control off to nextjs ', ctx.path, '🤞🏼')
			// 	handle(ctx.req, ctx.res)
			// })
		})
	}

	// tell Koa to use the router
	koa.use(router.routes())

	/*======================================
        =              	Serve            	   =
        ======================================*/
	// TODO better handling hosting only server or interface
	// const server = https.createServer(koa.callback()).listen(port, () => {
	// 	gqlRouter(koa, gqlOptions, server)
	// 	gqlListeners(koa, gqlOptions)

	// 	console.log(
	// 		` 🌲  Skill launched at ${serverHost ? serverHost : interfaceHost}`
	// 	)
	// })
	const server = koa.listen(port, () => {
		gqlRouter(koa, gqlOptions, server)
		gqlListeners(koa, gqlOptions)

		console.log(
			` 🌲  Skill launched at ${serverHost ? serverHost : interfaceHost}`
		)
	})

	return { koa, server }
}

export default serve

// global interfaces
export { ISpruceModels } from './interfaces/models'
export { ISpruceServices } from './interfaces/services'
export { ISpruceUtilities } from './interfaces/utilities'
export { ISpruceContext } from './interfaces/ctx'

// errors
export { ISpruceErrorDefinitions } from './support/errors'

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
export {
	ISpruceBigSearchSection,
	ISpruceBigSearchResult,
	ISpruceBigSearchCtx,
	ISpruceImportBigSearchMatch,
	ISpruceImportBigSearchMatchGroup,
	ISpruceImportBigSearchResult,
	IImportFromBigSearchCtx
} from './interfaces/bigSearch'

// Settings
export {
	ISprucePageSettings,
	SpruceSettingsFieldType,
	ISpruceSettingsField,
	ISpruceSettingsSection
} from './interfaces/settings'

export {}

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

// Mock data for tests
export {
	IMockUser,
	IMockOrganization,
	IMockSkill,
	IMockLocation
} from './tests/mocks/SandboxMock'
