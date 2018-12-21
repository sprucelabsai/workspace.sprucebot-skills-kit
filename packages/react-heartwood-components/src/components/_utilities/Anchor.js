import React from 'react'

const BasicAnchor = ({ className, children, href, target }) => (
	<a className={className} href={href} target={target}>
		{children}
	</a>
)

export default BasicAnchor
