// @flow
import React, { Component } from 'react'
import ReactPhoneInput from 'react-phone-number-input'
import cx from 'classnames'
import { InputPre, InputHelper } from '../../FormPartials'

type Props = {
	label: string,
	isSmall?: boolean
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
		const { label, error, isSmall, ...rest } = this.props
		return (
			<div className={cx('text-input', { 'text-input-small': isSmall })}>
				<InputPre label={label} />
				<ReactPhoneInput
					inputClassName="text-input__input"
					value={phone}
					countries={['US', 'GB', 'CA']}
					country="US"
					labels={{ US: 'United States', GB: 'Great Britain', CA: 'Canada' }}
					onChange={this.handleChange}
					international={false}
					{...rest}
				/>
				{error && <InputHelper error={error} />}
			</div>
		)
	}
}
