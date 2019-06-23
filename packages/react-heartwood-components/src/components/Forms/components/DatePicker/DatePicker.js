// @flow
import React, { Component } from 'react'
import 'react-dates/initialize'
import {
	DayPickerSingleDateController,
	DayPickerRangeController
} from 'react-dates'
import moment from 'moment'
import ArrowNext from '../../../../../static/assets/icons/ic_arrow_forward.svg'
import ArrowBack from '../../../../../static/assets/icons/ic_arrow_back.svg'

export type Props = {
	kind: 'singleDate' | 'dateRange',
	onSelectDate?: Function,
	onSelectDateRange?: Function,
	date?: Object,
	initialStartDate?: Object,
	initialEndDate?: Object,
	daySize?: number
}

type State = {
	date: Object,
	startDate: Object,
	endDate: Object,
	isFocused: boolean,
	focusedInput: string
}

export default class DatePicker extends Component<Props, State> {
	datePickerRef: any

	static defaultProps = {
		kind: 'singleDate',
		initialStartDate: null,
		initialEndDate: null,
		daySize: 40
	}

	constructor(props) {
		super(props)
		this.state = {
			isFocused: true,
			date: this.props.date || moment(),
			startDate: this.props.initialStartDate,
			endDate: this.props.initialEndDate,
			focusedInput: 'startDate'
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

	handleFocusChange = focusedInput => {
		this.setState({
			// Force the focusedInput to always be truthy so that dates are always selectable
			focusedInput: !focusedInput ? 'startDate' : focusedInput
		})
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

	handleDatesChange = async ({ startDate, endDate }) => {
		this.setState({
			startDate,
			endDate
		})

		if (this.props.onSelectDateRange) {
			this.props.onSelectDateRange({ startDate, endDate })
		}
	}

	render() {
		const { isFocused, focusedInput, date, startDate, endDate } = this.state
		const { kind, ...rest } = this.props

		return kind === 'singleDate' ? (
			<DayPickerSingleDateController
				ref={this.datePickerRef}
				date={date}
				initialVisibleMonth={() => date}
				focused={isFocused}
				onDateChange={date => this.handleDateChange(date)}
				onFocusChange={this.toggleFocus}
				navNext={<ArrowNext />}
				navPrev={<ArrowBack />}
				hideKeyboardShortcutsPanel={true}
				{...rest}
			/>
		) : (
			<DayPickerRangeController
				onDatesChange={this.handleDatesChange}
				onFocusChange={this.handleFocusChange}
				focusedInput={focusedInput}
				startDate={startDate}
				endDate={endDate}
				navNext={<ArrowNext />}
				navPrev={<ArrowBack />}
				hideKeyboardShortcutsPanel={true}
				{...rest}
			/>
		)
	}
}
