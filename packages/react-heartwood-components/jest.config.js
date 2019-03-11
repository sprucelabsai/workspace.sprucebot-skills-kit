module.exports = {
	verbose: true,
	setupTestFrameworkScriptFile: '<rootDir>/jest/enzymeSetup.js',
	coverageDirectory: './coverage/',
	collectCoverage: true,
	transform: {
		'^.+\\.js?$': 'babel-jest',
		'^.+\\.tsx?$': 'ts-jest'
	},
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	testPathIgnorePatterns: [
		'node_modules',
		'<rootDir>/lib',
		'<rootDir>/config/',
		'<rootDir>/jest/',
		'<rootDir>/config/test.js',
		'<rootDir>/config/',
		'<rootDir>/docs/',
		'<rootDir>/icon/',
		'<rootDir>/server/',
		'<rootDir>/.vscode/',
		'<rootDir>/.circleci/',
		'<rootDir>/coverage/'
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/lib/',
		'<rootDir>/config/',
		'<rootDir>/jest/',
		'<rootDir>/node_modules/',
		'<rootDir>/docs/',
		'<rootDir>/icon/',
		'<rootDir>/server/',
		'<rootDir>/.vscode/',
		'<rootDir>/.circleci/',
		'<rootDir>/coverage/'
	],
	testURL: 'http://localhost/',
	testEnvironment: 'node'
}
