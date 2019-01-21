module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:flowtype/recommended',
		'plugin:react/recommended',
		'prettier'
	],
	plugins: ['react', 'flowtype', 'prettier'],
	rules: {
		curly: 'error',
		'react/jsx-no-undef': 'error',
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
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 10,
		ecmaFeatures: {
			jsx: true
		}
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	settings: {
		flowtype: {},
		react: {
			version: '16.6',
			flowVersion: '0.87'
		}
	}
}
