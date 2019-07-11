// Check for .env
try {
	require('dotenv').config()
} catch (e) {
	console.error('Missing .env file for this project')
}

module.exports = {
	DEV_MODE: false,
	API_HOST: 'https://localhost-api',
	API_KEY: 'womp',
	SKILL_STYLESHEET: 'https://localhost/skill.css',
	ID: 'xxx',
	NAME: 'Running unit tests',
	SLUG: 'jest-run-test',
	DESCRIPTION: 'Just running my Jest tests',
	PORT: 9000,
	SERVER_HOST: 'https://localhost',
	VIMEO_ID: 'xxx',
	INTERFACE_HOST: 'https://localhost',
	INTERFACE_SSL_ALLOW_SELF_SIGNED: false,
	API_SSL_ALLOW_SELF_SIGNED: false
}
