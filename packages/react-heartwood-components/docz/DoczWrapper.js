import React from 'react'
import Helmet from 'react-helmet'

const DoczWrapper = ({ children }) => {
	return (
		<div>
			<Helmet>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://unpkg.com/@sprucelabs/heartwood-components@8.15.3-canary.2/public/stylesheets/heartwood-components.css"
				/>
			</Helmet>
			{children}
		</div>
	)
}

export default DoczWrapper
