/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
// https://github.com/lorenwest/node-config/wiki/Configuration-Files
// import path from 'path'

export default {
	ID: process.env.ID || 'something'
}

// export default (configDirectory: string) => {
// 	const { pick } = require('lodash')
// 	const fs = require('fs')

// 	const errors = require(`${configDirectory}/errors`)
// 	const settings = require(`${configDirectory}/settings`)

// 	const packageJSON = require(`${configDirectory}/../package.json`)
// 	const HEARTWOOD_VERSION = encodeURIComponent(
// 		require('@sprucelabs/heartwood-components').version
// 	)
// 	// Check for .env
// 	try {
// 		const path = `${configDirectory}/../.env`
// 		require('dotenv').config({ path })
// 	} catch (e) {
// 		console.error('Missing .env file for this project')
// 	}

// 	const baseDirectory = `${configDirectory}/../server`

// 	return {
// 		DEV_MODE: process.env.DEV_MODE === 'true',
// 		ENV: process.env.ENV || 'default',
// 		EVENT_VERSION: process.env.EVENT_VERSION ? +process.env.EVENT_VERSION : 1,
// 		PACKAGE_NAME: packageJSON.name,
// 		PACKAGE_VERSION: packageJSON.version,
// 		VIEW_VERSION: process.env.VIEW_VERSION || 1,
// 		LOG_LEVEL: process.env.LOG_LEVEL || 'warn',
// 		LOG_USE_COLORS: process.env.LOG_USE_COLORS !== 'false',
// 		LOG_EVENTS: process.env.LOG_EVENTS !== 'false',
// 		LOG_USE_TRACE: process.env.LOG_USE_TRACE === 'true',
// 		LOG_USE_SOURCEMAPS: process.env.LOG_USE_SOURCEMAPS === 'true',
// 		LOG_AS_JSON: process.env.LOG_AS_JSON === 'true',
// 		CAPTURE_FE_LOGS: process.env.CAPTURE_FE_LOGS === 'true',
// 		METRICS_APP_KEY: process.env.METRICS_APP_KEY,
// 		METRICS_URL: process.env.METRICS_URL,
// 		METRICS_ENABLED: process.env.METRICS_ENABLED === 'true',
// 		METRICS_BROWSER_STATS_ENABLED:
// 			process.env.METRICS_BROWSER_STATS_ENABLED === 'true',
// 		METRICS_REQUESTS_DISABLED: process.env.METRICS_REQUESTS_DISABLED === 'true',
// 		METRICS_SERVER_STATS_DISABLED:
// 			process.env.METRICS_SERVER_STATS_DISABLED === 'true',
// 		METRICS_SEQUELIZE_DISABLED:
// 			process.env.METRICS_SEQUELIZE_DISABLED === 'true',
// 		API_HOST: process.env.API_HOST,
// 		GRAPHQL_SUBSCRIPTIONS_URI: process.env.GRAPHQL_SUBSCRIPTIONS_URI,
// 		GRAPHQL_LISTENERS_ENABLED: process.env.GRAPHQL_LISTENERS_ENABLED === 'true',
// 		API_GRAPHQL_SUBSCRIPTIONS_URI: process.env.API_GRAPHQL_SUBSCRIPTIONS_URI,
// 		API_KEY: process.env.API_KEY,
// 		SKILL_STYLESHEET:
// 			process.env.SKILL_STYLESHEET ||
// 			`https://cdn.spruce.ai/stylesheets/${HEARTWOOD_VERSION ||
// 				'latest'}/heartwood-components.min.css`,
// 		DATABASE_URL_TESTING:
// 			process.env.DATABASE_URL_TESTING ||
// 			`sqlite:${configDirectory}/../tmp/testing.db`,
// 		ID: process.env.ID,
// 		NAME: process.env.NAME,
// 		SLUG: process.env.SLUG,
// 		DESCRIPTION: process.env.DESCRIPTION,
// 		ICON: fs
// 			.readFileSync(path.join(configDirectory, '../icon/icon.svg'))
// 			.toString(),
// 		PORT: process.env.PORT,
// 		SERVER_HOST: process.env.SERVER_HOST,
// 		VIMEO_ID: process.env.VIMEO_ID,
// 		INTERFACE_HOST: process.env.INTERFACE_HOST,
// 		INTERFACE_SSL_ALLOW_SELF_SIGNED:
// 			process.env.INTERFACE_SSL_ALLOW_SELF_SIGNED === 'true',
// 		API_SSL_ALLOW_SELF_SIGNED: process.env.API_SSL_ALLOW_SELF_SIGNED === 'true',
// 		WHITELABEL: process.env.WHITELABEL,

// 		RUN_CRONS: process.env.RUN_CRONS === 'true',
// 		ENABLE_DEBUG_ROUTES: process.env.ENABLE_DEBUG_ROUTES === 'true',
// 		GRAPHQL_MAX_DEPTH: process.env.GRAPHQL_MAX_DEPTH
// 			? +process.env.GRAPHQL_MAX_DEPTH
// 			: 10,
// 		GRAPHQL_MAX_COMPLEXITY: process.env.GRAPHQL_MAX_COMPLEXITY
// 			? +process.env.GRAPHQL_MAX_COMPLEXITY
// 			: 1500,
// 		DB_ENABLED: process.env.DB_ENABLED === 'true',
// 		GRAPHQL_ENABLED: process.env.GRAPHQL_ENABLED !== 'false',
// 		GRAPHIQL_ENABLED: process.env.GRAPHIQL_ENABLED === 'true',
// 		TESTING: process.env.TESTING === 'true',
// 		S3_BUCKET: process.env.S3_BUCKET || '',
// 		scopes: require('./scopes'),
// 		auth: require('./auth'),
// 		settings,
// 		acl: {
// 			// These are ACLs from other skills or core that we're requesting
// 			requests: {
// 				// The permissions from Core that we're requesting
// 				core: ['can_manage_organization', 'can_update_location'],
// 				// The keys are the skill slug with an array of permissions from that skill we're requesting
// 				scheduling: ['can_update_timeblocks'],
// 				booking: ['can_create_appointment', 'can_edit_teammate_appointments']
// 			},
// 			// These are the ACLs that this skill publishes
// 			publishes: {
// 				can_do_example_location: {
// 					// The label will show up to describe this permission on the Organization Jobs management page
// 					label: 'If the user can do this example thing for a location.',
// 					// The type may be "organization" or "location". This determines how the permission is checked.
// 					type: 'location',
// 					// The default permissions for this ACL will be used if it is not overridden on the Organization Jobs management page
// 					defaults: {
// 						guest: false,
// 						teammate: true,
// 						manager: true,
// 						groupManager: true
// 					}
// 				},
// 				can_do_example_location_owner_only: {
// 					label:
// 						'If the user can do this example thing for a location. Org owner only',
// 					type: 'location',
// 					defaults: {}
// 				},
// 				can_do_example_organization: {
// 					label: 'If the user can do this example thing for an organization.',
// 					type: 'organization',
// 					defaults: {
// 						guest: false,
// 						teammate: true,
// 						manager: true,
// 						groupManager: true
// 					}
// 				}
// 			}
// 		},
// 		// Event contract
// 		// This sets the events that you want to subscribe to
// 		// For example, if you uncomment the "did-enter" event below, then the code in server/events/did-enter.js will be triggered when someone connects to the access point
// 		eventContract: {
// 			events: {
// 				// 'get-settings': {
// 				// 	description: 'Core asks for settings to display on a page',
// 				// 	subscribe: true
// 				// },
// 				// 'validate-settings': {
// 				// 	description: 'Core asks for settings validation',
// 				// 	subscribe: true
// 				// },
// 				'get-views': {
// 					description: 'Core asks for views to display on a page',
// 					subscribe: true
// 				}
// 				// 'get-cards': {
// 				// 	description: 'Core asks this skill to provide cards',
// 				// 	subscribe: true
// 				// }
// 				// 'was-installed': {
// 				// 	description: 'When the skill is installed to a location',
// 				// 	subscribe: true
// 				// },
// 				// 'did-signup': {
// 				// 	description: 'When a guest joins wifi at a location for the first time',
// 				//  subscribe: true
// 				// },
// 				// 'did-enter': {
// 				// 	description: 'When a guest returns and their phone hits the wifi',
// 				//  subscribe: true
// 				// },
// 				// 'did-leave': {
// 				// 	description: 'Triggered an hour after a guest leaves',
// 				//  subscribe: true
// 				// },
// 				// 'did-message': {
// 				// 	description: 'A guest has sent a text to Sprucebot',
// 				//  subscribe: true
// 				// },
// 				// 'did-add-device': {
// 				// 	description:
// 				// 		'When a guest adds a new device to a location. Like adding their laptop',
// 				//  subscribe: true
// 				// },
// 				// 'did-update-user': {
// 				// 	description: 'When any user updates their first or last name'
// 				//  subscribe: true
// 				// },
// 				// 'did-opt-out': {
// 				// 	description:
// 				// 		'When any guest opts out of a location. By now you have already lost access to their meta data.',
// 				//  subscribe: true
// 				// },
// 				// 'did-remote-rejoin': {
// 				// 	description:
// 				// 		'They had, at one time, opted out. But, now they have remotely opted back in',
// 				//  subscribe: true
// 				// },
// 				// 'will-send-training': {
// 				// 	description:
// 				// 		'Sprucebot has made the decision that now is the perfect time to send training material',
// 				//  subscribe: true
// 				// },
// 				// 'big-search': {
// 				// 	description: 'Provide your own search results in the platform',
// 				// 	subscribe: true
// 				// },
// 				// 'import-from-big-search': {
// 				// 	description:
// 				// 		'Give people the power import your search results into the platform',
// 				// 	subscribe: true
// 				// }
// 			}
// 		},
// 		gqlOptions: {
// 			gqlDir: `${baseDirectory}/gql`
// 		},
// 		sequelizeOptions: {
// 			enabled: process.env.DB_ENABLED === 'true',
// 			runMigrations: process.env.DB_MIGRATIONS === 'true',
// 			modelsDir: `${baseDirectory}/models`,
// 			migrationsDir: `${baseDirectory}/migrations`,
// 			// Additional sequelize options
// 			options: {
// 				logging: process.env.ORM_LOGGING === 'true' ? console.log : false
// 			}
// 		},
// 		utilities: {}, // Settings for any utilities.
// 		services: {
// 			'uploads.disabled': {
// 				adapter: 's3',
// 				options: {
// 					bucket: 'some-bucket-name',
// 					accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// 				}
// 			},
// 			cache: {
// 				adapter: 'redis',
// 				enable: process.env.CACHE_ENABLED === 'true',
// 				logDebug: process.env.CACHE_DEBUG === 'true',
// 				options: {
// 					url: process.env.CACHE_URL || null,
// 					ttl: process.env.CACHE_DEFAULT_TTL_SEC
// 						? +process.env.CACHE_DEFAULT_TTL_SEC
// 						: 300
// 				}
// 			}
// 		}, // Settings for any services.
// 		bodyParserOptions: {
// 			// passthrough to https://github.com/koajs/bodyparser
// 			jsonLimit: '5mb'
// 		},
// 		nextConfig: {
// 			dir: path.resolve(configDirectory, '../interface'),
// 			dev: process.env.DEV_MODE === 'true', // next.js development mode
// 			quiet: false
// 		},
// 		// Error responses
// 		errors,
// 		// Omit keys from client.json config
// 		sanitizeClientConfig: (config: Record<string, any>) =>
// 			pick(config, [
// 				'NAME',
// 				'ICON',
// 				'DESCRIPTION',
// 				'SERVER_HOST',
// 				'GRAPHQL_SUBSCRIPTIONS_URI',
// 				'SKILL_STYLESHEET',
// 				'INTERFACE_SSL_ALLOW_SELF_SIGNED',
// 				'VIMEO_ID',
// 				'DEV_MODE',
// 				'nextConfig',
// 				'WHITELABEL',
// 				'SLUG',
// 				'PACKAGE_NAME',
// 				'PACKAGE_VERSION',
// 				'LOG_LEVEL',
// 				'LOG_USE_TRACE',
// 				'CAPTURE_FE_LOGS',
// 				'ENV',
// 				'METRICS_URL',
// 				'METRICS_ENABLED',
// 				'METRICS_BROWSER_STATS_ENABLED',
// 				'VIEW_VERSION'
// 			])
// 	}
// }
