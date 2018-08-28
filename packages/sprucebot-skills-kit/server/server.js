const { version } = require('../package.json')
const path = require('path')
const serve = require('@sprucelabs/sprucebot-skills-kit-server')
const Sprucebot = require('@sprucelabs/sprucebot-node')
const log = require('@barbershopio/iso-log')
const generateSwaggerDocs = require('./swagger/swagger')

const {
	API_KEY,
	API_HOST,
	ID,
	NAME,
	ICON,
	DESCRIPTION,
	PORT,
	SERVER_HOST,
	INTERFACE_HOST,
	API_SSL_ALLOW_SELF_SIGNED,
	REDIS_URL,
	ENABLE_SWAGGER_DOCS,
	nextConfig,
	errors,
	bodyParserOptions,
	sequelizeOptions,
	eventContract,
	LOG_LEVEL
} = require('config')

// Set up global logger
const validLevels = [
	'trace',
	'debug',
	'info',
	'warn',
	'crit',
	'fatal',
	'superInfo'
]
let level = 'warn'
if (LOG_LEVEL && _.includes(validLevels, LOG_LEVEL)) {
	level = LOG_LEVEL
}

log.setOptions({
	level,
	useSourcemaps: false
})
global.log = log

/*
	Redis (optional)
	If enabled must install: yarn add ioredis
*/
if (REDIS_URL) {
	const Redis = require('./lib/Redis')
	global.redis = new Redis()
}

if (process.env.ENABLE_SWAGGER_DOCS === 'true') {
	generateSwaggerDocs()
		.then(() => {
			log.debug('Swagger docs generated')
		})
		.catch(e => {
			log.warn('Generate swagger doc error!')
			log.warn(e)
		})
}

// Construct a new Sprucebot
const sprucebot = new Sprucebot({
	apiKey: API_KEY,
	id: ID,
	host: API_HOST,
	name: NAME,
	description: DESCRIPTION,
	interfaceUrl: INTERFACE_HOST,
	serverUrl: SERVER_HOST,
	svgIcon: ICON,
	allowSelfSignedCerts: API_SSL_ALLOW_SELF_SIGNED,
	dbEnabled: sequelizeOptions && sequelizeOptions.enabled,
	eventContract: eventContract
})

let server
let ready = false
let timeout
let readyChecks = 0

// serve the skill, wait 2 seconds for debugger to connect
setTimeout(async () => {
	server = await serve({
		sprucebot,
		port: PORT,
		serverHost: SERVER_HOST,
		interfaceHost: INTERFACE_HOST,
		nextConfig: nextConfig,
		servicesDir: path.join(__dirname, 'services'),
		utilitiesDir: path.join(__dirname, 'utilities'),
		controllersDir: path.join(__dirname, 'controllers'),
		listenersDir: path.join(__dirname, 'events'),
		middlewareDir: path.join(__dirname, 'middleware'),
		staticDir: path.join(__dirname, 'static'),
		langDir: path.join(__dirname, '..', 'interface', 'lang'),
		bodyParserOptions,
		sequelizeOptions,
		errors
	})
	ready = true
}, 2000)

function handleReady(resolve) {
	console.info(`ℹ️  Waiting for Server to boot.  Check #${readyChecks}`)
	if (ready || readyChecks > 100) {
		console.info(`ℹ️  Server Ready`)
		return resolve(server)
	}

	readyChecks += 1

	setTimeout(() => {
		handleReady(resolve)
	}, 1000)
}

module.exports = new Promise(resolve => {
	console.info('ℹ️  Execute promise callback')
	handleReady(resolve)
})
