import React from 'react'

const Container = ({ className, ...props }) => {
	return <div {...props} className={`container ${className || ''}`} />
}

export default Container
