import { css } from 'styled-components'
export default {
	wrapper: 'docz/DoczWrapper',
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
