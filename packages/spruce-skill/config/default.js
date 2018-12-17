// https://github.com/lorenwest/node-config/wiki/Configuration-Files
const path = require('path')
const { omit, pick } = require('lodash')
const fs = require('fs')
const errors = require('./errors')
const packageJSON = require('../package.json')
const HEARTWOOD_VERSION = require('@sprucelabs/heartwood-components').version
// Check for .env
try {
	require('dotenv').config()
} catch (e) {
	console.error('Missing .env file for this project')
}

module.exports = {
	cards: {
		exampleCard: {
			type: 'standard',
			comment: 'An example card',
			title: 'My first skill card',
			description: 'Example of how to display a card',
			pages: ['user-dashboard'],
			isCritical: true,
			canDismiss: false,
			isTemporary: false,
			isCentered: true,
			roles: ['owner', 'groupManager', 'manager', 'teammate', 'guest'],
			layout: {
				header: {},
				body: {},
				footerActions: {
					primary: {},
					secondary: {}
				}
			}
		}
	},
	DEV_MODE: process.env.DEV_MODE === 'true',
	ENV: process.env.ENV || 'default',
	PACKAGE_NAME: packageJSON.name,
	PACKAGE_VERSION: packageJSON.version,
	LOG_LEVEL: process.env.LOG_LEVEL || 'warn',
	LOG_USE_COLORS: process.env.LOG_USE_COLORS !== 'false',
	METRICS_APP_KEY: process.env.METRICS_APP_KEY,
	METRICS_URL: process.env.METRICS_URL,
	METRICS_ENABLED: process.env.METRICS_ENABLED === 'true',
	METRICS_BROWSER_STATS_ENABLED:
		process.env.METRICS_BROWSER_STATS_ENABLED === 'true',
	METRICS_REQUESTS_DISABLED: process.env.METRICS_REQUESTS_DISABLED === 'true',
	METRICS_SERVER_STATS_DISABLED:
		process.env.METRICS_SERVER_STATS_DISABLED === 'true',
	METRICS_SEQUELIZE_DISABLED: process.env.METRICS_SEQUELIZE_DISABLED === 'true',
	API_HOST: process.env.API_HOST,
	API_KEY: process.env.API_KEY,
	SKILL_STYLESHEET:
		process.env.SKILL_STYLESHEET ||
		`https://cdn.spruce.ai/stylesheets/${HEARTWOOD_VERSION ||
			'latest'}/heartwood-components.min.css`,
	ID: process.env.ID,
	NAME: process.env.NAME,
	SLUG: process.env.SLUG,
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
	GRAPHQL_MAX_DEPTH: process.env.GRAPHQL_MAX_DEPTH
		? +process.env.GRAPHQL_MAX_DEPTH
		: 10,
	GRAPHQL_MAX_COMPLEXITY: process.env.GRAPHQL_MAX_COMPLEXITY
		? +process.env.GRAPHQL_MAX_COMPLEXITY
		: 1500,
	GRAPHQL_ENABLED: process.env.GRAPHQL_ENABLED !== 'false',
	GRAPHIQL_ENABLED: process.env.GRAPHIQL_ENABLED === 'true',
	acl: {
		// These are ACLs from other skills or core that we're requesting
		requests: {
			// The permissions from Core that we're requesting
			core: ['can_manage_organization', 'can_update_location'],
			// The keys are the skill slug with an array of permissions from that skill we're requesting
			scheduling: ['can_update_timeblocks'],
			booking: ['can_create_appointment', 'can_edit_teammate_appointments']
		},
		// These are the ACLs that this skill publishes
		publishes: {
			can_do_example: {
				// The label will show up to describe this permission on the Organization Jobs management page
				label: 'If the user can create an appointment for another user.',
				// The type may be "organization" or "location". This determines how the permission is checked.
				type: 'location',
				// The default permissions for this ACL will be used if it is not overridden on the Organization Jobs management page
				defaults: {
					guest: false,
					teammate: false,
					manager: false,
					groupManager: false
				}
			}
		}
	},
	// Event contract
	// This sets the events that you want to subscribe to
	// For example, if you uncomment the "did-enter" event below, then the code in server/events/did-enter.js will be triggered when someone connects to the access point
	eventContract: {
		events: {
			'get-views': {
				description: 'Core asks for views to display on a page'
			},
			'get-page-cards': {
				description: 'Core asks this skill to provide cards for a dashboard'
			}
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
	gqlOptions: {
		gqlDir: path.resolve(__dirname, '../server/gql')
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
			'nextConfig',
			'WHITELABEL',
			'SLUG',
			'PACKAGE_NAME',
			'PACKAGE_VERSION',
			'LOG_LEVEL',
			'ENV',
			'METRICS_URL',
			'METRICS_ENABLED',
			'METRICS_BROWSER_STATS_ENABLED'
		])
}
