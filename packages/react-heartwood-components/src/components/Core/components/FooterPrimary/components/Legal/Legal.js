// @flow
import React, { Fragment } from 'react'
import moment from 'moment'

type Props = {
	/** Class for the text */
	className: string,

	/** Class for links */
	linkClassName: string
}

const Legal = (props: Props) => {
	const { className, linkClassName } = props
	return (
		<Fragment>
			<p className={className}>
				<a
					href="/terms-of-service"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClassName}
				>
					{`Terms of Service`}
				</a>
				<a
					href="/privacy-policy"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClassName}
				>
					{`Privacy Policy`}
				</a>
			</p>
			<p className={className}>{`© Spruce Labs ${moment().format('YYYY')}`}</p>
		</Fragment>
	)
}

export default Legal
