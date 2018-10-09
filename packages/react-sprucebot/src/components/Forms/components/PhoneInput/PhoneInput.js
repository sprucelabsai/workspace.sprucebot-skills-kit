// @flow
import React, { Component } from 'react'
import ReactPhoneInput from 'react-phone-number-input'
import { InputPre, InputHelper } from '../../FormPartials'

type Props = {
	label: string
}

type State = {
	phone: string,
	error: string
}

export default class PhoneInput extends Component<Props, State> {
	state = {
		phone: ''
	}
	handleChange = (phoneNumber: string) => {
		this.setState({
			phone: phoneNumber
		})
	}
	render() {
		const { phone } = this.state
		const { label, error, ...rest } = this.props
		return (
			<div className="text-input">
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
