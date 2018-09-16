const path = require('path')
const fs = require('fs')
const config = require('config')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config')

function server(webpack, options) {
	return webpack
}

function client(webpack, options) {
	const jsonPath = path.resolve(__dirname, './client.json')
	// Remove sensitive keys
	const clientConfig = config.sanitizeClientConfig({ ...config })
	// Export our whitelisted config for the client bundle
	fs.writeFileSync(jsonPath, JSON.stringify(clientConfig))
	webpack.plugins = webpack.plugins.filter(plugin => {
		// DEV_MODE=true configures the the nextjs `dev` value
		if (config.dev && plugin.constructor.name === 'UglifyJsPlugin') {
			return false
		} else {
			return true
		}
	})

	webpack.resolve = {
		alias: {
			config: jsonPath
		}
	}

	webpack = commonsChunkConfig(webpack, /\.(sass|scss|css)$/)

	console.log(require('util').inspect(webpack, true, 9999))

	return webpack
}

function shared(webpack, options) {
	return webpack
}

module.exports = withCSS(
	withSass({
		webpack: (webpack, options) => {
			webpack = shared(webpack, options)
			if (options.isServer) {
				return server(webpack, options)
			} else {
				return client(webpack, options)
			}
		}
	})
)
