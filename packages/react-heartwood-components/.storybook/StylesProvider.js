import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import '../src/stylesheets/global.sass'
import '../../heartwood-components/stylesheets/heartwood-components.scss'

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
			{children}
		</Fragment>
	)
}

export default StylesProvider
