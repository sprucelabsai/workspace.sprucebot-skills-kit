// https://github.com/lorenwest/node-config/wiki/Configuration-Files
const path = require('path')
const { omit, pick } = require('lodash')
const fs = require('fs')
const errors = require('./errors')
const packageJSON = require('../package.json')
// Check for .env
try {
	require('dotenv').config()
} catch (e) {
	console.error('Missing .env file for this project')
}

module.exports = {
	DEV_MODE: process.env.DEV_MODE === 'true',
	ENV: process.env.ENV || 'default',
	PACKAGE_NAME: packageJSON.name,
	PACKAGE_VERSION: packageJSON.version,
	LOG_LEVEL: process.env.LOG_LEVEL || 'warn',
	METRICS_APP_KEY: process.env.METRICS_APP_KEY,
	METRICS_URL: process.env.METRICS_URL,
	METRICS_ENABLED: process.env.METRICS_ENABLED === 'true',
	METRICS_REQUESTS_DISABLED: process.env.METRICS_REQUESTS_DISABLED === 'true',
	METRICS_SERVER_STATS_DISABLED:
		process.env.METRICS_SERVER_STATS_DISABLED === 'true',
	API_HOST: process.env.API_HOST,
	API_KEY: process.env.API_KEY,
	SKILL_STYLESHEET: process.env.SKILL_STYLESHEET,
	ID: process.env.ID,
	NAME: process.env.NAME,
	SLUG: process.env.SLUG,
	LOG_LEVEL: process.env.LOG_LEVEL,
	DESCRIPTION: process.env.DESCRIPTION,
	ICON: fs.readFileSync(path.join(__dirname, '../icon/icon.svg')).toString(),
	PORT: process.env.PORT,
	SERVER_HOST: process.env.SERVER_HOST,
	VIMEO_ID: process.env.VIMEO_ID,
	INTERFACE_HOST: process.env.INTERFACE_HOST,
	INTERFACE_SSL_ALLOW_SELF_SIGNED:
		process.env.INTERFACE_SSL_ALLOW_SELF_SIGNED === 'true',
	API_SSL_ALLOW_SELF_SIGNED: process.env.API_SSL_ALLOW_SELF_SIGNED === 'true',
	WHITELABEL: process.env.WHITELABEL,

	RUN_CRONS: process.env.RUN_CRONS === 'true',
	ENABLE_DEBUG_ROUTES: process.env.ENABLE_DEBUG_ROUTES === 'true',
	// Event contract
	// This sets the events that you want to subscribe to
	// For example, if you uncomment the "did-enter" event below, then the code in server/events/did-enter.js will be triggered when someone connects to the access point
	eventContract: {
		events: {
			// Other events we could subscribe to
			// 'was-installed': {
			// 	name: 'was-installed',
			// 	description: 'When the skill is installed to a location'
			// },
			// 'did-signup': {
			// 	name: 'did-signup',
			// 	description: 'When a guest joins wifi at a location for the first time'
			// },
			// 'did-enter': {
			// 	name: 'did-enter',
			// 	description: 'When a guest returns and their phone hits the wifi'
			// },
			// 'did-leave': {
			// 	name: 'did-leave',
			// 	description: 'Triggered an hour after a guest leaves'
			// },
			// 'did-message': {
			// 	name: 'did-message',
			// 	description: 'A guest has sent a text to Sprucebot'
			// },
			// 'did-add-device': {
			// 	name: 'did-add-device',
			// 	description:
			// 		'When a guest adds a new device to a location. Like adding their laptop'
			// },
			// 'did-update-profile': {
			// 	name: 'did-update-profile',
			// 	description: 'When any user updates their first or last name'
			// },
			// 'did-opt-out': {
			// 	name: 'did-opt-out',
			// 	description:
			// 		'When any guest opts out of a location. By now you have already lost access to their meta data.'
			// },
			// 'did-remote-rejoin': {
			// 	name: 'did-remote-rejoin',
			// 	description:
			// 		'They had, at one time, opted out. But, now they have remotely opted back in'
			// },
			// 'will-send-training': {
			// 	name: 'will-send-training',
			// 	description:
			// 		'Sprucebot has made the decision that now is the perfect time to send training material'
			// }
		}
	},
	sequelizeOptions: {
		enabled: process.env.DB_ENABLED === 'true',
		runMigrations: process.env.DB_MIGRATIONS === 'true',
		modelsDir: path.resolve(__dirname, '../server/models'),
		migrationsDir: path.resolve(__dirname, '../server/migrations'),
		// Additional sequelize options
		options: {
			logging: process.env.ORM_LOGGING === 'true' ? console.log : false
		}
	},
	utilities: {}, // Settings for any utilities.
	services: {
		'uploads.disabled': {
			uploader: './uploads/s3',
			options: {
				Bucket: 'some-bucket-name',
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			}
		},
		cache: {
			cache: './cache/redis',
			enable: process.env.CACHE_ENABLE === 'true',
			options: {
				url: process.env.REDIS_URL || null,
				ttl: process.env.DEFAULT_TTL_SEC || 300
			}
		}
	}, // Settings for any services.
	bodyParserOptions: {
		// passthrough to https://github.com/koajs/bodyparser
		jsonLimit: '1mb'
	},
	log_colors: {
		error: 'red',
		warn: 'orange',
		info: 'yellow',
		verbose: 'green',
		debug: 'white',
		silly: 'pink'
	},
	nextConfig: {
		dir: path.resolve(__dirname, '../interface'),
		dev: process.env.DEV_MODE === 'true', // next.js development mode
		quiet: false
	},
	// Error responses
	errors,
	// Omit keys from client.json config
	sanitizeClientConfig: config =>
		pick(config, [
			'NAME',
			'ICON',
			'DESCRIPTION',
			'SERVER_HOST',
			'SKILL_STYLESHEET',
			'INTERFACE_SSL_ALLOW_SELF_SIGNED',
			'VIMEO_ID',
			'DEV_MODE',
			'log_colors',
			'nextConfig',
			'WHITELABEL',
			'SLUG',
			'PACKAGE_NAME',
			'PACKAGE_VERSION',
			'LOG_LEVEL',
			'ENV',
			'METRICS_URL'
		])
}
