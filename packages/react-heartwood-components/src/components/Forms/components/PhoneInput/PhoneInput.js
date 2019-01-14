// @flow
import React, { Component } from 'react'
import ReactPhoneInput from 'react-phone-number-input'
import cx from 'classnames'
import { InputPre, InputHelper } from '../../FormPartials'

// for validating and formatting
export { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'

type Props = {
	/** Label text */
	label: string,

	/** Set true to make the input less tall */
	isSmall?: boolean,

	/** Helper text */
	helper?: string,

	/** Any error messageto be rendered */
	error?: string
}

type State = {
	phone: string,
	error: string
}

export default class PhoneInput extends Component<Props, State> {
	state = {
		phone: '',
		error: ''
	}
	handleChange = (phoneNumber: string) => {
		this.setState({
			phone: phoneNumber
		})
	}
	render() {
		const { phone } = this.state
		const { label, error, isSmall, helper, ...rest } = this.props
		return (
			<div
				className={cx('text-input', {
					'text-input--has-error': error,
					'text-input-small': isSmall
				})}
			>
				<InputPre label={label} />
				<ReactPhoneInput
					inputClassName="text-input__input"
					value={phone}
					countries={['US']}
					country="US"
					labels={{ US: 'United States' }}
					onChange={this.handleChange}
					international={false}
					{...rest}
				/>
				{helper || (error && <InputHelper helper={helper} error={error} />)}
			</div>
		)
	}
}
