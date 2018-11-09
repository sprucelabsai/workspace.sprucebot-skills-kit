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
	defaultView: 'day' | 'week' | 'month',
	defaultDate: Object,
	slotsPerHour: Number,
	defaultMinTime: String,
	defaultMaxTime: String,
	defaultStartTime: String,
	defaultEndTime: String,
	allUsers: Array<Object>,
	headerDateFormat: String,
	timezone: String,
	allEvents: Array<Object>,
	onDropEvent: Function,
	viewProps: Object
}
type State = {
	selectedView: 'day' | 'week' | 'month',
	minTime: String,
	maxTime: String,
	startTime: String,
	endTime: String,
	startDate: Object,
	currentUsers: Array<Object>,
	bodyHeight: Number,
	bodyWidth: Number,
	calendarBodyHeight: Number,
	currentHorizontalPage: Number,
	totalHorizontalPages: Number
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
		viewProps: {}
	}
	state = {
		selectedView: this.props.defaultView,
		minTime: this.props.defaultMinTime,
		maxTime: this.props.defaultMaxTime,
		startTime: this.props.defaultStartTime,
		endTime: this.props.defaultEndTime,
		currentUsers: this.props.allUsers,
		bodyWidth: sizeUtils.bodyWidth(),
		bodyHeight: sizeUtils.bodyHeight(),
		calendarBodyHeight: 0
	}

	constructor(props) {
		super(props)
		this.domNodeRef = React.createRef()
		this.selectedViewRef = React.createRef()
		this.state.startDate = this.getDefaultStartDate()
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
		let defaultStartDate
		if (
			Cookies.getItem('bigcalendarDate') &&
			moment(Cookies.getItem('bigcalendarDate')).isValid()
		) {
			defaultStartDate = moment(Cookies.getItem('bigcalendarDate'))
		} else if (this.props.startDate && moment(this.props.startDate).isValid()) {
			defaultStartDate = moment(this.props.startDate)
		} else {
			defaultStartDate = moment.tz(new Date(), this.props.timezone)
		}
		return defaultStartDate
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

		this.setState({
			startDate: nextDate
		})
	}
	handleNextDate = () => {
		const [amount, unit] = this.getViewDetails().pageAmount
		const nextDate = moment(this.state.startDate).add(amount, unit)

		this.setState({
			startDate: nextDate
		})
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
		this.setState({
			currentHorizontalPage: currentPage,
			totalHorizontalPages: totalPages
		})
	}

	handleHorizontalPageNext = () => {
		this.selectedViewRef.current.handleHorizontalPageNext &&
			this.selectedViewRef.current.handleHorizontalPageNext()
	}
	handleHorizontalPageBack = () => {
		this.selectedViewRef.current.handleHorizontalPageBack &&
			this.selectedViewRef.current.handleHorizontalPageBack()
	}

	render() {
		const {
			className,
			headerDateFormat,
			slotsPerHour,
			allEvents,
			onDropEvent,
			timezone,
			eventRightMargin
		} = this.props

		const {
			selectedView,
			minTime,
			maxTime,
			startTime,
			endTime,
			startDate,
			currentUsers,
			bodyWidth,
			bodyHeight,
			calendarBodyHeight,
			currentHorizontalPage,
			totalHorizontalPages
		} = this.state

		const parentClass = cx('bigcalendar', className, {})
		const hours = this.generateTimeGutterHours(startDate, minTime, maxTime)

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
			>
				<Header
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
				/>
				<div className="bigcalendar__view-wrapper">
					<View
						{...viewProps}
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
						users={currentUsers}
						minTime={minTime}
						maxTime={maxTime}
						startTime={startTime}
						endTime={endTime}
						timezone={timezone}
						onDropEvent={onDropEvent}
					/>
				</div>
			</div>
		)
	}
}

export default BigCalendar
