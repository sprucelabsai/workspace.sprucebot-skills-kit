import React from 'react'

const LinkPile = ({ className, ...props }) => {
	return <div {...props} className={`link__pile ${className || ''}`} />
}

export default LinkPile
