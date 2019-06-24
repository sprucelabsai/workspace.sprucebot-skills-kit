import { css } from 'styled-components'
import { css as cssPlugin } from 'docz-plugin-css'

const path = require('path')

export default {
	wrapper: 'docz/DoczWrapper',
	plugins: [
		cssPlugin({
			preprocessor: 'sass',
			cssmodules: false,
			loaderOpts: {
				includePaths: [path.resolve(__dirname, 'src')]
			}
		})
	],
	// theme: 'docz/theme',
	themeConfig: {
		colors: {
			primary: '#1953cb',
			blockquoteBg: '#fff',
			blockquoteBorder: '#fff',
			blockquoteColor: '#525966'
		},
		styles: {
			h3: css`
				margin: 25px 0 10px;
				font-size: 20px;
				font-weight: 600;
			`,
			blockquote: css`
				margin: 25px 0;
				font-size: 32px;
			`
		}
	},
	menu: [
		'React Heartwood Components',
		{
			name: 'Buttons',
			menu: ['Button', 'ButtonGroup', 'ContextMenu']
		}
	]
}
