import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import FontLoader from '../src/components/FontLoader/FontLoader'

import '../../heartwood-components/stylesheets/heartwood-components.scss'

const fonts = [
	{
		name: 'Source Sans Pro',
		weight: 400,
		link: {
			href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
			rel: 'stylesheet'
		}
	},
	{
		name: 'Source Sans Pro',
		weight: 600,
		link: {
			href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:600',
			rel: 'stylesheet'
		}
	},
	{
		name: 'Source Code Pro',
		weight: 500,
		link: {
			href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:500',
			rel: 'stylesheet'
		}
	}
]
const StylesProvider = ({ children }) => {
	const stylesheets =
		process.env.STYLESHEETS && process.env.STYLESHEETS.split(',')

	return (
		<Fragment>
			<Helmet>
				{stylesheets &&
					stylesheets.length > 0 &&
					stylesheets.map((stylesheet, idx) => (
						<link key={idx} rel="stylesheet" href={stylesheet} />
					))}
			</Helmet>
			<FontLoader fonts={fonts} />
			{children}
		</Fragment>
	)
}

export default StylesProvider
