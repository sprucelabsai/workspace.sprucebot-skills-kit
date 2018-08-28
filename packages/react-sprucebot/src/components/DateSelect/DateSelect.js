import 'react-dates/initialize'
import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { DayPickerSingleDateController } from 'react-dates'

import Loader from '../Loader/Loader'
import Icon from '../Icon/Icon'

class DateSelect extends Component {
	state = {
		defaultDateSet: false,
		focused: 1,
		today: this.props.timezone
			? moment()
					.tz(this.props.timezone)
					.format('YYYY-MM-DD')
			: moment().format('YYYY-MM-DD')
	}

	componentDidMount = () => {
		const { defaultDateSet } = this.state

		if (!defaultDateSet) {
			this.setDefaultDate()
		}
	}

	isDayBlocked = date => {
		const { availableDates } = this.props

		if (!availableDates) {
			return false
		}

		const thisDate = date.format('YYYY-MM-DD')
		const match = availableDates.find(day => day === thisDate)

		if (match) {
			return false
		}

		return true
	}

	isOutsideRange = date => {
		const { today } = this.state
		const { allowPastDates } = this.props

		const pastDate = moment(date.format('YYYY-MM-DD')).isBefore(today)

		if (allowPastDates) {
			return false
		}

		if (date.format('YYYY-MM-DD') === today) {
			return false
		}

		if (pastDate) {
			return true
		}

		return false
	}

	handleDateChange = date => {
		const {
			onDateSelect = () => {
				console.log({ date })
			}
		} = this.props

		onDateSelect(date)
		this.setState({ date })
	}

	setDefaultDate = () => {
		const { defaultDate } = this.props

		this.setState({ date: defaultDate, defaultDateSet: true })
	}

	get value() {
		return this.state.date
	}

	render() {
		const { date } = this.state
		const {
			initialVisibleMonth,
			onPrevMonthClick,
			onNextMonthClick,
			loading
		} = this.props

		return (
			<div
				className={`date_picker date_select__wrapper ${
					loading ? 'loading' : ''
				}`}
			>
				<div className={`date_select__loader ${loading ? 'loading' : ''}`}>
					<Loader />
				</div>

				<DayPickerSingleDateController
					date={date || null}
					onDateChange={this.handleDateChange}
					focused={!loading}
					onFocusChange={({ focused }) => this.setState({ focused })}
					numberOfMonths={1}
					isDayBlocked={this.isDayBlocked}
					isOutsideRange={this.isOutsideRange}
					initialVisibleMonth={initialVisibleMonth}
					onPrevMonthClick={prevMonth =>
						onPrevMonthClick && onPrevMonthClick(prevMonth)
					}
					onNextMonthClick={nextMonth =>
						onNextMonthClick && onNextMonthClick(nextMonth)
					}
					navPrev={
						<Icon className={`date_select__icon ${loading ? 'loading' : ''}`}>
							chevron_left
						</Icon>
					}
					navNext={
						<Icon className={`date_select__icon ${loading ? 'loading' : ''}`}>
							chevron_right
						</Icon>
					}
					keepOpenOnDateSelect
					hideKeyboardShortcutsPanel
					noBorder
				/>
			</div>
		)
	}
}

export default DateSelect

DateSelect.propTypes = {
	availableDates: PropTypes.array,
	allowPastDates: PropTypes.bool,
	onDateSelect: PropTypes.func.isRequired,
	setDefaultDate: PropTypes.bool,
	defaultDate: PropTypes.any,
	initialVisibleMonth: PropTypes.func,
	onNextMonthClick: PropTypes.func,
	onPrevMonthClick: PropTypes.func,
	loading: PropTypes.bool,
	highlightDates: PropTypes.array
}

DateSelect.defaultProps = {
	allowPastDates: false,
	loading: false
}
