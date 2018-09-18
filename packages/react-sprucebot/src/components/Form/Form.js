import React from 'react'
import classnames from 'classnames'

const Form = ({ className, ...props }) => {
	return <form {...props} className={`Form ${className || ''}`} />
}

export default Form
