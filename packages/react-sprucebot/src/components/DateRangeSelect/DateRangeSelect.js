import 'react-dates/initialize'
import React, { Component } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import PropTypes from 'prop-types'
import requiredIf from 'react-required-if'
import { DayPickerRangeController } from 'react-dates'

import Loader from '../Loader/Loader'
import Icon from '../Icon/Icon'

class DateRangeSelect extends Component {
	state = {
		focusedInput: 'startDate',
		defaultDateSet: false,
		today: this.props.timezone
			? moment()
					.tz(this.props.timezone)
					.format('YYYY-MM-DD')
			: moment().format('YYYY-MM-DD')
	}

	componentDidMount = () => {
		const { setDefaultDates } = this.props
		const { defaultDateSet } = this.state

		if (setDefaultDates && !defaultDateSet) {
			this.setDefaultDates()
		}
	}

	isDayBlocked = date => {
		const { availableDates } = this.props

		if (!availableDates) {
			return false
		}

		const match = (availableDates || []).find(
			day => day === date.format('YYYY-MM-DD')
		)
		const lastDate = moment(availableDates[availableDates.length - 1]).endOf(
			'month'
		)

		if (match || date.isAfter(lastDate) || date.isSame(lastDate)) {
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

	setDefaultDates = () => {
		const { defaultStartDate, defaultEndDate } = this.props

		this.setState({
			startDate: defaultStartDate,
			endDate: defaultEndDate,
			defaultDateSet: true
		})
	}

	handleDateChange = (selectedStart, selectedEnd) => {
		const { onDatesChange = () => {}, weekSelection } = this.props

		if (weekSelection) {
			const startOfWeek = moment(selectedStart).startOf('week')
			const endOfWeek = moment(selectedStart).endOf('week')

			onDatesChange(startOfWeek, endOfWeek)
			this.setState({
				startDate: startOfWeek,
				endDate: endOfWeek,
				focusedInput: 'startDate'
			})
		} else {
			const { startDate, endDate } = this.getNextState(
				selectedStart,
				selectedEnd
			)

			onDatesChange(startDate, endDate)
			this.setState({ startDate, endDate })
		}
	}

	getNextState = (selectedStart, selectedEnd) => {
		const { startDate, endDate } = this.state
		if (selectedEnd && selectedEnd.isSame(endDate)) {
			return {
				startDate: selectedStart,
				endDate: null
			}
		} else if (startDate && endDate) {
			return {
				startDate: selectedEnd || selectedStart,
				endDate: null
			}
		} else {
			return {
				startDate: selectedStart,
				endDate: selectedEnd
			}
		}
	}

	handleFocusChange = focusedInput => {
		this.setState({ focusedInput: focusedInput || 'startDate' })
	}

	render() {
		const { startDate, endDate, focusedInput } = this.state
		const {
			numberOfMonths,
			weekSelection,
			enableOutsideDays,
			initialVisibleMonth,
			onPrevMonthClick,
			onNextMonthClick,
			orientation,
			loading
		} = this.props

		const wrapperClass = classnames('date_picker', 'date_select__wrapper', {
			loading: loading,
			outside_days: enableOutsideDays,
			week_selection: weekSelection
		})

		return (
			<div className={wrapperClass}>
				<div className={`date_select__loader ${loading ? 'loading' : ''}`}>
					<Loader />
				</div>

				<DayPickerRangeController
					startDate={startDate}
					endDate={endDate}
					onDatesChange={({ startDate, endDate }) =>
						this.handleDateChange(startDate, endDate)
					}
					focusedInput={loading ? null : focusedInput}
					onFocusChange={focusedInput => this.handleFocusChange(focusedInput)}
					numberOfMonths={numberOfMonths || 1}
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
							{orientation === 'vertical'
								? 'keyboard_arrow_up'
								: 'chevron_left'}
						</Icon>
					}
					navNext={
						<Icon className={`date_select__icon ${loading ? 'loading' : ''}`}>
							{orientation === 'vertical'
								? 'keyboard_arrow_down'
								: 'chevron_right'}
						</Icon>
					}
					enableOutsideDays={enableOutsideDays}
					keepOpenOnDateSelect
					hideKeyboardShortcutsPanel
					orientation={orientation}
				/>
			</div>
		)
	}
}

export default DateRangeSelect

DateRangeSelect.propTypes = {
	availableDates: PropTypes.array,
	allowPastDates: PropTypes.bool,
	onDatesChange: PropTypes.func.isRequired,
	numberOfMonths: PropTypes.number,
	weekSelection: PropTypes.bool,
	enableOutsideDays: PropTypes.bool,
	setDefaultDates: PropTypes.bool,
	defaultStartDate: PropTypes.any,
	defaultEndDate: PropTypes.any,
	initialVisibleMonth: PropTypes.func,
	onPrevMonthClick: PropTypes.func,
	onNextMonthClick: PropTypes.func,
	orientation: PropTypes.sting,
	loading: PropTypes.bool
}

DateRangeSelect.defaultProps = {
	allowPastDates: false,
	loading: false
}
