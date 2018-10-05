import React from 'react'

const Pre = ({ className, ...props }) => {
	return <pre {...props} className={`pre ${className || ''}`} />
}

export default Pre
