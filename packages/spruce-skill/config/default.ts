// First things first: load the .env file
try {
	const path = `${__dirname}/../.env`
	require('dotenv').config({ path })
} catch (e) {
	console.error('Missing .env file for this project')
}

//////////////////////////////////////////////////////////////////////
// Define your custom configuration options here.
//////////////////////////////////////////////////////////////////////
const customConfig = {
	// Define options for utilities
	utilities: {},
	// Define options for services
	services: {
		'uploads.disabled': {
			adapter: 's3',
			options: {
				bucket: 'some-bucket-name',
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			}
		},
		cache: {
			adapter: 'redis',
			enable: process.env.CACHE_ENABLED === 'true',
			logDebug: process.env.CACHE_DEBUG === 'true',
			options: {
				url: process.env.CACHE_URL || null,
				ttl: process.env.CACHE_DEFAULT_TTL_SEC
					? +process.env.CACHE_DEFAULT_TTL_SEC
					: 300
			}
		}
	},
	// This defines the configuration variables that are available
	// in the browser. Anything here is PUBLIC.
	// NEVER put secrets like api keys here
	sanitizeClientConfig: (config: Record<string, any>) =>
		pick(config, [
			'NAME',
			'ICON',
			'DESCRIPTION',
			'SERVER_HOST',
			'GRAPHQL_SUBSCRIPTIONS_URI',
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
			'LOG_USE_TRACE',
			'CAPTURE_FE_LOGS',
			'ENV',
			'METRICS_URL',
			'METRICS_ENABLED',
			'METRICS_BROWSER_STATS_ENABLED',
			'VIEW_VERSION'
		])
}

//////////////////////////////////////////////////////////////////////
// DO NOT EDIT BELOW!
// The code below combines your custom config with the
// default configuration options
//////////////////////////////////////////////////////////////////////
// https://github.com/lorenwest/node-config/wiki/Configuration-Files
import { SpruceConfig } from '@sprucelabs/spruce-skill-server'
import { pick } from 'lodash'
import acl from './acl'
import settings from './settings'
import errors from './errors'
import eventContract from './eventContract'
import scopes from './scopes'

type aclType = typeof acl
type settingsType = typeof settings
type errorsType = typeof errors
type eventContractType = typeof eventContract
type scopesType = typeof scopes
type configType = typeof SpruceConfig

// Path to the server directory. Used to load all the default config files
const baseDirectory = `${__dirname}/../server`
const baseConfig = require('@sprucelabs/spruce-skill-server/config/default')
	.default as configType

const fullConfig = {
	...baseConfig<
		aclType,
		settingsType,
		errorsType,
		eventContractType,
		scopesType
	>(baseDirectory),
	...customConfig
}

export default fullConfig
