export default (() => {
	if (!global || !global._babelPolyfill) {
		require('babel-core/register')
		require('babel-polyfill')
	}
})()
