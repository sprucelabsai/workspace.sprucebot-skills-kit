module.exports = {
	branch: 'dev',
	npmPublish: false,
	verifyConditions: ['@semantic-release/changelog', '@semantic-release/github'],
	prepare: [
		{
			path: '@semantic-release/changelog',
			changelogFile: 'docs/CHANGELOG.md'
		},
		'@semantic-release/npm',
		'@semantic-release/git'
	],
	publish: ['@semantic-release/github'],
	success: ['@semantic-release/github'],
	fail: ['@semantic-release/github'],
	releaseRules: [
		{ breaking: true, release: 'major' },
		{ revert: true, release: 'patch' },
		// Angular
		{ type: 'feat', release: 'minor' },
		{ type: 'fix', release: 'patch' },
		{ type: 'perf', release: 'patch' },
		// Atom
		{ emoji: ':racehorse:', release: 'patch' },
		{ emoji: ':bug:', release: 'patch' },
		{ emoji: ':penguin:', release: 'patch' },
		{ emoji: ':apple:', release: 'patch' },
		{ emoji: ':checkered_flag:', release: 'patch' },
		// Ember
		{ tag: 'BUGFIX', release: 'patch' },
		{ tag: 'FEATURE', release: 'minor' },
		{ tag: 'SECURITY', release: 'patch' },
		// ESLint
		{ tag: 'Breaking', release: 'major' },
		{ tag: 'Fix', release: 'patch' },
		{ tag: 'Update', release: 'minor' },
		{ tag: 'New', release: 'minor' },
		// Express
		{ component: 'perf', release: 'patch' },
		{ component: 'deps', release: 'patch' },
		// JSHint
		{ type: 'FEAT', release: 'minor' },
		{ type: 'FIX', release: 'patch' },
		// Default
		{ type: '/.*/', release: 'patch' }
	]
}
