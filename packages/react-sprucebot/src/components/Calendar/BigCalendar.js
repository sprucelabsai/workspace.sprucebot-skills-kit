import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Tween, autoPlay, Easing } from 'es6-tween'

import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Calendar from './Calendar'
import Pager from '../Pager/Pager'
import { Tabs, TabPane } from '../Tabs/Tabs'
import HorizontalWeek from './HorizontalWeek'

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
			storeSchedule: [] // Hours store is open for selected date range
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

	generatePagerTitle = page => {
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
			title = moment(selectedDate).format('MMM Do')
		}

		return title
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
		const { mode, view, teammates, selectedDate } = this.state
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

		triggerOnNavigate && onNavigate && onNavigate(options)

		const { storeSchedule, events } = await fetchEvents(options)
		this.setState({ storeSchedule, events })
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

		await this.setState({
			view: newView,
			renderFirstCalendar: !movingToWeek
		})

		// because month view does not show all teammates, if we are in team mode jumping OFF month view, lets
		// re-show team wrappers
		if (mode === 'team' && view === 'month' && newView !== 'month') {
			this.toggleShowOnCalendars()
		} else if (mode === 'user' && view !== 'week' && newView === 'week') {
			// week view is heavy, give dom a sec to render before rendering calendar
			this.delayedRenderWeekView()
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
		const { selectedDate, storeSchedule } = this.state

		let earliest = false
		let latest = false

		if (storeSchedule && storeSchedule.length !== 0) {
			storeSchedule.forEach(schedule => {
				const start = moment(`2018-04-01 ${schedule.startTime}`).subtract(
					2,
					'hour'
				)
				const end = moment(`2018-04-01 ${schedule.endTime}`).add(2, 'hour')

				if (!earliest || earliest.diff(start) > 0) {
					earliest = start
				}

				if (!latest || latest.diff(end) < 0) {
					latest = end
				}
			})
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
				element.classList.toggle('hide')
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

		this.handleChange()

		setTimeout(() => {
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

		this.handleChange()

		setTimeout(() => {
			this.setState({
				renderAllCalendars: false,
				showAllTeammates: false,
				transitioning: false
			})
		}, 500)
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
		const { view, mode } = this.state

		if (mode === 'team' && view === 'month') {
			return events
		}

		const filteredEvents = events.filter(
			event =>
				event.userId === teammate.User.id || event.type === 'special-event'
		)

		return filteredEvents
	}

	applyClassNames = event => {
		return { className: `${event.className || ''}` }
	}

	handleClickEvent = (event, teammate) => {
		const { onClickEvent } = this.props

		onClickEvent && onClickEvent(event, teammate)
	}

	handleClickOpenSlot = (start, end, teammate) => {
		const { onClickOpenSlot } = this.props

		onClickOpenSlot && onClickOpenSlot(start, end, teammate)
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

	render() {
		const { auth, className, supportedViews, onClickOpenSlot } = this.props
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
			renderAllEvents
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
			max: max.toDate(),
			selectable: onClickOpenSlot && true
		}

		let team = showAllTeammates ? teammates : [auth]
		let classNames = `${className || ''} ${mode === 'team' ? 'team' : 'user'} ${
			transitioning ? 'transitioning' : ''
		} ${view}`

		//filter authed user out and prepend
		if (view === 'month') {
			team = [auth]
		} else if (showAllTeammates && auth) {
			team = team.filter(teammate => {
				return teammate.User.id !== auth.User.id
			})
			team = [auth, ...team]
		}

		return (
			<div className={`big_calendar ${classNames}`}>
				<Tabs onChange={this.handleChangeView}>
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
					className={`calendars__wrapper`}
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
									<div className="avatar_wrapper">
										<span>
											<Avatar top user={teammate} />
											<span className="calendar__teammate_name">
												{teammate.User.casualName}
											</span>
										</span>
									</div>
									{((idx === 0 && renderFirstCalendar) ||
										(idx > 0 && renderAllCalendars)) && (
										<Calendar
											className={`${
												idx === 0 && !renderFirstCalendar ? 'hide' : ''
											}`}
											views={views}
											events={events ? this.filterEvents(events, teammate) : []}
											eventPropGetter={event => this.applyClassNames(event)}
											onSelectEvent={this.handleClickEvent}
											onSelectSlot={({ start, end }) =>
												this.handleClickOpenSlot(start, end, teammate)
											}
											onEventDrop={this.handleDropEvent}
											onEventResize={this.handleResizeEvent}
											canDrag={this.handleCanDrag}
											canResize={this.handleCanResize}
											popup={selectedView === 'month'}
											{...calendarProps}
										/>
									)}
								</div>
							)
						})}
					</div>
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
	storeSchedule: PropTypes.objectOf.isRequired,
	teamDayViewWidth: PropTypes.number,
	handleClickEvent: PropTypes.func,
	handleClickOpenSlot: PropTypes.func,
	handleDropEvent: PropTypes.func,
	handleResizeEvent: PropTypes.func
}

BigCalendar.defaultProps = {
	supportedViews: ['day', 'week', 'month'], //NOT IMPLEMENTED
	defaultView: 'day',
	supportedModes: ['user', 'team'], //NOT IMPLEMENTED
	defaultMode: 'user',
	teamDayViewWidth: 250
}
