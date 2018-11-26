import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import '../src/stylesheets/vendor.sass'
import '../src/stylesheets/global.sass'
import '@sprucelabs/heartwood-components/stylesheets/global.scss'

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
			<div className="l-page-wrapper">
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
					{meta}
				</Helmet>
				{props.children}
			</div>
		)
	}

	return (
		<div className="l-page-wrapper">
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
				{meta}
			</Helmet>
			<div className="l-pa-medium">{props.children}</div>
		</div>
	)
}

export default Wrapper
