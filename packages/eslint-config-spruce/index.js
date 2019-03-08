const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json')
const typescriptEslintPrettier = require('eslint-config-prettier/@typescript-eslint')
const importRules = require('eslint-plugin-import/config/errors')

module.exports = {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			rules: {
				...typescriptEslintRecommended.rules,
				...typescriptEslintPrettier.rules,
				'@typescript-eslint/no-empty-interface': 0,
				'@typescript-eslint/interface-name-prefix': [2, 'always'],
				'@typescript-eslint/no-explicit-any': 0,
				'@typescript-eslint/member-delimiter-style': [
					'error',
					{
						multiline: {
							delimiter: 'none',
							requireLast: false
						},
						singleline: {
							delimiter: 'comma',
							requireLast: false
						}
					}
				],
				'@typescript-eslint/member-ordering': [
					'error',
					{
						order: [
							'public-static-field',
							'protected-static-field',
							'private-static-field',
							'public-instance-field',
							'protected-instance-field',
							'private-instance-field',
							'constructor',
							'public-static-method',
							'protected-static-method',
							'private-static-method',
							'public-instance-method',
							'protected-instance-method',
							'private-instance-method'
						],
						alphabetize: true
					}
				]
			}
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
