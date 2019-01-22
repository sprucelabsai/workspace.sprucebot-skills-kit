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
	defaultView: 'day' | 'week' | 'month',
	className?: string,
	defaultStartDate?: Object,
	onChangeStartDate?: moment => void,
	slotsPerHour?: number,
	defaultMinTime?: string,
	defaultMaxTime?: string,
	defaultStartTime?: string,
	defaultEndTime?: string,
	headerDateFormat: string,
	mobileHeaderDateFormat: string,
	users: Array<Object>,
	timezone: string,
	allEvents?: Array<Object>,
	onDropEvent?: Function,
	viewProps: ViewProps,
	longPressDelay?: number,
	userModeOptions?: Array<Object>,
	onChangeUserMode?: string => void,
	userMode?: string,
	doubleClickTime: number,
	onDoubleClickView?: Function,
	onClickView?: Function,
	doubleClickToCreate?: boolean,
	userSchedules?: Object, // { userId: { date: { startTime, endTime }, '2018-01-10': { startTime: '09:00', endTime: '20:00' } } }
	eventTimeFormat: string,
	headerCellDowFormat?: string,
	headerCellDayFormat?: string
}

type State = {
	selectedView: 'day' | 'week' | 'month',
	startDate?: moment,
	bodyHeight: number,
	bodyWidth: number,
	calendarBodyHeight: number,
	currentHorizontalPage: number,
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

	state = {
		selectedView: this.props.defaultView,
		bodyWidth: -1,
		bodyHeight: -1,
		calendarBodyHeight: 0,
		startDate: null,
		currentHorizontalPage: 0,
		totalHorizontalPages: 0
	}

	domNodeRef: { current: any }
	selectedViewRef: {
		current: ?{
			handleHorizontalPageNext: ?Function,
			handleHorizontalPageBack: ?Function
		}
	}

	constructor(props: Props) {
		super(props)

		// setup refs
		this.domNodeRef = React.createRef()
		this.selectedViewRef = React.createRef()

		// default start date
		this.state.startDate = this.getDefaultStartDate()

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
		if (!this.domNodeRef.current) {
			return
		}

		//get node for scroll wrapper
		const scrollNode = this.domNodeRef.current.querySelectorAll(
			'.bigcalendar__drag-grid'
		)[0]

		// calc positions
		const scrollTop = sizeUtil.getTop(scrollNode)
		const width = sizeUtil.bodyWidth()
		const height = sizeUtil.bodyHeight()
		const calendarBodyHeight = height - scrollTop

		this.setState({
			bodyWidth: width,
			bodyHeight: height,
			calendarBodyHeight
		})
	}

	handleChangeView = (view: string) => {
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

	_setStartDate = async (date: moment) => {
		const { onChangeStartDate = (date: moment) => {} } = this.props
		await this.setState({ startDate: date })
		onChangeStartDate(date)
	}

	handleDateToToday = async () => {
		const date = moment()
		const { onChangeStartDate = (date: moment) => {} } = this.props
		await this.setState({ startDate: date })
		onChangeStartDate(date)
	}

	componentDidUpdate() {}

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
		const { onChangeUserMode = (mode: string) => {} } = this.props
		onChangeUserMode(mode)
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
			defaultView,
			viewProps: _,
			userModeOptions,
			onChangeUserMode,
			userMode,
			userSchedules,
			users,
			onChangeStartDate,
			doubleClickTime,
			onDoubleClickView,
			onClickView,
			doubleClickToCreate,
			defaultStartDate,
			eventTimeFormat,
			headerCellDowFormat,
			headerCellDayFormat,
			...props
		} = this.props

		const {
			selectedView,
			startDate,
			bodyWidth,
			bodyHeight,
			calendarBodyHeight,
			currentHorizontalPage,
			totalHorizontalPages
		} = this.state

		const parentClass = cx('bigcalendar', className, {})

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