import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import { Tween, autoPlay, Easing } from 'es6-tween'

import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Calendar from './Calendar'
import ControlButton from '../ControlButton/ControlButton'
import DateSelect from '../DateSelect/DateSelect'
import Dialog from '../Dialog/Dialog'
import HorizontalWeek from './HorizontalWeek'
import Icon from '../Icon/Icon'
import Loader from '../Loader/Loader'
import Pager from '../Pager/Pager'
import { Tabs, TabPane } from '../Tabs/Tabs'

autoPlay(true)

const getElementWidth = element => {
	return element && element.offsetWidth
}
const getElementHeight = element => {
	return element && element.offsetHeight
}

export default class BigCalendar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentPage: 0,
			view: props.defaultView,
			mode: props.defaultMode,
			renderFirstCalendar: true, // the first calendar is always the logged in user
			renderFirstEvents: true, // rendering events is slow, so we may defer loading them until later
			renderAllCalendars: false,
			renderAllEvents: true,
			showAllTeammates: props.defaultMode === 'team',
			transitioning: false,
			selectedDate: moment(),
			earliestTime: null,
			latestTime: null,
			teammates: props.teammates ? props.teammates : [],
			views: props.supportedViews,
			resized: 0,
			events: [], // All events for current date range
			storeSchedule: [], // Hours store is open for selected date range,
			optionsLoaded: [],
			isFetchingEvents: true,
			isSelectingScheduleDate: false
		}
		// Expected event structure:
		// const event = {
		// 	title: 'My favorite event',
		// 	className: 'shift',
		// 	start: new Date(),
		// 	end: new Date(),
		// 	allDay: true,
		//  userId: id,
		// 	payload: { data preserved in callback }
		// }
	}

	componentDidMount = () => {
		//give things a sec to settle before recording sizes
		this.refresh()
		setTimeout(() => {}, 250)
		window.addEventListener('resize', this.handleWindowResize)
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.handleWindowResize)
	}

	setEvents = events => {
		this.setState({ events })
	}

	triggerRefresh = () => {
		this.refresh()
	}

	events = () => {
		return this.state.events
	}

	setView = view => {
		this.handleChangeView(0)
		this.tabs.setSelected(0, '.0')
	}

	setMode = mode => {
		this.setState({ mode })
	}

	setDate = selectedDate => {
		this.setState({ selectedDate })
	}

	generatePagerTitle = page => {
		const { auth } = this.props
		const { view, selectedDate } = this.state

		let title

		if (view === 'month') {
			title = moment(selectedDate).format('MMM YYYY')
		} else if (view === 'week') {
			const startOfWeek = moment(selectedDate).startOf('week')
			const endOfWeek = moment(selectedDate).endOf('week')

			if (startOfWeek.isSame(endOfWeek, 'month')) {
				title = `${startOfWeek.format('MMM Do')} - ${endOfWeek.format('Do')}`
			} else {
				title = `${startOfWeek.format('MMM Do')} - ${endOfWeek.format(
					'MMM Do'
				)}`
			}
		} else if (view === 'day') {
			const now = moment()
				.tz(auth.Location.timezone)
				.startOf('day')
			const days = moment
				.tz(selectedDate, auth.Location.timezone)
				.startOf('day')
				.diff(now, 'days')

			switch (days) {
				case -1:
					title = 'Yesterday'
					break
				case 0:
					title = 'Today'
					break
				case 1:
					title = 'Tomorrow'
					break
				default:
					title = moment(selectedDate).format('ddd, MMM Do')
					break
			}
		}

		return (
			<ControlButton
				className={`sub_control`}
				onClick={this.handleShowScheduleDateDialog}
			>
				{title} <Icon>keyboard_arrow_down</Icon>
			</ControlButton>
		)
	}

	getDesiredTeammateWrapperWidth = () => {
		if (!this.calendarWrapper) {
			return '100%'
		}
		const { view, mode } = this.state
		const { teamDayViewWidth } = this.props

		const calendarWrapperWidth = getElementWidth(this.calendarWrapper)

		if (mode === 'team' && view === 'day') {
			// make it a little thinner than the screen
			return Math.min(calendarWrapperWidth - 20, teamDayViewWidth)
		} else if (mode === 'team' && view === 'week') {
			return '100%'
		} else if (mode === 'team' && view === 'month') {
			return '100%'
		} else if (mode === 'user') {
			return calendarWrapperWidth
		}
		return 'auto'
	}

	getDesiredScrollWidth = () => {
		//act like a normal div until loaded
		if (!this.calendarWrapper) {
			return '100%'
		}
		const { view, mode, teammates, transitioning } = this.state

		const calendarWrapperWidth = getElementWidth(this.calendarWrapper)
		let widthOfAllCalendars = 0
		let minWidthOfAllCalendars =
			this.getDesiredTeammateWrapperWidth() * teammates.length

		document
			.querySelectorAll('.teammate_calendar__wrapper')
			.forEach(wrapper => {
				widthOfAllCalendars += getElementWidth(wrapper)
			})

		widthOfAllCalendars = Math.max(minWidthOfAllCalendars, widthOfAllCalendars)

		if (transitioning && view === 'day') {
			return widthOfAllCalendars
		}

		if (mode === 'team' && view == 'day') {
			return widthOfAllCalendars
		} else if (view === 'week') {
			return calendarWrapperWidth
		} else if (view === 'month') {
			return calendarWrapperWidth
		} else if (mode === 'user') {
			return calendarWrapperWidth
		}
	}

	getDesiredScrollHeight = () => {
		//act like a normal div until loaded
		if (!this.calendarWrapper) {
			return 'auto'
		}

		const { mode, view } = this.state

		if (mode === 'team' && view === 'week') {
			return 'auto'
		} else if (view === 'month') {
			return 'auto'
		}

		const firstTeammateWrapper = document.querySelector(
			'.teammate_calendar__wrapper'
		)
		if (!firstTeammateWrapper) {
			return 'auto'
		}

		return getElementHeight(firstTeammateWrapper) || 'auto'
	}

	handleChange = () => {
		this.refresh()
	}

	refresh = async (triggerOnNavigate = false) => {
		const { mode, view, teammates, selectedDate, optionsLoaded } = this.state
		const { auth, onNavigate, fetchEvents } = this.props

		const currentView = view === 'team_week' ? 'week' : view
		const currentUser = teammates.find(
			teammate => teammate.User.id === auth.UserId
		)

		const startDate = moment(selectedDate).startOf(currentView)
		const endDate = moment(selectedDate).endOf(currentView)

		const options = {
			mode,
			startDate,
			endDate,
			view: currentView,
			teammates: mode === 'user' ? currentUser : teammates
		}

		// const eventsLoaded = this.checkOptions(options)

		// if (!eventsLoaded) {
		this.setState({
			optionsLoaded: [...optionsLoaded, options],
			isFetchingEvents: true
		})

		triggerOnNavigate && onNavigate && onNavigate(options)
		try {
			const { storeSchedule, events } = await fetchEvents(options)
			this.setState({ storeSchedule, events, isFetchingEvents: false })
		} catch (err) {
			console.log(err)
			this.setState({ isFetchingEvents: false })
		}
	}

	checkOptions = options => {
		return this.state.optionsLoaded.find(loaded => isEqual(loaded, options))
	}

	handlePagerChange = async page => {
		const { view } = this.state
		const diff = page - this.state.currentPage
		const stepType = view !== 'month' ? 'days' : 'months'

		await this.setState(prevState => {
			return {
				currentPage: page,
				selectedDate: prevState.selectedDate.add(diff, stepType)
			}
		})

		this.handleChange()
	}

	handleChangeView = async idx => {
		const { mode, view } = this.state
		const newView = this.state.views[idx]

		const movingToWeek =
			mode === 'user' && view !== 'week' && newView === 'week'

		this.setState({
			view: newView,
			// renderFirstCalendar: !movingToWeek
		})

		// because month view does not show all teammates, if we are in team mode jumping OFF month view, lets
		// re-show team wrappers
		if (mode === 'team' && view === 'month' && newView !== 'month') {
			this.toggleShowOnCalendars()
		} else if (mode === 'user' && view !== 'week' && newView === 'week') {
			//NOTE: Removed this delay as it was causing DOM issues with the calendar not rendering fast enough;
			// Changes to BE data structure and FE should limit render lag that was initially seen

			// week view is heavy, give dom a sec to render before rendering calendar
			// this.delayedRenderWeekView()
		}

		this.handleChange()
		//trigger a refresh which causes, sizes to be recalculated. 500 delay for css transitions
		setTimeout(() => {
			this.handleWindowResize()
		}, 500)
	}

	delayedRenderWeekView = () => {
		setTimeout(() => {
			this.setState({ renderFirstCalendar: true })
		}, 100)
	}

	//the earliest and latest time of all schedules
	timeRange = () => {
		const { selectedDate, storeSchedule, events } = this.state

		const adjustedEvents = events.filter(event => !event.allDay).map(event => ({
			startTime: moment(event.start).format('HH:mm:ss'),
			endTime: moment(event.end).format('HH:mm:ss')
		}))

		const day = selectedDate.format('YYYY-MM-DD')
		const combinedTimes = [
			...storeSchedule,
			...adjustedEvents
				.filter(event => {
					if (event.startTime && event.endTime) {
						return event
					}
				})
				.map(event => ({
					startTime: event.startTime,
					endTime: event.endTime
				}))
		]

		let earliest = false
		let latest = false

		if (combinedTimes.length !== 0) {
			combinedTimes.forEach(event => {
				const start = moment(`${day} ${event.startTime}`)
					.startOf('hour')
					.subtract(2, 'hour')
				const end = moment(`${day} ${event.endTime}`)
					.endOf('hour')
					.add(2, 'hour')

				if (!earliest || earliest.diff(start) > 0) {
					earliest = start
				}

				if (!latest || latest.diff(end) < 0) {
					latest = end
				}
			})

			if (!earliest.isSame(day, 'day')) {
				earliest = moment(`${day} 00:00:00`)
			}

			if (!latest.isSame(day, 'day')) {
				latest = moment(`${day} 23:59:59`)
			}
		} else {
			earliest = moment(selectedDate)
				.hour(7)
				.minutes(0)
				.seconds(0)

			latest = moment(selectedDate)
				.hour(18)
				.minutes(0)
				.seconds(0)
		}

		return [earliest, latest]
	}

	toggleShowOnCalendars = () => {
		// show teammates calendars one at a time
		const calendars = [
			...document.querySelectorAll('.teammate_calendar__wrapper')
		]

		if (this.props.auth) {
			calendars.shift()
		}

		let delay = 100
		const delayBump = 200

		calendars.forEach(element => {
			setTimeout(() => {
				element.classList.toggle('hide', false)
			}, delay)
			delay += delayBump
		})
	}

	jumpToTeamMode = async () => {
		if (this.state.transitioning) {
			return
		}

		//first give css transitions a sec to adjust the view
		await this.setState({
			transitioning: true,
			mode: 'team',
			showAllTeammates: true,
			renderAllCalendars: true
		})

		this.toggleShowOnCalendars()

		setTimeout(() => {
			this.handleChange()
			this.setState({
				transitioning: false
			})
		}, 1000)
	}

	jumpToUserMode = async () => {
		if (this.state.transitioning) {
			return
		}

		//scroll calendar left
		new Tween({
			y: this.calendarWrapper.scrollLeft
		})
			.to({ y: 0 }, 500)
			.on('update', ({ y }) => {
				this.calendarWrapper.scrollLeft = y
			})
			.easing(Easing.Quadratic.Out)
			.start()

		// when jumping to week view in user mode, delay render because it's heavy
		const { view } = this.state

		//first give css transitions a sec to adjust the view
		await this.setState({
			transitioning: true,
			mode: 'user',
			renderFirstCalendar: view !== 'week',
			showAllTeammates: view !== 'week'
		})

		if (view === 'week') {
			this.delayedRenderWeekView()
		}

		// to hard on the client
		this.toggleShowOnCalendars()

		setTimeout(() => {
			this.handleChange()
			this.setState({
				renderAllCalendars: false,
				showAllTeammates: false,
				transitioning: false
			})
		}, 1000)
	}

	handleToggleMode = () => {
		const { mode } = this.state

		switch (mode) {
			case 'team':
				this.jumpToUserMode()
				break
			default:
				this.jumpToTeamMode()
				break
		}
	}

	handleWindowResize = () => {
		this.setState({
			resized: this.state.resized++
		})
	}

	filterEvents = (events, teammate) => {
		const { view, mode, transitioning } = this.state

		// make transitions faster?
		if (transitioning) {
			return []
		}

		if (mode === 'team' && view === 'month') {
			return events
		}

		const filteredEvents = events.filter(
			event => event.isUniversalEvent || event.userId === teammate.User.id
		)

		return filteredEvents
	}

	applyClassNames = event => {
		return { className: `${event.className || ''}` }
	}

	handleClickEvent = (options, e) => {
		const { onClickEvent } = this.props

		onClickEvent && onClickEvent(options, e)
	}

	handleClickOpenSlot = (options, e) => {
		const { onClickOpenSlot } = this.props

		onClickOpenSlot && onClickOpenSlot(options, e)
	}

	handleDropEvent = ({ event, start, end }) => {
		const { onDropEvent } = this.props

		onDropEvent && onDropEvent(event, start, end)
	}

	handleResizeEvent = (resizeType, { event, start, end }) => {
		const { onResizeEvent } = this.props

		onResizeEvent && onResizeEvent(event, start, end)
	}

	handleCanDrag = event => {
		const { canDrag } = this.props

		if (canDrag) {
			return canDrag(event)
		}
	}

	handleCanResize = event => {
		const { canResize } = this.props

		if (canResize) {
			return canResize(event)
		}
	}

	/**
	 * DATE SELECT METHODS
	 */
	handleShowScheduleDateDialog = () => {
		this.setState({ isSelectingScheduleDate: true })
	}

	handleHideScheduleDateDialog = () => {
		this.setState({ isSelectingScheduleDate: false })
	}

	handleScheduleDateSelect = async date => {
		await this.setState({
			isSelectingScheduleDate: false,
			selectedDate: date
		})
		this.refresh()
	}

	handleSelectToday = () => {
		this.handleScheduleDateSelect(moment())
	}

	render() {
		const {
			auth,
			className,
			supportedViews,
			timeslots,
			step,
			titleAccessor
		} = this.props

		const {
			selectedDate,
			view,
			teammates,
			mode,
			transitioning,
			renderAllCalendars,
			showAllTeammates,
			renderFirstCalendar,
			events,
			renderAllEvents,
			isFetchingEvents,
			isSelectingScheduleDate
		} = this.state

		// populate views to take into account team week
		let selectedView = view
		const views = {}
		supportedViews.forEach(view => {
			views[view] = true
		})

		views.team_week = HorizontalWeek

		if (mode === 'team' && view === 'week') {
			selectedView = 'team_week'
		}

		const teammateWrapperWidth = this.getDesiredTeammateWrapperWidth()
		const scrollWidth = this.getDesiredScrollWidth()
		const scrollHeight = this.getDesiredScrollHeight()

		// format times
		const formats = {
			// format times in left column
			timeGutterFormat: date => {
				return moment(date).format('h:mma')
			}
		}

		// setup start and end times
		const [min, max] = this.timeRange()

		// configure react-sprucebot calendar
		const calendarProps = {
			view: selectedView,
			formats,
			toolbar: false,
			date: selectedDate.toDate(),
			min: min.toDate(),
			max: max.toDate()
		}

		// Determine selected date in relation to today
		const currentDate = moment
			.tz(selectedDate, auth.Location.timezone)
			.format('YYYY-MM-DD HH:mm:ss')
		const today = moment()
			.tz(auth.Location.timezone)
			.startOf('day')
		const selectedDateStart = moment
			.tz(selectedDate, auth.Location.timezone)
			.startOf('day')
		const isToday = today.isSame(selectedDateStart)

		// Optionally passed calendar props
		if (timeslots) {
			calendarProps.timeslots = timeslots
		}
		if (step) {
			calendarProps.step = step
		}

		if (titleAccessor) {
			calendarProps.titleAccessor = titleAccessor
		}
		let classNames = `${className || ''} ${mode === 'team' ? 'team' : 'user'} ${
			transitioning ? 'transitioning' : ''
		} ${view}`

		let team = mode === 'team' ? teammates : [auth]

		//filter authed user out and prepend
		if (view === 'month') {
			team = [auth]
		} else if (showAllTeammates) {
			team = team.filter(teammate => {
				return teammate.User.id !== auth.User.id
			})
			team = [auth, ...team]
		}

		let isFetching = isFetchingEvents || transitioning
		let isLoaderOutside =
			(view === 'week' && mode === 'user') || view === 'month'

		return (
			<div className={`big_calendar ${classNames}`}>
				{isSelectingScheduleDate && (
					<Dialog
						title={`Jump To Day`}
						className={`schedule_calendar_select`}
						onTapClose={this.handleHideScheduleDateDialog}
					>
						<DateSelect
							defaultDate={selectedDate}
							initialVisibleMonth={() => selectedDate}
							onDateSelect={this.handleScheduleDateSelect}
							allowPastDates
						/>
						{!isToday && (
							<Button
								primary
								onClick={this.handleSelectToday}
							>{`Jump to Today`}</Button>
						)}
					</Dialog>
				)}
				<Tabs
					ref={element => (this.tabs = element)}
					onChange={this.handleChangeView}
				>
					<TabPane title="Day" />
					<TabPane title="Week" />
					<TabPane title="Month" />
				</Tabs>
				<div className="calendar__controls">
					<Pager
						infinite={true}
						onChange={this.handlePagerChange}
						titles={this.generatePagerTitle}
						jumpAmount={selectedView !== 'month' ? 7 : 1}
						showStep={selectedView === 'day'}
					/>
					<Button className="toggle-mode" onClick={this.handleToggleMode}>
						{mode === 'team' ? 'show just me' : 'show team'}
					</Button>
				</div>
				<div
					className={`calendars__wrapper ${isFetching ? 'fetching' : ''}`}
					ref={ref => {
						this.calendarWrapper = ref
					}}
				>
					<div
						className={`calendar__scroll`}
						style={{ width: scrollWidth, height: scrollHeight }}
					>
						{team.map((teammate, idx) => {
							return (
								<div
									key={`calendar-wrapper-${teammate.User.id}`}
									className={`teammate_calendar__wrapper ${
										idx === 0 ? '' : 'hide'
									}`}
									style={{
										width: teammateWrapperWidth
									}}
								>
									{!(view === 'month' && mode === 'team') && (
										<div className="avatar_wrapper">
											<span>
												<Avatar top user={teammate} />
												<span className="calendar__teammate_name">
													{teammate.User.casualName}
												</span>
											</span>
										</div>
									)}

									{idx === 0 &&
										view === 'month' &&
										mode === 'team' &&
										teammates.map(teammate => (
											<div className="avatar_wrapper">
												<span>
													<Avatar top user={teammate} />
													<span className="calendar__teammate_name">
														{teammate.User.casualName}
													</span>
												</span>
											</div>
										))}

									{((idx === 0 && renderFirstCalendar) ||
										(idx > 0 && renderAllCalendars)) && (
										<Calendar
											className={`${
												idx === 0 && !renderFirstCalendar ? 'hide' : ''
											}`}
											timezone={auth.Location.timezone}
											currentDate={currentDate}
											views={views}
											events={events ? this.filterEvents(events, teammate) : []}
											eventPropGetter={event => this.applyClassNames(event)}
											onSelectEvent={(event, e) =>
												this.handleClickEvent(
													{ event, teammate, view, mode },
													e
												)
											}
											onSelectSlot={({ start, end, action }, e) =>
												this.handleClickOpenSlot(
													{
														start,
														end,
														action,
														teammate,
														view,
														mode
													},
													e
												)
											}
											onEventDrop={this.handleDropEvent}
											onEventResize={this.handleResizeEvent}
											canDrag={this.handleCanDrag}
											canResize={this.handleCanResize}
											popup={selectedView === 'month'}
											{...calendarProps}
										/>
									)}

									{isFetching &&
										!isLoaderOutside && (
											<div className="loader__underlay">
												<Loader />
											</div>
										)}
								</div>
							)
						})}
					</div>
					{isFetching &&
						isLoaderOutside && (
							<div className="loader__underlay">
								<Loader />
							</div>
						)}
				</div>
			</div>
		)
	}
}

BigCalendar.propTypes = {
	auth: PropTypes.object.isRequired,
	teammates: PropTypes.array,
	supportedViews: PropTypes.array.isRequired, //NOT IMPLEMENTED
	defaultView: PropTypes.string.isRequired,
	supportedModes: PropTypes.array.isRequired, //NOT IMPLEMENTED
	defaultMode: PropTypes.string.isRequired,
	teamDayViewWidth: PropTypes.number,
	onClickEvent: PropTypes.func,
	onClickOpenSlot: PropTypes.func,
	onDropEvent: PropTypes.func,
	onResizeEvent: PropTypes.func,
	timeslots: PropTypes.number,
	step: PropTypes.number
}

BigCalendar.defaultProps = {
	supportedViews: ['day', 'week', 'month'], //NOT IMPLEMENTED
	defaultView: 'day',
	supportedModes: ['user', 'team'], //NOT IMPLEMENTED
	defaultMode: 'user',
	teamDayViewWidth: 250,
	timeslots: 4,
	step: 15
}
