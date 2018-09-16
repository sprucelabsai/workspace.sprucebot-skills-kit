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
		'<rootDir>/jest/'
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/lib/',
		'<rootDir>/config/',
		'<rootDir>/jest/',
		'node_modules'
	],
	testURL: 'http://localhost/',
	testEnvironment: 'node'
}
