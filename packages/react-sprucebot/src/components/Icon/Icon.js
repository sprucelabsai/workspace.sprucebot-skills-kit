import React from 'react'

const Icon = ({ children, className, ...props }) => (
	<i className={`Icon icon ${className || ''}`} {...props}>
		{children}
	</i>
)

export default Icon
