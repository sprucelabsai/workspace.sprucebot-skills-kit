const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended.json')
const typescriptEslintPrettier = require('eslint-config-prettier/@typescript-eslint')
const importRules = require('eslint-plugin-import/config/errors')

const defaultFormattingRules = {
	curly: 'error',
	'spruce/utils-graphql': 'error',
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
	]
}

module.exports = {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint'],
			rules: {
				...typescriptEslintRecommended.rules,
				...typescriptEslintPrettier.rules,
				'@typescript-eslint/camelcase': [
					'error',
					{ allow: ['^(can_|skill_can_)'] }
				],
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
							delimiter: 'semi',
							requireLast: false
						}
					}
				],
				'@typescript-eslint/explicit-function-return-type': [
					'error',
					{
						allowExpressions: true
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
				],
				...defaultFormattingRules
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
	plugins: ['spruce', 'import', 'react', 'flowtype', 'prettier'],
	rules: {
		...defaultFormattingRules
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
		node: true,
		es6: true
	},
	globals: {
		log: true,
		window: true,
		document: true,
		navigator: true,
		FileReader: true
	},
	settings: {
		flowtype: {},
		react: {
			version: '16.6',
			flowVersion: '0.87'
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	}
}
