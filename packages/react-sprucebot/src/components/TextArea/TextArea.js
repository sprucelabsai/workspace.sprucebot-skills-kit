import React from 'react'
import styled from 'styled-components'
import TextArea from 'react-textarea-autosize'

import FormField from '../FormField/FormField'

const StyledTextArea = styled(TextArea).attrs({
	className: 'TextArea'
})`
	min-height: 1em;
`

export default function TextAreaField(props) {
	return (
		<FormField {...props}>
			<StyledTextArea />
		</FormField>
	)
}
