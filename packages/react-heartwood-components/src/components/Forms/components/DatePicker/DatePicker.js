// @flow
import React, { Component } from 'react'
import 'react-dates/initialize'
import { DayPickerSingleDateController } from 'react-dates'
import moment from 'moment'
import ArrowNext from '../../../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../../../static/assets/icons/ic_arrow_back.svg'

export type Props = { onSelectDate: Function, date?: Object }

type State = {
	date: Object,
	isFocused: boolean
}

export default class DatePicker extends Component<Props, State> {
	constructor(props) {
		super(props)
		this.state = {
			isFocused: true,
			date: this.props.date || moment()
		}

		this.datePickerRef = React.createRef()
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.date !== nextProps.date) {
			this.setState({ date: nextProps.date })
		}
	}

	toggleFocus = () => {
		this.setState(prevState => ({
			isFocused: !prevState.isFocused
		}))
	}

	handleDateChange = async (date: any) => {
		this.datePickerRef.current.setState({ currentMonth: date })

		this.setState({
			date
		})
		if (this.props.onSelectDate) {
			this.props.onSelectDate(date)
		}
	}

	render() {
		const { isFocused, date } = this.state
		const { onSelectDate, ...rest } = this.props
		return (
			<DayPickerSingleDateController
				ref={this.datePickerRef}
				date={date}
				initialVisibleMonth={() => date}
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
