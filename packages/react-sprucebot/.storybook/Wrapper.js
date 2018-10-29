import React from 'react'
import Helmet from 'react-helmet'
import '../src/stylesheets/vendor.sass'
import '../src/stylesheets/global.sass'
import '@sprucelabs/heartwood-components/stylesheets/global.scss'

const Wrapper = ({ children }) => {
	const stylesheets =
		process.env.STYLESHEETS && process.env.STYLESHEETS.split(',')

	return (
		<div className="l-page-wrapper">
			{stylesheets &&
				stylesheets.length > 0 && (
					<Helmet>
						<link
							rel="stylesheet"
							href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500|Source+Sans+Pro:400,600"
						/>
						{stylesheets.map((stylesheet, idx) => (
							<link key={idx} rel="stylesheet" href={stylesheet} />
						))}
					</Helmet>
				)}
			<div className="l-pa-medium">{children}</div>
		</div>
	)
}

export default Wrapper
