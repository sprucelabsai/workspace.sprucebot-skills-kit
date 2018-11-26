const skillPackage = require('../package.json')
const path = require('path')
const serve = require('@sprucelabs/spruce-skill-server')
const Sprucebot = require('@sprucelabs/spruce-node')
const generateSwaggerDocs = require('./swagger/swagger')
const _ = require('lodash')

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
	SLUG,
	LOG_LEVEL,
	LOG_USE_COLORS,
	ENV,
	PACKAGE_NAME,
	PACKAGE_VERSION,
	METRICS_APP_KEY,
	METRICS_URL,
	METRICS_ENABLED,
	METRICS_REQUESTS_DISABLED,
	METRICS_SERVER_STATS_DISABLED,
	METRICS_SEQUELIZE_DISABLED
} = require('config')

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
	eventContract: eventContract,
	version: skillPackage.version,
	skillsKitVersion: skillPackage['sprucebot-skills-kit-version']
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
		errors,
		slug: SLUG,
		logLevel: LOG_LEVEL,
		logUseColors: LOG_USE_COLORS,
		env: ENV,
		packageName: PACKAGE_NAME,
		packageVersion: PACKAGE_VERSION,
		metricsAppKey: METRICS_APP_KEY,
		metricsUrl: METRICS_URL,
		metricsEnabled: METRICS_ENABLED,
		metricsRequestsDisabled: METRICS_REQUESTS_DISABLED,
		metricsServerStatsDisabled: METRICS_SERVER_STATS_DISABLED,
		metricsSequelizeDisabled: METRICS_SEQUELIZE_DISABLED
	})
	if (process.env.ENABLE_SWAGGER_DOCS === 'true') {
		generateSwaggerDocs()
			.then(() => {
				console.log('ℹ️ Swagger docs generated')
			})
			.catch(e => {
				console.log('⚠️ Generate swagger doc error!')
				console.log(e)
			})
	}
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
