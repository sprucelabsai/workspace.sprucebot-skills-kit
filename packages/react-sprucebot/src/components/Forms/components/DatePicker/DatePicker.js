// @flow
import React, { Component } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

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
				{...rest}
			/>
		)
	}
}
