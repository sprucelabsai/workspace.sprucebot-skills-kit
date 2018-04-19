module.exports = {
    extends: [
        '@commitlint/config-conventional'
    ],
    rules: {
        'scope-case': [0],
        'subject-case': [1, 'always', ['sentence-case', 'lower-case']],
        'header-max-length': [1, 'always', 72]
    }
}
