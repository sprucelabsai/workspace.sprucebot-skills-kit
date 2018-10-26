module.exports = {
	verbose: true,
	setupFiles: ['<rootDir>/jest/enzymeSetup.js'],
	coverageDirectory: './coverage/',
	collectCoverage: true,
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
