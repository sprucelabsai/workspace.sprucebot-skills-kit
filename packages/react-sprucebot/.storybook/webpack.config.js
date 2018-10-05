// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	plugins: [
		// your custom plugins
		new MiniCssExtractPlugin('style.css'),
		new webpack.DefinePlugin({
			'process.env': {
				STYLESHEETS: JSON.stringify(process.env.STYLESHEETS)
			}
		})
	],
	module: {
		rules: [
			// add your custom rules.
			{
				test: /\.s(a|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	}
}
