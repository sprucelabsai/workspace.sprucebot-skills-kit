import React from 'react'
import Helmet from 'react-helmet'
// import '../src/stylesheets/vendor.sass'
// import '../src/stylesheets/global.sass'
// import '@sprucelabs/heartwood-components/stylesheets/global.scss';

const Wrapper = ({ children }) => {
	const stylesheets = process.env.STYLESHEETS.split(',')
	return (
		<div className="l-page-wrapper">
			<Helmet>
				{stylesheets.map((stylesheet, idx) => (
					<link key={idx} rel="stylesheet" href={stylesheet} />
				))}
			</Helmet>
			<div className="l-pa-medium">{children}</div>
		</div>
	)
}

export default Wrapper
