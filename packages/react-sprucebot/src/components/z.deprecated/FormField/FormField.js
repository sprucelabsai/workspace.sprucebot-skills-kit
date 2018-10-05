import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TextArea from 'react-textarea-autosize'

import { Paragraph as P } from '../Typography/Typography'

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
		<div className={classnames('InputField', 'input__wrapper')}>
			{label &&
				value && (
					<span
						className={classnames(
							'FieldLabel',
							'input__mini__label',
							'js-show-label'
						)}
					>
						{label}
					</span>
				)}
			{React.cloneElement(children, {
				className: classnames({ with_label: !!label }),
				name,
				value,
				onChange,
				type,
				placeholder
			})}
			{touched &&
				error && (
					<span
						className={classnames(
							'FieldError',
							'input__error',
							'error-is-visible'
						)}
					>
						{error}
					</span>
				)}
			{finePrint && <P fine>{finePrint}</P>}
		</div>
	)
}

Field.propTypes = {
	input: PropTypes.shape({
		value: PropTypes.any.isRequired,
		onChange: PropTypes.func
	}).isRequired,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.string
	}).isRequired,
	children: PropTypes.element.isRequired
}
