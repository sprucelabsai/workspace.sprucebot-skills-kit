import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import '../src/stylesheets/vendor.sass'
import '../src/stylesheets/global.sass'
// import '@sprucelabs/heartwood-components/stylesheets/global.scss'
import '../../sprucebot-heartwood/stylesheets/global.scss'

const StylesProvider = ({ children }) => {
	const stylesheets =
		process.env.STYLESHEETS && process.env.STYLESHEETS.split(',')

	return (
		<Fragment>
			<Helmet>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500|Source+Sans+Pro:400,600"
				/>
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
