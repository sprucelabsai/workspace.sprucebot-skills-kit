import React from 'react'

const SubmitWrapper = ({ className, ...props }) => {
	return <div {...props} className={`submit__wrapper ${className || ''}`} />
}

export default SubmitWrapper
