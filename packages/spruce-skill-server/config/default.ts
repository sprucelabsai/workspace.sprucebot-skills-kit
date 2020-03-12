/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// https://github.com/lorenwest/node-config/wiki/Configuration-Files
import baseErrors from './errors'
import Debug from 'debug'
import defaultAuth from './auth'
import defaultScopes from './scopes'
const debug = Debug('spruce-skill-server')

export type SpruceAuth = (options: {
	userId?: string
	organizationId?: string
	locationId?: string
}) => string

export interface ISpruceEventContract {
	events: {
		[eventName: string]: {
			description: string
			subscribe: boolean
		}
	}
}

function optionalRequire(path: string) {
	let result
	try {
		result = require(path)
	} catch (e) {
		debug(e)
	}

	return result && result.default ? result.default : result
}

export default function SpruceConfig<
	aclType,
	settingsType,
	errorsType,
	eventContractType,
	UIEnhancementContractType,
	scopesType,
	authType = SpruceAuth
>(baseDirectory: string) {
	const HEARTWOOD_VERSION = encodeURIComponent(
		require('@sprucelabs/heartwood-components').version
	)
	const packageJSON = require(`${baseDirectory}/../package.json`)
	const icon = ''
	const auth = (optionalRequire(`${baseDirectory}/../config/auth`) ||
		defaultAuth) as authType
	const scopes = (optionalRequire(`${baseDirectory}/../config/scopes`) ||
		defaultScopes) as scopesType
	const settings = (optionalRequire(`${baseDirectory}/../config/settings`) ||
		[]) as settingsType
	const errors = (optionalRequire(`${baseDirectory}/../config/errors`) ||
		{}) as errorsType
	const acl = (optionalRequire(`${baseDirectory}/../config/acl`) ||
		{}) as aclType
	const eventContract = (optionalRequire(
		`${baseDirectory}/../config/eventContract`
	) || { events: {} }) as eventContractType
	const uiEnhancementContract = (optionalRequire(
		`${baseDirectory}/../config/uiEnhancementContract`
	) || { events: {} }) as UIEnhancementContractType

	return {
		/**
		 * 🌲🤖 Your Skill ID
		 */
		ID: process.env.ID,
		/**
		 * 🌲🤖 When enabled FE code will be compiled lazily. This should be false in production
		 */
		DEV_MODE: process.env.DEV_MODE === 'true',
		/**
		 * 🌲🤖 The event version to use
		 * https://developer.spruce.ai/#/events
		 */
		EVENT_VERSION: process.env.EVENT_VERSION ? +process.env.EVENT_VERSION : 1,
		/**
		 * 🌲🤖 The view version to use
		 */
		VIEW_VERSION: process.env.VIEW_VERSION || 1,
		/**
		 * 🌲🤖 The current log level. Valid options are (in decending order):
		 * fatal
		 * crit
		 * error
		 * warn
		 * info
		 * debug
		 * trace
		 */
		LOG_LEVEL: process.env.LOG_LEVEL || 'warn',
		/**
		 * 🌲🤖 If "false", logs will not add colors to the terminal
		 */
		LOG_USE_COLORS: process.env.LOG_USE_COLORS !== 'false',
		/**
		 * 🌲🤖 If "false", incoming event logs will be disabled
		 */
		LOG_EVENTS: process.env.LOG_EVENTS !== 'false',
		/**
		 * 🌲🤖 If true, tries to find the filename and line number
		 * where the log originated. This should only be used locally.
		 * When enabled, trace will increase memory and cpu usage.
		 */
		LOG_USE_TRACE: process.env.LOG_USE_TRACE === 'true',
		/**
		 * 🌲🤖 If true, tries to use sourcemaps to find the filename and line number
		 * where the log originated. This should only be used locally.
		 * When enabled, trace will increase memory and cpu usage.
		 */
		LOG_USE_SOURCEMAPS: process.env.LOG_USE_SOURCEMAPS === 'true',
		/**
		 * 🌲🤖 If true, outputs logs as JSON
		 */
		LOG_AS_JSON: process.env.LOG_AS_JSON === 'true',
		/**
		 * 🌲🤖 If true, errors from the FE will be sent to the BE and logged in the terminal
		 */
		CAPTURE_FE_LOGS: process.env.CAPTURE_FE_LOGS === 'true',
		METRICS_APP_KEY: process.env.METRICS_APP_KEY,
		METRICS_URL: process.env.METRICS_URL,
		METRICS_ENABLED: process.env.METRICS_ENABLED === 'true',
		METRICS_BROWSER_STATS_ENABLED:
			process.env.METRICS_BROWSER_STATS_ENABLED === 'true',
		METRICS_REQUESTS_DISABLED: process.env.METRICS_REQUESTS_DISABLED === 'true',
		METRICS_SERVER_STATS_DISABLED:
			process.env.METRICS_SERVER_STATS_DISABLED === 'true',
		METRICS_SEQUELIZE_DISABLED:
			process.env.METRICS_SEQUELIZE_DISABLED === 'true',
		/**
		 * 🌲🤖 The Spruce API to use. You probably want:
		 * https://api.spruce.ai
		 */
		API_HOST: process.env.API_HOST,
		/**
		 * 🌲🤖 The GraphQL subscriptions URI.
		 * This will look like: wss://my-skill.sprucebot.com/graphql
		 */
		GRAPHQL_SUBSCRIPTIONS_URI: process.env.GRAPHQL_SUBSCRIPTIONS_URI,
		/**
		 * 🌲🤖 Enable GQL listeners. This is used when streaming data via GQL
		 * subscriptions from the Spruce API
		 */
		GRAPHQL_LISTENERS_ENABLED: process.env.GRAPHQL_LISTENERS_ENABLED === 'true',
		/**
		 * 🌲🤖 The Spruce API GQL subscriptions URI
		 * This will look like: wss://api.spruce.ai/graphql
		 */
		API_GRAPHQL_SUBSCRIPTIONS_URI: process.env.API_GRAPHQL_SUBSCRIPTIONS_URI,
		/**
		 * 🌲🤖 Enable the UIEnhancement GQL endpoint for your skill.
		 * Requires GRAPHQL_ENABLED to be true
		 */
		UI_ENHANCEMENTS_ENABLED: process.env.UI_ENHANCEMENTS_ENABLED === 'true',
		/**
		 * 🌲🤖 Your Skill's API key.
		 * This should be kept secret at all times
		 */
		API_KEY: process.env.API_KEY,
		/**
		 * 🌲🤖 DEPRECATED. Option to override heartwood components stylesheet
		 */
		SKILL_STYLESHEET:
			process.env.SKILL_STYLESHEET ||
			`https://cdn.spruce.ai/stylesheets/${HEARTWOOD_VERSION ||
				'latest'}/heartwood-components.min.css`,
		/**
		 * 🌲🤖 DEPRECATED. Option to import a legacy stylesheet for your skill
		 */
		LEGACY_SKILL_STYLESHEET: process.env.LEGACY_SKILL_STYLESHEET,
		/**
		 * 🌲🤖 The URL to a local sqlite DB that is used for testing
		 */
		DATABASE_URL_TESTING:
			process.env.DATABASE_URL_TESTING ||
			`sqlite:${baseDirectory}/../tmp/testing.db`,
		/**
		 * 🌲🤖 Your Skill's name
		 */
		NAME: process.env.NAME,
		/**
		 * 🌲🤖 Your Skill's slug
		 * This can not be changed after you register your skill. Changing this value
		 * will NOT update your slug
		 */
		SLUG: process.env.SLUG || '',
		/**
		 * 🌲🤖 Your Skill's description
		 */
		DESCRIPTION: process.env.DESCRIPTION,
		/**
		 * 🌲🤖 The port to start up
		 */
		PORT: process.env.PORT,
		/**
		 * 🌲🤖 The base url to your Skill's BE
		 */
		SERVER_HOST: process.env.SERVER_HOST,
		/**
		 * 🌲🤖 The vimeo video ID to show on your marketing page
		 */
		VIMEO_ID: process.env.VIMEO_ID,
		/**
		 * 🌲🤖 The base url to your Skill's FE
		 */
		INTERFACE_HOST: process.env.INTERFACE_HOST,
		/**
		 * 🌲🤖 If "true", ignores SSL errors when loading the FE
		 */
		INTERFACE_SSL_ALLOW_SELF_SIGNED:
			process.env.INTERFACE_SSL_ALLOW_SELF_SIGNED === 'true',
		/**
		 * 🌲🤖 If "true", ignores SSL errors when loading the BE
		 */
		API_SSL_ALLOW_SELF_SIGNED: process.env.API_SSL_ALLOW_SELF_SIGNED === 'true',
		WHITELABEL: process.env.WHITELABEL,
		/**
		 * 🌲🤖 If "true", enables crons
		 * See controllers/cron
		 */
		RUN_CRONS: process.env.RUN_CRONS === 'true',
		/**
		 * 🌲🤖 If "true", enables debug routes
		 * This should only be enabled in local and development environments
		 */
		ENABLE_DEBUG_ROUTES: process.env.ENABLE_DEBUG_ROUTES === 'true',
		/**
		 * 🌲🤖 The maximum depth to allow for GQL queries. Default 10
		 * See https://github.com/stems/graphql-depth-limit for more info
		 */
		GRAPHQL_MAX_DEPTH: process.env.GRAPHQL_MAX_DEPTH
			? +process.env.GRAPHQL_MAX_DEPTH
			: 20,
		/**
		 * 🌲🤖 The maximum complexity to allow for GQL queries. Default 1500
		 */
		GRAPHQL_MAX_COMPLEXITY: process.env.GRAPHQL_MAX_COMPLEXITY
			? +process.env.GRAPHQL_MAX_COMPLEXITY
			: 2500,
		/**
		 * 🌲🤖 Enable Skills database
		 * More info: https://developer.spruce.ai/#/orm
		 */
		DB_ENABLED: process.env.DB_ENABLED === 'true',
		/**
		 * 🌲🤖 Enable GraphQL endpoints
		 */
		GRAPHQL_ENABLED: process.env.GRAPHQL_ENABLED !== 'false',
		/**
		 * 🌲🤖 Enable GraphQL debugging and docs
		 */
		GRAPHIQL_ENABLED: process.env.GRAPHIQL_ENABLED === 'true',
		/**
		 * 🌲🤖 This variable can be checked to determine if we're running
		 * in a test environment.
		 */
		TESTING: process.env.TESTING === 'true',

		/**
		 * 🌲🤖 This is for kit testing at homebase. It lets us run the example tests to ensure everything is functioning 💯 when we ship a new version of the kit.
		 */
		TESTING_SKILLS_KIT: process.env.TESTING_SKILLS_KIT === 'true',

		/**
		 * 🌲🤖 The S3 bucket name for assets
		 * TODO abstract S3_bucket out of here, utilize adapter based config
		 */
		S3_BUCKET: process.env.S3_BUCKET || '',
		/**
		 * 🌲🤖 Your skills package.json name
		 */
		PACKAGE_NAME: packageJSON.name,
		/**
		 * 🌲🤖 Your skills package.json version
		 */
		PACKAGE_VERSION: packageJSON.version,
		/**
		 * Special internal skills might set this to true. Most skills can ignore this setting.
		 */
		GLOBAL: process.env.GLOBAL === 'true',
		gqlOptions: {
			gqlDir: `${baseDirectory}/gql`
		},
		sequelizeOptions: {
			enabled: process.env.DB_ENABLED === 'true',
			runMigrations: process.env.DB_MIGRATIONS === 'true',
			modelsDir: `${baseDirectory}/models`,
			migrationsDir: `${baseDirectory}/migrations`,
			// Additional sequelize options
			options: {
				logging: process.env.ORM_LOGGING === 'true' ? console.log : false
			}
		},
		bodyParserOptions: {
			// passthrough to https://github.com/koajs/bodyparser
			jsonLimit: '5mb'
		},
		nextConfig: {
			dir: `${process.cwd()}/web`,
			dev: process.env.DEV_MODE === 'true', // next.js development mode
			quiet: false
		},
		ICON: icon,
		/**
		 * 🌲🤖 Defines scopes for your GQL endpoints
		 * See config/scopes.ts
		 */
		scopes,
		/**
		 * 🌲🤖 Defines the data to pull on users when they authenticate
		 * with your skill
		 * See config/auth.ts
		 */
		auth,
		/**
		 * 🌲🤖 Defines your skill's settings that can be configured
		 * See config/settings.ts
		 */
		settings,
		/**
		 * 🌲🤖 Defines the error codes your Skill might throw
		 * See config/errors.ts
		 */
		errors: {
			...baseErrors,
			...errors
		},
		/**
		 * 🌲🤖 Defines the ACLs your skill provides and needs
		 * See config/acl.ts
		 */
		acl,
		/**
		 * 🌲🤖 Defines the events your Skill responds to
		 * See config/eventContract.ts
		 * https://developer.spruce.ai/#/events?id=step-1-event-contracts
		 */
		eventContract,
		/**
		 * 🌲🤖 Defines UI enhancements that your skill provides and other areas it enhances
		 * See config/uiEnhancementContract.ts
		 * https://developer.spruce.ai/
		 */
		uiEnhancementContract
	}
}
