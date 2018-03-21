module.exports = {
	verbose: true,
	setupFiles: ['<rootDir>/jest/enzymeSetup.js'],
	coverageDirectory: './coverage/',
	collectCoverage: true,
	snapshotSerializers: ['enzyme-to-json/serializer'],
	coveragePathIgnorePatterns: [
		'<rootDir>/lib/',
		'<rootDir>/config/',
		'<rootDir>/jest/',
		'<rootDir>/node_modules/'
	]
}
