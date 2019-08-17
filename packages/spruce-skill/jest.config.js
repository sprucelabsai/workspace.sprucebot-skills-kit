module.exports = {
	verbose: true,
	setupFiles: ['<rootDir>/jest/enzymeSetup.js'],
	testPathIgnorePatterns: [
		'<rootDir>/interface/.next',
		'<rootDir>/config/test.js',
		'<rootDir>/config/',
		'<rootDir>/docs/',
		'<rootDir>/icon/',
		'<rootDir>/server/',
		'<rootDir>/.vscode/',
		'<rootDir>/.circleci/',
		'<rootDir>/coverage/',
		'<rootDir>/build/'
	],
	// coverageDirectory: './coverage/',
	collectCoverage: true,
	// collectCoverage: false,
	snapshotSerializers: ['enzyme-to-json/serializer'],
	coveragePathIgnorePatterns: [
		'<rootDir>/config/',
		'<rootDir>/jest/',
		'<rootDir>/node_modules/',
		'<rootDir>/docs/',
		'<rootDir>/icon/',
		'<rootDir>/server/',
		'<rootDir>/.vscode/',
		'<rootDir>/.circleci/',
		'<rootDir>/coverage/',
		'<rootDir>/build/'
	],
	testURL: 'http://localhost/',
	testEnvironment: 'node',
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': '<rootDir>/interface/__mocks__/styleMock.js'
	}
}
