// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({ config, mode }) => {
	return {
		...config,
		plugins: [
			...config.plugins,
			new MiniCssExtractPlugin('style.css'),
			new webpack.DefinePlugin({
				'process.env': {
					STYLESHEETS: JSON.stringify(process.env.STYLESHEETS)
				}
			})
		],
		resolve: {
			extensions: [...config.resolve.extensions, '.js', '.jsx', '.ts', '.tsx']
		},
		module: {
			rules: [
				...config.module.rules,
				{
					test: /\.(ts|tsx)$/,
					use: [
						{
							loader: require.resolve('awesome-typescript-loader')
						}
					]
				},
				{
					test: /\.s(a|c)ss$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
				},
				{
					test: /.*\.(gif|png|jpe?g)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								hash: 'sha512',
								digest: 'hex',
								name: '[hash].[ext]'
							}
						},
						{
							loader: 'image-webpack-loader',
							query: {
								pngquant: {
									quality: '65-90',
									speed: 4
								},
								mozjpeg: {
									quality: 65
								},
								gifsicle: {
									interlaced: false
								},
								optipng: {
									optimizationLevel: 4
								}
							}
						}
					]
				}
			]
		}
	}
}
