// @flow
import cx from 'classnames'
import { autoPlay } from 'es6-tween'
import moment from 'moment-timezone'
import React, { Component } from 'react'

// sub components
import Header from './components/Header/Header'
import VIEWS from './components/Views'
import sizeUtil from './utils/size'

autoPlay(true)

export type User = {
	id: string,
	name: string
}

type ViewProps = {
	[name: string]: any
}

type Props = {
	/** default view to render */
	defaultView: 'day' | 'week' | 'month',

	/** passthrough className */
	className?: string,

	/** on which day should the calendar start? */
	defaultStartDate?: Object,

	/** callback for when a date is changed */
	onChangeStartDate?: moment => void,

	/** how to divide the hour (4 = 15 minutes) */
	slotsPerHour?: number,

	/** The minimum time to render for any day (may move to Day and Week view) */
	defaultMinTime?: string,

	/** The max time to render for any day (may move to Day and Week view)  */
	defaultMaxTime?: string,

	/** The time a shift starts (anything before is dimmed out, may move to Day/Week) */
	defaultStartTime?: string,

	/** The time a shift ends (anything after is dimmed out, may move to Day/Week) */
	defaultEndTime?: string,

	/** moment.js format for rendering date in header */
	headerDateFormat: string,

	/** moment.js form afro rending date in header on small screens */
	mobileHeaderDateFormat: string,

	/** All users to render when userMode = team */
	users: Array<User>,

	/** Timezone for this calendar (America/Denver) */
	timezone: string,

	/** All events, give them all, I'll control which to render and where. more events = faster paging */
	allEvents?: Array<Object>,

	/** Called whenever an event is dropped */
	onDropEvent?: Function,

	/** Passed directly to any view being rendered (Day/IndividualWeek/TeamWeek/etc.) */
	viewProps: ViewProps,

	/** How long do you have to press down to invoke the create event process */
	longPressDelay?: number,

	/** Different user modes we can switch between (team, individual, etc.)  */
	userModeOptions?: Array<Object>,

	/** The currently selected user mode (you have to match this with an option from userModeOptions) */
	userMode?: string,

	/** When the userMode dropdown in HeaderControls is changed */
	onChangeUserMode?: string => void,

	/** How fast do you have to click to count it as a double click (ms) */
	doubleClickTime: number,

	/** Called when a double click is executed within the doubleClickTime (only called if doubleClickToCreate === true) */
	onDoubleClickView?: Function,

	/** When any click is made on a view (only called if doubleClickToCreate === false) */
	onClickView?: Function,

	/** Should i start creating an event when you double click? */
	doubleClickToCreate?: boolean,

	/** User schedules in the standard Spruce format: { userId: { date: { startTime, endTime }, '2018-01-10': { startTime: '09:00', endTime: '20:00' } } } */
	userSchedules?: Object,

	/** How should time be formated on an event */
	eventTimeFormat: string,

	/** format for day of week */
	headerCellDowFormat?: string,

	/** the day format */
	headerCellDayFormat?: string
}

type State = {
	/** the currently selected view (todo: remove from state?) */
	selectedView: 'day' | 'week' | 'month',

	/** the current start date (todo: remove from state?) */
	startDate?: moment,

	/** Height calculated for body to scroll properly  */
	calendarBodyHeight: number,

	/** For paging left and right using header controls */
	currentHorizontalPage: number,

	/** Total pages we can page right using header controls */
	totalHorizontalPages: number
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
		mobileHeaderDateFormat: 'MMMM Do, YYYY',
		allEvents: [],
		viewProps: {},
		longPressDelay: 500,
		doubleClickTime: 250,
		doubleClickToCreate: false, // defaults to single click
		eventTimeFormat: 'h:mma',
		headerCellDowFormat: 'ddd',
		headerCellDayFormat: 'D'
	}

	domNodeRef: { current: any }

	selectedViewRef: {
		current: ?{
			handleHorizontalPageNext: ?Function,
			handleHorizontalPageBack: ?Function,
			getBodyNode: Function
		}
	}

	constructor(props: Props) {
		super(props)

		// setup refs
		this.domNodeRef = React.createRef()
		this.selectedViewRef = React.createRef()

		// make sure users and timezone are passed
		const { users, timezone } = props

		if (!users) {
			throw new Error(
				'Please supply `users` prop to BigCalendar. Make sure it as array of User objects {id, name}'
			)
		}

		if (!timezone) {
			throw new Error(
				'Please supply `timezone` prop to BigCalendar. Use what moment uses (see TZ* col): https://en.wikipedia.org/wiki/List_of_tz_database_time_zones'
			)
		}

		this.state = {
			selectedView: props.defaultView,
			calendarBodyHeight: 0,
			currentHorizontalPage: 0,
			totalHorizontalPages: 0,
			startDate: this.getDefaultStartDate()
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

	getDefaultStartDate = (): moment => {
		// TODO use cookies that can work both client and server side
		return moment.tz(
			this.props.defaultStartDate || new Date(),
			this.props.timezone
		)
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
		if (!this.selectedViewRef.current) {
			return
		}

		//get node for scroll wrapper
		const bodyNode = this.selectedViewRef.current.getBodyNode()

		// calc positions
		const scrollTop = sizeUtil.getTop(bodyNode)
		const height = sizeUtil.bodyHeight()
		const calendarBodyHeight = height - scrollTop

		this.setState({
			calendarBodyHeight
		})
	}

	handleChangeView = () => {
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

	handleDateToToday = async () => {
		const date = moment()
		this._setStartDate(date)
	}

	_setStartDate = async (date: moment) => {
		const { onChangeStartDate } = this.props
		await this.setState({ startDate: date })
		onChangeStartDate && onChangeStartDate(date)
	}

	getViewDetails = (view?: String) => {
		const v = view || this.state.selectedView
		return VIEWS[v]
	}

	getViewProps = (): ViewProps => {
		return this.props.viewProps[this.state.selectedView] || {}
	}

	handleUpdateHorizontalPagerDetails = ({
		currentPage,
		totalPages
	}: {
		currentPage: number,
		totalPages: number
	}) => {
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
		// calling directly to avoid re-render before a potentially heavy animation

		this.selectedViewRef.current &&
			this.selectedViewRef.current.handleHorizontalPageNext &&
			this.selectedViewRef.current.handleHorizontalPageNext()
	}

	handleHorizontalPageBack = () => {
		// calling directly to avoid re-render before a potentially heavy animation
		this.selectedViewRef.current &&
			this.selectedViewRef.current.handleHorizontalPageBack &&
			this.selectedViewRef.current.handleHorizontalPageBack()
	}

	getStartTimeForUser = (user: User, date: moment) => {
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

	getEndTimeForUser = (user: User, date: moment) => {
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

	handleChangeUserMode = (mode: 'day' | 'week' | 'month') => {
		const { onChangeUserMode } = this.props
		onChangeUserMode && onChangeUserMode(mode)
	}

	render() {
		const {
			className,
			headerDateFormat,
			mobileHeaderDateFormat,
			slotsPerHour,
			allEvents,
			onDropEvent,
			timezone,
			longPressDelay,
			defaultMinTime,
			defaultMaxTime,
			defaultStartTime,
			defaultEndTime,
			userModeOptions,
			userMode,
			userSchedules,
			users,
			doubleClickTime,
			onDoubleClickView,
			onClickView,
			doubleClickToCreate,
			eventTimeFormat,
			headerCellDowFormat,
			headerCellDayFormat,
			...props
		} = this.props

		// remove uneeded vars
		delete props.viewProps
		delete props.defaultView

		const {
			selectedView,
			startDate,
			calendarBodyHeight,
			currentHorizontalPage,
			totalHorizontalPages
		} = this.state

		const parentClass = cx('bigcalendar', className, {})

		// load the view
		const View = this.getViewDetails().View
		const viewProps = this.getViewProps()

		return (
			<div className={parentClass} ref={this.domNodeRef} {...props}>
				<Header
					userModeOptions={userModeOptions}
					onChangeUserMode={this.handleChangeUserMode}
					userMode={userMode}
					dateFormat={headerDateFormat}
					mobileDateFormat={mobileHeaderDateFormat}
					selectedDate={startDate}
					selectedView={selectedView}
					onChangeView={this.handleChangeView}
					onBackDate={this.handleBackDate}
					onNextDate={this.handleNextDate}
					fullScreenNode={
						typeof document !== 'undefined'
							? document.body
							: this.domNodeRef
							? this.domNodeRef.current
							: null
					}
					currentHorizontalPage={currentHorizontalPage}
					totalHorizontalPages={totalHorizontalPages}
					onHorizontalPageNext={this.handleHorizontalPageNext}
					onHorizontalPageBack={this.handleHorizontalPageBack}
					onSelectDate={this._setStartDate}
					onDateToToday={this.handleDateToToday}
					cellDowFormat={headerCellDowFormat}
					cellDayFormat={headerCellDayFormat}
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
						calendarBodyHeight={calendarBodyHeight}
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
						doubleClickTime={doubleClickTime}
						onDoubleClick={onDoubleClickView}
						onClick={onClickView}
						doubleClickToCreate={doubleClickToCreate}
						eventTimeFormat={eventTimeFormat}
						{...viewProps}
					/>
				</div>
			</div>
		)
	}
}

export default BigCalendar
