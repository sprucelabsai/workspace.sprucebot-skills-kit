const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const cron = require('node-cron')

// Main Sprucebot Module
const Sprucebot = require('sprucebot-node')

const {
	API_KEY,
	API_HOST,
	SKILL_ID,
	SKILL_NAME,
	SKILL_ICON,
	SKILL_DESCRIPTION,
	SKILL_SERVER_HOST,
	SKILL_SERVER_PORT,
	SKILL_INTERFACE_HOST,
	SKILL_INTERFACE_PORT,
	nextConfig
} = require('config')

// Setup NextJS App
const app = next(nextConfig)
const handle = app.getRequestHandler()
const glob = require('glob')
const path = require('path')

// Construct a new Sprucebot
const sprucebot = new Sprucebot({
	apiKey: API_KEY,
	host: API_HOST,
	skillId: SKILL_ID,
	name: SKILL_NAME,
	description: SKILL_DESCRIPTION,
	svgIcon: SKILL_ICON,
	webhookUrl: SKILL_SERVER_HOST + '/hook'
})

app.prepare().then(() => {
	const server = new Koa()
	const router = new Router()

	/*=======================================
	=            Sprucebot Context          =
	=======================================*/
	server.context.sb = sprucebot

	/*=======================================
	=            Utilites/Services          =
	=======================================*/
	try {
		sprucebot.skillskit.factories.context(
			path.join(__dirname, 'services'),
			'services',
			server.context
		)
		sprucebot.skillskit.factories.context(
			path.join(__dirname, 'utilities'),
			'utilities',
			server.context
		)
	} catch (err) {
		console.error('Leading services & utilites failed.')
		console.error(err)
	}

	/*======================================
	=            	Cron	        	   =
	======================================*/
	const cronController = require('./controllers/cron')
	cronController(cron)

	/*=========================================
	=            	Middleware	              =
	=========================================*/
	sprucebot.skillskit.factories
		.wares(path.join(__dirname, 'middleware'))
		.forEach(ware => server.use(ware))

	// x-response-time
	server.use(async (ctx, next) => {
		ctx.start = new Date()
		await next()
	})

	// logger
	server.use(async (ctx, next) => {
		await next()
		// do stuff when the execution returns upstream, this will be last event in upstream
		const ms = Date.now() - ctx.start
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
	})

	/*======================================
	=          Server Side Routes          =
	======================================*/
	try {
		sprucebot.skillskit.factories.routes(
			path.join(__dirname, 'controllers'),
			router
		)
		server.use(router.routes())
	} catch (err) {
		console.error('Loading controllers failed.')
		console.error(err)
	}

	/*======================================
	=          Client Side Routes          =
	======================================*/
	router.get('*', async ctx => {
		await handle(ctx.req, ctx.res)
		ctx.respond = false
	})

	/*======================================
	=              Afterware        	   =
	======================================*/
	sprucebot.skillskit.factories
		.wares(path.join(__dirname, 'afterware'))
		.forEach(ware => server.use(ware))

	// Default Response Code
	server.use(async (ctx, next) => {
		ctx.res.statusCode = 200
		await next()
	})

	// x-response-time
	server.use(async (ctx, next) => {
		const ms = Date.now() - ctx.start
		ctx.set('X-Response-Time', `${ms}ms`)
		await next()
	})

	/*======================================
	=              	Serve            	   =
	======================================*/
	server.listen(PORT, err => {
		if (err) throw err
		console.log(` 🌲  Skill launched at http://localhost:${PORT}`)
	})
})
