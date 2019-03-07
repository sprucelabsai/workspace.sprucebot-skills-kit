const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json')
const typescriptEslintPrettier = require('eslint-config-prettier/@typescript-eslint')
const importRules = require('eslint-plugin-import/config/errors')

module.exports = {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			rules: Object.assign(
				typescriptEslintRecommended.rules,
				typescriptEslintPrettier.rules
			)
		},
		{
			files: ['*.js'],
			plugins: ['@typescript-eslint'],
			rules: Object.assign(importRules.rules)
		}
	],
	extends: [
		'plugin:flowtype/recommended',
		'plugin:react/recommended',
		'eslint:recommended',
		'prettier'
	],
	plugins: ['@sprucelabs/spruce', 'import', 'react', 'flowtype', 'prettier'],
	rules: {
		curly: 'error',
		'react/jsx-no-undef': 'error',
		'no-console': 'off',
		'no-undef': 'error',
		'no-var': 'error',
		'no-unreachable': 'error',
		'no-unused-vars': 'error',
		'react/prop-types': 'off',
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				useTabs: true,
				semi: false
			}
		],
		'import/no-deprecated': 2
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true
		},
		project: './tsconfig.json'
	},
	env: {
		jest: true,
		browser: true,
		node: true,
		es6: true
	},
	globals: {
		log: true
	},
	settings: {
		flowtype: {},
		react: {
			version: '16.6',
			flowVersion: '0.87'
		}
	}
}
