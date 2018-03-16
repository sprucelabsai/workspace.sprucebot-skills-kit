module.exports = {
    extends: [
        '@commitlint/config-conventional'
    ],
    rules: {
        'scope-case': [0],
        'subject-case': [2, 'always', ['sentence-case', 'lower-case']]
    }
}
