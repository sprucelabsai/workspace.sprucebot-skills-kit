// @flow
import React, { Fragment } from 'react'

type Props = {
	className: string,
	linkClassName: string
}

const Legal = (props: Props) => {
	const { className, linkClassName } = props
	return (
		<Fragment>
			<p className={className}>
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClassName}
				>
					Terms of Service
				</a>
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					className={linkClassName}
				>
					Privacy Policy
				</a>
			</p>
			<p className={className}>© Spruce Labs 2018</p>
		</Fragment>
	)
}

export default Legal
