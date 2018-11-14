// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import moment from 'moment-timezone'
import memoize from 'memoize-one'
import Cookies from 'js-cookies'
import { autoPlay } from 'es6-tween'
autoPlay(true)

import sizeUtils from './utils/size'
import VIEWS from './components/Views'

// sub components
import Header from './components/Header/Header'

type Props = {
	defaultView?: 'day' | 'week' | 'month',
	defaultStartDate?: Object,
	onChangeStartDate?: Function,
	slotsPerHour?: Number,
	defaultMinTime?: String,
	defaultMaxTime?: String,
	defaultStartTime?: String,
	defaultEndTime?: String,
	allUsers: Array<Object>,
	headerDateFormat?: String,
	timezone: String,
	allEvents?: Array<Object>,
	onDropEvent?: Function,
	viewProps?: Object,
	longPressDelay?: Number,
	userModeSelectOptions?: Array<Object>,
	onChangeUserMode?: Function,
	defaultUserMode?: String,
	userSchedules?: Object // { userId: { date: { startTime, endTime }, '2018-01-10': { startTime: '09:00', endTime: '20:00' } } }
}
type State = {
	selectedView: 'day' | 'week' | 'month',
	startDate: Object,
	bodyHeight: Number,
	bodyWidth: Number,
	calendarBodyHeight: Number,
	currentHorizontalPage: Number,
	totalHorizontalPages: Number,
	users: Array<Object>,
	userMode?: String
}

class BigCalendar extends Component<Props, State> {
	static defaultProps = {
		defaultView: 'day',
		slotsPerHour: 4, // every 15 minutes
		defaultMinTime: '00:00',
		defaultMaxTime: '23:59',
		defaultStartTime: '07:00',
		defaultEndTime: '20:00',
		headerDateFormat: 'MMMM YYYY',
		allEvents: [],
		viewProps: {},
		longPressDelay: 500
	}
	state = {
		selectedView: this.props.defaultView,
		bodyWidth: -1,
		bodyHeight: -1,
		calendarBodyHeight: 0,
		users: this.props.allUsers,
		userMode: this.props.defaultUserMode
	}

	constructor(props: Props) {
		super(props)
		this.domNodeRef = React.createRef()
		this.selectedViewRef = React.createRef()
		this.state.startDate = this.getDefaultStartDate()

		const { allUsers, timezone } = props

		if (!allUsers) {
			throw new Error(
				'Please supply `allUsers` prop to BigCalendar. Make sure it as array of User objects {id, name}'
			)
		}

		if (!timezone) {
			throw new Error(
				'Please supply `timezone` prop to BigCalendar. Use what moment uses (see TZ* col): https://en.wikipedia.org/wiki/List_of_tz_database_time_zones'
			)
		}
	}

	componentDidMount = () => {
		window.addEventListener('resize', this.handleSizing)
		this.handleSizing()
		//TODO better way to detect everything is rendered and sized correctly
		setTimeout(this.handleSizing, 1000)
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.handleSizing)
	}

	getDefaultStartDate = () => {
		// TODO use cookies that can work both client and server side
		return moment.tz(
			this.props.defaultStartDate || new Date(),
			this.props.timezone
		)

		const { timezone } = this.props

		let defaultStartDate
		if (
			Cookies.getItem('bigcalendarDate') &&
			moment(Cookies.getItem('bigcalendarDate')).isValid()
		) {
			defaultStartDate = moment(Cookies.getItem('bigcalendarDate'))
		} else {
			defaultStartDate = moment.tz(
				this.props.defaultStartDate || new Date(),
				timezone
			)
		}
		return defaultStartDate
	}

	getDateRange = () => {
		const { startDate, selectedView } = this.state

		const {
			pageAmount: [duration, unit]
		} = VIEWS[selectedView]

		return {
			startAt: moment(startDate).startOf('day'),
			endAt: moment(startDate)
				.add(duration, unit)
				.endOf('day')
		}
	}

	handleSizing = () => {
		// can sometimes fire too early (before the ref is set)
		if (!this.domNodeRef.current) {
			return
		}

		//get node for scroll wrapper
		const scrollNode = this.domNodeRef.current.querySelectorAll(
			'.bigcalendar__drag-grid'
		)[0]

		// calc positions
		const scrollTop = sizeUtils.getTop(scrollNode)
		const width = sizeUtils.bodyWidth()
		const height = sizeUtils.bodyHeight()
		const calendarBodyHeight = height - scrollTop

		this.setState({
			bodyWidth: width,
			bodyHeight: height,
			calendarBodyHeight
		})
	}

	handleChangeView = view => {
		console.log('change view!')
	}

	handleBackDate = () => {
		const [amount, unit] = this.getViewDetails().pageAmount
		const nextDate = moment(this.state.startDate).subtract(amount, unit)

		this._setStartDate(nextDate)
	}

	handleNextDate = () => {
		const [amount, unit] = this.getViewDetails().pageAmount
		const nextDate = moment(this.state.startDate).add(amount, unit)

		this._setStartDate(nextDate)
	}

	_setStartDate = async date => {
		const { onChangeStartDate = () => {} } = this.props
		await this.setState({ startDate: date })
		onChangeStartDate(date)
	}

	handleDateToToday = async () => {
		const date = moment()
		const { onChangeStartDate = () => { } } = this.props
		await this.setState({ startDate: date })
		onChangeStartDate(date)
	}

	/**
	 * Store current state in cookie to restore calendar later
	 */
	preserveState = () => {
		const dateToSave = this.state.startDate.format('YYYY-MM-DD')
		return Cookies.setItem('bigcalendarDate', dateToSave)
	}

	componentDidUpdate() {
		this.preserveState()
	}

	getViewDetails = (view?: String) => {
		const v = view || this.state.selectedView
		return VIEWS[v]
	}

	getViewProps = () => {
		return this.props.viewProps[this.state.selectedView] || {}
	}

	generateTimeGutterHours = memoize((startDate, min, max) => {
		const times = []
		const { timezone } = this.props

		const current = moment.tz(
			`${startDate.format('YYYY-MM-DD')} ${min}:00`,
			timezone
		)
		const end = moment.tz(
			`${startDate.format('YYYY-MM-DD')} ${max}:00`,
			timezone
		)

		do {
			times.push({
				label: current.format('ha'),
				date: current.toDate(),
				hour: parseInt(current.format('h'), 10),
				timestamp: parseInt(current.format('X'), 10)
			})

			current.add(1, 'hours')
		} while (current.toDate() < end.toDate())

		return times
	})

	handleUpdateHorizontalPagerDetails = ({ currentPage, totalPages }) => {
		if (
			this.state.currentHorizontalPage !== currentPage ||
			this.state.totalHorizontalPages !== totalPages
		) {
			this.setState({
				currentHorizontalPage: currentPage,
				totalHorizontalPages: totalPages
			})
		}
	}

	handleHorizontalPageNext = () => {
		this.selectedViewRef.current.handleHorizontalPageNext &&
			this.selectedViewRef.current.handleHorizontalPageNext()
	}
	handleHorizontalPageBack = () => {
		this.selectedViewRef.current.handleHorizontalPageBack &&
			this.selectedViewRef.current.handleHorizontalPageBack()
	}

	getStartTimeForUser = (user, date) => {
		const { userSchedules, defaultStartTime } = this.props

		// if there is a user schedule object, but this day is empty, assume they are not working
		if (
			userSchedules &&
			(!userSchedules[user.id] ||
				!userSchedules[user.id][date.format('YYYY-MM-DD')])
		) {
			return false
		}

		const time =
			userSchedules &&
			userSchedules[user.id] &&
			userSchedules[user.id][date.format('YYYY-MM-DD')]
				? userSchedules[user.id][date.format('YYYY-MM-DD')].startTime
				: defaultStartTime

		return time
	}

	getEndTimeForUser = (user, date) => {
		const { userSchedules, defaultEndTime } = this.props

		// if there is a user schedule object, but this day is empty, assume they are not working
		if (
			userSchedules &&
			(!userSchedules[user.id] ||
				!userSchedules[user.id][date.format('YYYY-MM-DD')])
		) {
			return false
		}

		const time =
			userSchedules &&
			userSchedules[user.id] &&
			userSchedules[user.id][date.format('YYYY-MM-DD')]
				? userSchedules[user.id][date.format('YYYY-MM-DD')].endTime
				: defaultEndTime

		return time
	}

	handleChangeUserMode = mode => {
		const { onChangeUserMode = () => {} } = this.props
		this.setState({ userMode: mode })
		onChangeUserMode(mode)
	}

	setCurrentUsers = users => {
		this.setState({ users })
	}

	render() {
		const {
			className,
			headerDateFormat,
			slotsPerHour,
			allEvents,
			onDropEvent,
			timezone,
			longPressDelay,
			defaultMinTime,
			defaultMaxTime,
			defaultStartTime,
			defaultEndTime,
			defaultView,
			viewProps: _,
			userModeSelectOptions,
			onChangeUserMode,
			defaultUserMode,
			userSchedules,
			allUsers,
			onChangeStartDate,
			...props
		} = this.props

		const {
			selectedView,
			startDate,
			bodyWidth,
			bodyHeight,
			calendarBodyHeight,
			currentHorizontalPage,
			totalHorizontalPages,
			users,
			userMode
		} = this.state

		const parentClass = cx('bigcalendar', className, {})
		const hours = this.generateTimeGutterHours(
			startDate,
			defaultMinTime,
			defaultMaxTime
		)

		// load the view
		const View = this.getViewDetails().View
		const viewProps = this.getViewProps()

		return (
			<div
				className={parentClass}
				ref={this.domNodeRef}
				style={{
					width: bodyWidth,
					height: bodyHeight
				}}
				{...props}
			>
				<Header
					userModeSelectOptions={userModeSelectOptions}
					onChangeUserMode={this.handleChangeUserMode}
					userMode={userMode}
					dateFormat={headerDateFormat}
					selectedDate={startDate}
					selectedView={selectedView}
					onChangeView={this.handleChangeView}
					onBackDate={this.handleBackDate}
					onNextDate={this.handleNextDate}
					fullScreenNodeRef={this.domNodeRef}
					currentHorizontalPage={currentHorizontalPage}
					totalHorizontalPages={totalHorizontalPages}
					onHorizontalPageNext={this.handleHorizontalPageNext}
					onHorizontalPageBack={this.handleHorizontalPageBack}
					onSelectDate={this._setStartDate}
					onDateToToday={this.handleDateToToday}
				/>
				<div className="bigcalendar__view-wrapper">
					<View
						longPressDelay={longPressDelay}
						ref={this.selectedViewRef}
						onUpdateHorizontalPagerDetails={
							this.handleUpdateHorizontalPagerDetails
						}
						startDate={startDate}
						events={allEvents}
						slotsPerHour={slotsPerHour}
						onScroll={this.handleViewScroll}
						calendarBodyHeight={calendarBodyHeight}
						hours={hours}
						users={users}
						minTime={defaultMinTime}
						maxTime={defaultMaxTime}
						startTime={defaultStartTime}
						endTime={defaultEndTime}
						timezone={timezone}
						onDropEvent={onDropEvent}
						userSchedules={userSchedules}
						getStartTimeForUser={this.getStartTimeForUser}
						getEndTimeForUser={this.getEndTimeForUser}
						{...viewProps}
					/>
				</div>
			</div>
		)
	}
}

export default BigCalendar
