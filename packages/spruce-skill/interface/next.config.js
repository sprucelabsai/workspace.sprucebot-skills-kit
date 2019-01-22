const path = require('path')
const fs = require('fs')
const config = require('config')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

function server(webpack) {
	return webpack
}

function client(webpack) {
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
			// Might be necessary to uncomment below if 'yarn link'-ing @sprucelabs/react-heartwood-components, @sprucelabs/spruce-skill-server or @sprucelabs/log
			// react: path.resolve(__dirname, '../node_modules', 'react'),
			// next: path.resolve(__dirname, '../node_modules', 'next'),
			// '@sprucelabs/log': path.resolve(
			// 	__dirname,
			// 	'../node_modules',
			// 	'@sprucelabs/log'
			// )
		}
	}

	webpack.node = {
		fs: 'empty'
	}

	return webpack
}

function shared(webpack) {
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
