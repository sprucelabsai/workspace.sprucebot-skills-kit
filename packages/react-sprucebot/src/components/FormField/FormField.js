import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import TextArea from 'react-textarea-autosize'

import { Paragraph as P } from '../Typography/Typography'

export const FieldWrapper = styled.div.attrs({
	className: classnames('InputField', 'input__wrapper')
})``

export const FieldError = styled.span.attrs({
	className: classnames('FieldError', 'input__error', 'error-is-visible')
})``

export const FieldLabel = styled.span.attrs({
	className: classnames('FieldLabel', 'input__mini__label', 'js-show-label')
})``

export default function Field({
	input: { value, onChange, name },
	meta: { touched, error },
	type,
	finePrint,
	label,
	placeholder = label,
	children
}) {
	return (
		<FieldWrapper>
			{label && value && <FieldLabel>{label}</FieldLabel>}
			{React.cloneElement(children, {
				className: classnames({ with_label: !!label }),
				name,
				value,
				onChange,
				type,
				placeholder
			})}
			{touched && error && <FieldError>{error}</FieldError>}
			{finePrint && <P fine>{finePrint}</P>}
		</FieldWrapper>
	)
}

Field.propTypes = {
	input: PropTypes.shape({
		value: PropTypes.any.isRequired,
		onChange: PropTypes.func.isRequired
	}).isRequired,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.string
	}).isRequired,
	children: PropTypes.element.isRequired
}
