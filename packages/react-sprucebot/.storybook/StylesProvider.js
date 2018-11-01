import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import '../src/stylesheets/vendor.sass'
import '../src/stylesheets/global.sass'
import '@sprucelabs/heartwood-components/stylesheets/global.scss'

const StylesProvider = ({ children }) => {
	const stylesheets =
		process.env.STYLESHEETS && process.env.STYLESHEETS.split(',')

	return (
		<Fragment>
			{stylesheets &&
				stylesheets.length > 0 && (
					<Helmet>
						{stylesheets.map((stylesheet, idx) => (
							<link key={idx} rel="stylesheet" href={stylesheet} />
						))}
					</Helmet>
				)}
			{children}
		</Fragment>
	)
}

export default StylesProvider
