import 'react-dates/initialize'
import React, { Component } from 'react'
import styled from 'styled-components'
import { DayPickerSingleDateController } from 'react-dates'
import IconButton from '../IconButton/IconButton'
import moment from 'moment'
import Icon from '../Icon/Icon'

const Wrapper = styled.div`
	.PresetDateRangePicker_panel {
		padding: 0 22px 11px;
	}
	.PresetDateRangePicker_button {
		position: relative;
		height: 100%;
		text-align: center;
		background: 0 0;
		border: 2px solid #00a699;
		color: #00a699;
		padding: 4px 12px;
		margin-right: 8px;
		font: inherit;
		font-weight: 700;
		line-height: normal;
		overflow: visible;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		cursor: pointer;
	}
	.PresetDateRangePicker_button:active {
		outline: 0;
	}
	.PresetDateRangePicker_button__selected {
		color: #fff;
		background: #00a699;
	}
	.SingleDatePickerInput {
		display: inline-block;
		background-color: #fff;
	}
	.SingleDatePickerInput__withBorder {
		border: 1px solid #dbdbdb;
	}
	.SingleDatePickerInput__rtl {
		direction: rtl;
	}
	.SingleDatePickerInput__disabled {
		background-color: #f2f2f2;
	}
	.SingleDatePickerInput__block {
		display: block;
	}
	.SingleDatePickerInput__showClearDate {
		padding-right: 30px;
	}
	.SingleDatePickerInput_clearDate {
		display: flex;
		justify-content: flex-end;
		background: 0 0;
		border: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		cursor: pointer;
		padding: 10px;
		margin: 0 10px 0 5px;
		position: absolute;
		right: 0;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.SingleDatePickerInput_clearDate__default:focus,
	.SingleDatePickerInput_clearDate__default:hover {
		background: #dbdbdb;
		border-radius: 50%;
	}
	.SingleDatePickerInput_clearDate__small {
		padding: 6px;
	}
	.SingleDatePickerInput_clearDate__hide {
		visibility: hidden;
	}
	.SingleDatePickerInput_clearDate_svg {
		fill: #82888a;
		height: 12px;
		width: 15px;
		vertical-align: middle;
	}
	.SingleDatePickerInput_clearDate_svg__small {
		height: 9px;
	}
	.SingleDatePickerInput_calendarIcon {
		background: 0 0;
		border: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		cursor: pointer;
		display: inline-block;
		vertical-align: middle;
		padding: 10px;
		margin: 0 5px 0 10px;
	}
	.SingleDatePickerInput_calendarIcon_svg {
		fill: #82888a;
		height: 15px;
		width: 14px;
		vertical-align: middle;
	}
	.SingleDatePicker {
		position: relative;
		display: inline-block;
	}
	.SingleDatePicker__block {
		display: block;
	}
	.SingleDatePicker_picker {
		background-color: #fff;
	}
	.SingleDatePicker_picker__rtl {
		direction: rtl;
	}
	.SingleDatePicker_picker__directionLeft {
		left: 0;
	}
	.SingleDatePicker_picker__directionRight {
		right: 0;
	}
	.SingleDatePicker_picker__portal {
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.SingleDatePicker_picker__fullScreenPortal {
		background-color: #fff;
	}
	.SingleDatePicker_closeButton {
		background: 0 0;
		border: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0;
		padding: 15px;
		z-index: 2;
	}
	.SingleDatePicker_closeButton:focus,
	.SingleDatePicker_closeButton:hover {
		color: darken(#cacccd, 10%);
		text-decoration: none;
	}
	.SingleDatePicker_closeButton_svg {
		height: 15px;
		width: 15px;
		fill: #cacccd;
	}
	.DayPickerKeyboardShortcuts_buttonReset {
		background: 0 0;
		border: 0;
		border-radius: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		padding: 0;
		cursor: pointer;
		font-size: 14px;
	}
	.DayPickerKeyboardShortcuts_buttonReset:active {
		outline: 0;
	}
	.DayPickerKeyboardShortcuts_show {
		width: 22px;
		position: absolute;
		z-index: 2;
	}
	.DayPickerKeyboardShortcuts_show__bottomRight {
		border-top: 26px solid transparent;
		border-right: 33px solid #00a699;
		bottom: 0;
		right: 0;
	}
	.DayPickerKeyboardShortcuts_show__bottomRight:hover {
		border-right: 33px solid #008489;
	}
	.DayPickerKeyboardShortcuts_show__topRight {
		border-bottom: 26px solid transparent;
		border-right: 33px solid #00a699;
		top: 0;
		right: 0;
	}
	.DayPickerKeyboardShortcuts_show__topRight:hover {
		border-right: 33px solid #008489;
	}
	.DayPickerKeyboardShortcuts_show__topLeft {
		border-bottom: 26px solid transparent;
		border-left: 33px solid #00a699;
		top: 0;
		left: 0;
	}
	.DayPickerKeyboardShortcuts_show__topLeft:hover {
		border-left: 33px solid #008489;
	}
	.DayPickerKeyboardShortcuts_showSpan {
		color: #fff;
		position: absolute;
	}
	.DayPickerKeyboardShortcuts_showSpan__bottomRight {
		bottom: 0;
		right: -28px;
	}
	.DayPickerKeyboardShortcuts_showSpan__topRight {
		top: 1px;
		right: -28px;
	}
	.DayPickerKeyboardShortcuts_showSpan__topLeft {
		top: 1px;
		left: -28px;
	}
	.DayPickerKeyboardShortcuts_panel {
		overflow: auto;
		background: #fff;
		border: 1px solid #dbdbdb;
		border-radius: 2px;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 2;
		padding: 22px;
		margin: 33px;
	}
	.DayPickerKeyboardShortcuts_title {
		font-size: 16px;
		font-weight: 700;
		margin: 0;
	}
	.DayPickerKeyboardShortcuts_list {
		list-style: none;
		padding: 0;
		font-size: 14px;
	}
	.DayPickerKeyboardShortcuts_close {
		position: absolute;
		right: 22px;
		top: 22px;
		z-index: 2;
	}
	.DayPickerKeyboardShortcuts_close:active {
		outline: 0;
	}
	.DayPickerKeyboardShortcuts_closeSvg {
		height: 15px;
		width: 15px;
		fill: #cacccd;
	}
	.DayPickerKeyboardShortcuts_closeSvg:focus,
	.DayPickerKeyboardShortcuts_closeSvg:hover {
		fill: #82888a;
	}
	.CalendarDay {
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		cursor: pointer;
		font-size: 14px;
		text-align: center;
	}
	.CalendarDay:active {
		outline: 0;
	}
	.CalendarDay__defaultCursor {
		cursor: default;
	}
	.CalendarDay__default {
		border: 1px solid #e4e7e7;
		color: #565a5c;
		background: #fff;
	}
	.CalendarDay__default:hover {
		background: #e4e7e7;
		border: 1px double #e4e7e7;
		color: inherit;
	}
	.CalendarDay__hovered_offset {
		background: #f4f5f5;
		border: 1px double #e4e7e7;
		color: inherit;
	}
	.CalendarDay__outside {
		border: 0;
		background: #fff;
		color: #565a5c;
	}
	.CalendarDay__blocked_minimum_nights {
		background: #fff;
		border: 1px solid #eceeee;
		color: #cacccd;
	}
	.CalendarDay__blocked_minimum_nights:active,
	.CalendarDay__blocked_minimum_nights:hover {
		background: #fff;
		color: #cacccd;
	}
	.CalendarDay__highlighted_calendar {
		background: #ffe8bc;
		color: #565a5c;
	}
	.CalendarDay__highlighted_calendar:active,
	.CalendarDay__highlighted_calendar:hover {
		background: #ffce71;
		color: #565a5c;
	}
	.CalendarDay__selected_span {
		background: #66e2da;
		border: 1px solid #33dacd;
		color: #fff;
	}
	.CalendarDay__selected_span:active,
	.CalendarDay__selected_span:hover {
		background: #33dacd;
		border: 1px solid #33dacd;
		color: #fff;
	}
	.CalendarDay__last_in_range {
		border-right: #00a699;
	}
	.CalendarDay__selected,
	.CalendarDay__selected:active,
	.CalendarDay__selected:hover {
		background: #00aac7;
		border: 1px solid #00aac7;
		color: #fff;
	}
	.CalendarDay__hovered_span,
	.CalendarDay__hovered_span:hover {
		background: #b2f1ec;
		border: 1px solid #80e8e0;
		color: #007a87;
	}
	.CalendarDay__hovered_span:active {
		background: #80e8e0;
		border: 1px solid #80e8e0;
		color: #007a87;
	}
	.CalendarDay__blocked_calendar,
	.CalendarDay__blocked_calendar:active,
	.CalendarDay__blocked_calendar:hover {
		background: #cacccd;
		border: 1px solid #cacccd;
		color: #82888a;
	}
	.CalendarDay__blocked_out_of_range,
	.CalendarDay__blocked_out_of_range:active,
	.CalendarDay__blocked_out_of_range:hover {
		background: #fff;
		border: 1px solid #e4e7e7;
		color: #cacccd;
	}
	.CalendarMonth {
		background: #fff;
		text-align: center;
		padding: 0 13px;
		vertical-align: top;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.CalendarMonth_table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	.CalendarMonth_verticalSpacing {
		border-collapse: separate;
	}
	.CalendarMonth_caption {
		color: #565a5c;
		font-size: 18px;
		text-align: center;
		padding-top: 22px;
		padding-bottom: 37px;
		caption-side: initial;
	}
	.CalendarMonth_caption__verticalScrollable {
		padding-top: 12px;
		padding-bottom: 7px;
	}
	.CalendarMonthGrid {
		background: #fff;
		text-align: left;
		z-index: 0;
	}
	.CalendarMonthGrid__animating {
		z-index: 1;
	}
	.CalendarMonthGrid__horizontal {
		position: absolute;
		left: 9px;
	}
	.CalendarMonthGrid__vertical {
		margin: 0 auto;
	}
	.CalendarMonthGrid__vertical_scrollable {
		margin: 0 auto;
		overflow-y: scroll;
	}
	.CalendarMonthGrid_month__horizontal {
		display: inline-block;
		vertical-align: top;
		min-height: 100%;
	}
	.CalendarMonthGrid_month__hideForAnimation {
		position: absolute;
		z-index: -1;
		opacity: 0;
		pointer-events: none;
	}
	.CalendarMonthGrid_month__hidden {
		visibility: hidden;
	}
	.DayPickerNavigation_container {
		position: absolute;
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 1.75em;
		z-index: 2;
	}
	.DayPickerNavigation_container__vertical {
		background: #fff;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
		position: absolute;
		bottom: 0;
		left: 0;
		height: 52px;
		width: 100%;
	}
	.DayPickerNavigation_container__verticalScrollable {
		position: relative;
	}
	.DayPickerNavigation_button {
		cursor: pointer;
		line-height: 0.78;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.DayPickerNavigation_button__default {
		background-color: #fff;
		color: #757575;
	}
	.DayPickerNavigation_button__default:focus,
	.DayPickerNavigation_button__default:hover {
	}
	.DayPickerNavigation_button__default:active {
		background: #f2f2f2;
	}
	.DayPickerNavigation_button__horizontal {
		display: flex;
		justify-content: center;
		padding: 0;
		border-radius: 50%;
	}
	.DayPickerNavigation_leftButton__horizontal {
		height: 28px;
		width: 28px;
	}
	.DayPickerNavigation_rightButton__horizontal {
		height: 28px;
		width: 28px;
	}
	.DayPickerNavigation_button__vertical {
		display: inline-block;
		position: relative;
		height: 100%;
		width: 50%;
	}
	.DayPickerNavigation_button__vertical__default {
		padding: 5px;
	}
	.DayPickerNavigation_nextButton__vertical__default {
		border-left: 0;
	}
	.DayPickerNavigation_nextButton__verticalScrollable {
		width: 100%;
	}
	.DayPickerNavigation_svg__horizontal {
		height: 19px;
		width: 19px;
		fill: #82888a;
	}
	.DayPickerNavigation_svg__vertical {
		height: 42px;
		width: 42px;
		fill: #565a5c;
	}
	.DayPicker {
		background: #fff;
		position: relative;
		text-align: left;
	}
	.DayPicker__horizontal {
		background: #fff;
	}
	.DayPicker__verticalScrollable {
		height: 100%;
	}
	.DayPicker__hidden {
		visibility: hidden;
	}
	.DayPicker_portal__horizontal {
		box-shadow: none;
		position: absolute;
		left: 50%;
		top: 50%;
	}
	.DayPicker_portal__vertical {
		position: initial;
	}
	.DayPicker_focusRegion {
		outline: 0;
	}
	.DayPicker_calendarInfo__horizontal,
	.DayPicker_wrapper__horizontal {
		display: inline-block;
		vertical-align: top;
	}
	.DayPicker_weekHeaders {
		position: relative;
	}
	.DayPicker_weekHeaders__horizontal {
		margin-left: 9px;
	}
	.DayPicker_weekHeader {
		color: #757575;
		position: absolute;
		top: 55px;
		z-index: 2;
		padding: 0 13px;
		text-align: left;
	}
	.DayPicker_weekHeader__vertical {
		left: 50%;
	}
	.DayPicker_weekHeader__verticalScrollable {
		top: 0;
		display: table-row;
		border-bottom: 1px solid #dbdbdb;
		background: #fff;
		margin-left: 0;
		left: 0;
		width: 100%;
		text-align: center;
	}
	.DayPicker_weekHeader_ul {
		list-style: none;
		margin: 1px 0;
		padding-left: 0;
		padding-right: 0;
		font-size: 14px;
	}
	.DayPicker_weekHeader_li {
		display: inline-block;
		text-align: center;
	}
	.DayPicker_transitionContainer {
		position: relative;
		overflow: hidden;
		border-radius: 3px;
	}
	.DayPicker_transitionContainer__horizontal {
		-webkit-transition: height 0.2s ease-in-out;
		-moz-transition: height 0.2s ease-in-out;
		transition: height 0.2s ease-in-out;
	}
	.DayPicker_transitionContainer__vertical {
		width: 100%;
	}
	.DayPicker_transitionContainer__verticalScrollable {
		padding-top: 20px;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		overflow-y: scroll;
	}
	.DateInput {
		margin: 0;
		padding: 0;
		background: #fff;
		position: relative;
		display: inline-block;
		width: 130px;
		vertical-align: middle;
	}
	.DateInput__small {
		width: 90px;
	}
	.DateInput__block {
		width: 100%;
	}
	.DateInput__disabled {
		background: #f2f2f2;
		color: #dbdbdb;
	}
	.DateInput_input {
		font-weight: 200;
		font-size: 18px;
		line-height: 24px;
		color: #565a5c;
		background-color: #fff;
		width: 100%;
		padding: 13px 12px 11px;
		border: 0;
		border-top: 0;
		border-right: 0;
		border-bottom: 2px solid transparent;
		border-left: 0;
	}
	.DateInput_input__small {
		font-size: 14px;
		line-height: 18px;
		padding: 8px 8px 6px;
	}
	.DateInput_input__regular {
		font-weight: auto;
	}
	.DateInput_input__readOnly {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.DateInput_input__focused {
		outline: 0;
		background: #fff;
		border: 0;
		border-top: 0;
		border-right: 0;
		border-bottom: 2px solid #1baac5;
		border-left: 0;
	}
	.DateInput_input__disabled {
		background: #f2f2f2;
		font-style: italic;
	}
	.DateInput_screenReaderMessage {
		border: 0;
		clip: rect(0, 0, 0, 0);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}
	.DateInput_fang {
		display: none;
		position: absolute;
		width: 20px;
		height: 10px;
		left: 22px;
		z-index: 2;
	}
	.DateInput_fangShape {
		fill: #fff;
	}
	.DateInput_fangStroke {
		stroke: #dbdbdb;
		fill: transparent;
	}
	.DateRangePickerInput {
		background-color: #fff;
		display: inline-block;
	}
	.DateRangePickerInput__disabled {
		background: #f2f2f2;
	}
	.DateRangePickerInput__withBorder {
		border: 1px solid #cacccd;
	}
	.DateRangePickerInput__rtl {
		direction: rtl;
	}
	.DateRangePickerInput__block {
		display: block;
	}
	.DateRangePickerInput__showClearDates {
		padding-right: 30px;
	}
	.DateRangePickerInput_arrow {
		display: inline-block;
		vertical-align: middle;
	}
	.DateRangePickerInput_arrow_svg {
		vertical-align: middle;
		fill: #565a5c;
		height: 24px;
		width: 24px;
	}
	.DateRangePickerInput_arrow_svg__small {
		height: 19px;
		width: 19px;
	}
	.DateRangePickerInput_clearDates {
		background: 0 0;
		border: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		cursor: pointer;
		padding: 10px;
		margin: 0 10px 0 5px;
		position: absolute;
		right: 0;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.DateRangePickerInput_clearDates__small {
		padding: 6px;
	}
	.DateRangePickerInput_clearDates_default:focus,
	.DateRangePickerInput_clearDates_default:hover {
		background: #dbdbdb;
		border-radius: 50%;
	}
	.DateRangePickerInput_clearDates__hide {
		visibility: hidden;
	}
	.DateRangePickerInput_clearDates_svg {
		fill: #82888a;
		height: 12px;
		width: 15px;
		vertical-align: middle;
	}
	.DateRangePickerInput_clearDates_svg__small {
		height: 9px;
	}
	.DateRangePickerInput_calendarIcon {
		background: 0 0;
		border: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		cursor: pointer;
		display: inline-block;
		vertical-align: middle;
		padding: 10px;
		margin: 0 5px 0 10px;
	}
	.DateRangePickerInput_calendarIcon_svg {
		fill: #82888a;
		height: 15px;
		width: 14px;
		vertical-align: middle;
	}
	.DateRangePicker {
		position: relative;
		display: inline-block;
	}
	.DateRangePicker__block {
		display: block;
	}
	.DateRangePicker_picker {
		z-index: 1;
		background-color: #fff;
		position: absolute;
	}
	.DateRangePicker_picker__rtl {
		direction: rtl;
	}
	.DateRangePicker_picker__directionLeft {
		left: 0;
	}
	.DateRangePicker_picker__directionRight {
		right: 0;
	}
	.DateRangePicker_picker__portal {
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.DateRangePicker_picker__fullScreenPortal {
		background-color: #fff;
	}
	.DateRangePicker_closeButton {
		background: 0 0;
		border: 0;
		color: inherit;
		font: inherit;
		line-height: normal;
		overflow: visible;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0;
		padding: 15px;
		z-index: 2;
	}
	.DateRangePicker_closeButton:focus,
	.DateRangePicker_closeButton:hover {
		color: darken(#cacccd, 10%);
		text-decoration: none;
	}
	.DateRangePicker_closeButton_svg {
		height: 15px;
		width: 15px;
		fill: #cacccd;
	}
`

const NavButton = styled(IconButton)`
	color: #fff;
`

class DateSelect extends Component {
	state = {
		defaultDateSet: false
	}

	componentDidMount() {
		const date = moment()

		// this.setState({ date })
	}

	isDayBlocked = date => {
		const { availableDays, bypassDaysBlocked } = this.props
		const match = availableDays.find(day => day === date.format('YYYY-MM-DD'))

		if (bypassDaysBlocked) {
			return false
		}

		if (match) {
			return false
		}
		return true
	}

	isOutsideRange = date => {
		const today = moment()
		const pastDate = date.isBefore(today)

		if (date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD')) {
			return false
		}

		if (pastDate) {
			return true
		}

		return false
	}

	handleDateChange = date => {
		const { onDateSelect } = this.props

		onDateSelect(date)
		this.setState({ date })
	}

	setDefaultDate = () => {
		const { defaultDate } = this.props

		this.setState({ date: defaultDate, defaultDateSet: true })
	}

	render() {
		const { date, focused, defaultDateSet } = this.state
		const { placeholder, onChange, setDefaultDate } = this.props

		return [
			<Wrapper>
				<DayPickerSingleDateController
					date={date || null} // momentPropTypes.momentObj or null
					placeholder={placeholder}
					onDateChange={date => this.handleDateChange(date)} // PropTypes.func.isRequired
					focused={focused} // PropTypes.bool
					onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
					numberOfMonths={1}
					isDayBlocked={this.isDayBlocked}
					isOutsideRange={this.isOutsideRange}
					keepOpenOnDateSelect
					navPrev={<NavButton fontSize={'1.5em'}>chevron_left</NavButton>}
					navNext={<NavButton fontSize={'1.5em'}>chevron_right</NavButton>}
					hideKeyboardShortcutsPanel
					setDefaultDate={
						setDefaultDate && !defaultDateSet && this.setDefaultDate()
					}
				/>
			</Wrapper>
		]
	}
}

export default DateSelect
