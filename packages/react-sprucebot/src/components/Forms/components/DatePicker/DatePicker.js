// @flow
import React, { Component } from 'react'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import Button from '../../../Button/Button'
import ArrowNext from '../../../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../../../static/assets/icons/ic_arrow_back.svg'

export interface Props {}

type State = {
	date: Object,
	isFocused: boolean
}

export default class DatePicker extends Component<Props, State> {
	state = {
		isFocused: false,
		date: moment()
	}

	toggleFocus = () => {
		this.setState(prevState => ({
			isFocused: !prevState.isFocused
		}))
	}

	handleDateChange = (date: any) => {
		this.setState({
			date
		})
	}

	render() {
		const { isFocused, date } = this.state
		const { ...rest } = this.props
		return (
			<SingleDatePicker
				date={date}
				focused={isFocused}
				onDateChange={date => this.handleDateChange(date)}
				onFocusChange={this.toggleFocus}
				navNext={<ArrowNext />}
				navPrev={<ArrowBack />}
				{...rest}
			/>
		)
	}
}
