import React from 'react'
import TextArea from 'react-textarea-autosize'
import FormField from '../FormField/FormField'

const TextAreaField = ({ className, ...props }) => {
	return (
		<FormField {...props}>
			<StyledTextArea {...props} className={`TextArea ${className || ''}`} />
		</FormField>
	)
}

export default TextAreaField
