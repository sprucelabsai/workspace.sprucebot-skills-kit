const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json')
const typescriptEslintPrettier = require('eslint-config-prettier/@typescript-eslint')
const importRules = require('eslint-plugin-import/config/errors')

module.exports = {
	extends: ['plugin:react/recommended', 'plugin:flowtype/recommended', './base.js'],
	plugins: ['react', 'flowtype'],
	rules: {
		curly: 'error',
		'react/jsx-no-undef': 'error',
		'react/prop-types': 'off'
	},
	settings: {
		flowtype: {},
		react: {
			version: '16.6',
			flowVersion: '0.87'
		}
	}
}
