import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Page, { PageContent } from '../src/components/Page'
import FontLoader from '../src/components/FontLoader/FontLoader'

import '@sprucelabs/heartwood-components/stylesheets/heartwood-components.scss'

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

const Wrapper = props => {
	const stylesheets =
		process.env.STYLESHEETS && process.env.STYLESHEETS.split(',')
	const meta = (
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
	)

	if (!props.STORYBOOKwrap) {
		return (
			<div className="main-wrapper">
				<Helmet>
					{stylesheets &&
						stylesheets.length > 0 &&
						stylesheets.map((stylesheet, idx) => (
							<link key={idx} rel="stylesheet" href={stylesheet} />
						))}
					{meta}
				</Helmet>
				<FontLoader fonts={fonts} />
				{props.children}
			</div>
		)
	}

	return (
		<div className="main-wrapper">
			<Helmet>
				{stylesheets &&
					stylesheets.length > 0 &&
					stylesheets.map((stylesheet, idx) => (
						<link key={idx} rel="stylesheet" href={stylesheet} />
					))}
				{meta}
			</Helmet>
			<FontLoader fonts={fonts} />
			<Page>
				<PageContent>{props.children}</PageContent>
			</Page>
		</div>
	)
}

export default Wrapper
