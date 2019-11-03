import React from 'react'

const BasicAnchor = ({ className, children, href, target, onClick }) => (
	<a className={className} href={href} target={target} onClick={onClick}>
		{children}
	</a>
)

export default BasicAnchor
