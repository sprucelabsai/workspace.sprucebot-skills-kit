import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import FormField from '../FormField/FormField'

const StyledSelect = styled.select.attrs({
	className: classnames('SelectField', 'custom_dropdown')
})``

export default function TextAreaField({ children, ...props }) {
	return (
		<FormField {...props}>
			<StyledSelect>{children}</StyledSelect>
		</FormField>
	)
}
