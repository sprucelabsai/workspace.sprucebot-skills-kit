import React from 'react'
import classnames from 'classnames'

import FormField from '../FormField/FormField'

const TextAreaField = ({ children, ...props }) => {
	return (
		<FormField {...props}>
			<select
				{...props}
				className={classnames('SelectField', 'custom_dropdown')}
			>
				{children}
			</select>
		</FormField>
	)
}

export default TextAreaField
