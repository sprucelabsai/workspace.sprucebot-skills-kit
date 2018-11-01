// @flow
import React, { Component } from 'react'
import cx from 'classnames'

import findIndex from 'lodash/findIndex'
import sortBy from 'lodash/sortBy'
import moment from 'moment-timezone'
import memoize from 'memoize-one'

import TimeGutter from '../TimeGutter/TimeGutter'
import TeammateHeader from '../TeammateHeader/TeammateHeader'
import DragGrid from '../DragGrid/DragGrid'
import DayCol from './DayCol'

import sizeUtil from '../../utils/size'
import eventUtil from '../../utils/event'
import TimeLine from '../TimeLine/TimeLine'

type Props = {
	showRightProps: boolean,
	users: Array<Object>,
	hours: Array<Object>,
	timezone: String,
	className?: String,
	minTime: String,
	maxTime: String,
	startTime: String,
	endTime: String,
	calendarBodyHeight: Number,
	onScroll: Function,
	slotsPerHour: Number,
	onUpdateHorizontalPagerDetails: Function,
	events: Array<Object>,
	startDate: Object,
	dragThreshold: Number, // how far to drag before actually initiating drag
	onDropEvent: Function,
	scrollDuringDragMargin: Number, // how close to the edge do we need to get before we'll auto scroll for the user
	dragScrollSpeed: Number, // how many pixels to jump if dragging near edge of scroll
	eventRightMargin: Number
}

type State = {
	scrollLeft: Number,
	scrollTop: Number
}

class Day extends Component<Props> {
	state = {
		scrollLeft: 0,
		scrollTop: 0
	}

	static defaultProps = {
		dragThreshold: 10,
		scrollDuringDragMargin: 50,
		dragScrollSpeed: 5,
		eventRightMargin: 10
	}

	_timeRangeCache = {}
	_columnMapCache = null

	constructor(props) {
		super(props)
		this.dragGridRef = React.createRef()
		this.scrollInnerRef = React.createRef()
	}

	componentDidMount = () => {
		this.updateHorizontalPagerDetails()
		this.placeAndSize()

		window.addEventListener('resize', this.updateHorizontalPagerDetails)

		this._timeLineInterval = setInterval(this.placeTimeLine, 10000)

		//TODO better way to detect everything is rendered and sized correctly
		setTimeout(this.updateHorizontalPagerDetails, 1000)
		setTimeout(this.placeAndSize, 1000)
	}

	componentWillUnmount = () => {
		clearInterval(this._timeLineInterval)
		window.removeEventListener('resize', this.updateHorizontalPagerDetails)
	}

	componentDidUpdate(prevProps) {
		const { events, startDate } = this.props
		if (prevProps.events !== events || prevProps.startDate !== startDate) {
			// reset all event cache
			this._columnMapCache = null
			this.placeAndSize()
		}
	}

	handleScroll = e => {
		const target = e.target
		const { scrollTop, scrollLeft } = target
		this.setState({
			scrollTop,
			scrollLeft
		})

		// arrows that sit in the upper right
		this.updateHorizontalPagerDetails()
	}

	getTimeRangeDetails = (min, max) => {
		const { startDate, slotsPerHour, timezone } = this.props

		const key = `${startDate.format('YYYY-MM-DD')}-${min}-${max}`

		if (!this._timeRangeCache[key]) {
			const minMoment = moment.tz(
				`${startDate.format('YYYY-MM-DD')} ${min}`,
				timezone
			)
			const maxMoment = moment.tz(
				`${startDate.format('YYYY-MM-DD')} ${max}`,
				timezone
			)

			const minTimestamp = parseInt(minMoment.format('X'), 10)
			const maxTimestamp = parseInt(maxMoment.format('X'), 10)
			const hours = (maxTimestamp - minTimestamp) / 60 / 60
			const slotDurationMin = (1 / slotsPerHour) * 60

			this._timeRangeCache[key] = {
				min,
				max,
				minMoment,
				maxMoment,
				minTimestamp,
				maxTimestamp,
				seconds: maxTimestamp - minTimestamp,
				slotDurationMin,
				totalTimeSlots: slotsPerHour * hours
			}
		}

		return this._timeRangeCache[key]
	}

	updateHorizontalPagerDetails = () => {
		const { onUpdateHorizontalPagerDetails } = this.props

		let currentPage
		let totalPages = 3
		const scrolledRight = this.dragGridRef.current.isScrolledAllTheWayRight()
		const scrolledLeft = this.dragGridRef.current.isScrolledAllTheWayLeft()

		if (scrolledRight && scrolledLeft) {
			currentPage = 0
			totalPages = 1
		} else if (scrolledRight) {
			currentPage = 2
		} else if (scrolledLeft) {
			currentPage = 0
		} else {
			currentPage = 1
		}

		onUpdateHorizontalPagerDetails({ currentPage, totalPages })
	}

	//invoked directly by BigCalendar
	handleHorizontalPageNext = () => {
		const { scrollLeft } = this.state
		const pageWidth = this.dragGridRef.current.getWidth()
		this.dragGridRef.current.animateHorizontalTo(scrollLeft + pageWidth)
	}

	handleHorizontalPageBack = () => {
		const { scrollLeft } = this.state
		const pageWidth = this.dragGridRef.current.getWidth()
		this.dragGridRef.current.animateHorizontalTo(scrollLeft - pageWidth)
	}

	handleTeammateScroll = e => {
		const target = e.target
		const { scrollLeft: teammateLeft } = target
		const { scrollLeft: viewLeft } = this.state

		if (teammateLeft !== viewLeft) {
			this.dragGridRef.current.setScrollLeft(teammateLeft)
		}
	}

	snapEventToNearestValidX = x => {
		const dayColWidth = this.dayColWidth()
		const nearest = Math.round(x / dayColWidth)
		return Math.max(
			0,
			Math.min(this.props.users.length - 1, nearest) * dayColWidth
		)
	}

	snapEventToNearestValidY = (y, elementHeight = 0) => {
		const slotHeight = this.slotHeight()
		const nearest = Math.round(y / slotHeight)
		const maxTop = this.dayColHeight() - elementHeight
		return Math.max(0, Math.min(maxTop, nearest * slotHeight))
	}

	yToTime = y => {
		const slotHeight = this.slotHeight()
		const range = this.getTimeRangeDetails(
			this.props.minTime,
			this.props.maxTime
		)
		const nearest = Math.round(y / slotHeight)
		const minutesFromMinTime = nearest * range.slotDurationMin
		const time = moment(range.minMoment).add(minutesFromMinTime, 'minutes')
		return time
	}

	timeToY = date => {
		const { timezone, minTime, maxTime } = this.props
		const dayColHeight = this.dayColHeight()

		const startTime = parseInt(moment.tz(date, timezone).format('X'))
		const dayColTimeRangeDetails = this.getTimeRangeDetails(minTime, maxTime)
		const secondsIntoDay = startTime - dayColTimeRangeDetails.minTimestamp
		const top = (secondsIntoDay / dayColTimeRangeDetails.seconds) * dayColHeight

		return top
	}

	xToUser = y => {
		const dayColWidth = this.dayColWidth()
		const nearest = Math.round(y / dayColWidth)
		return this.props.users[nearest]
	}

	handleDropOfEvent = async (event, newX, newY) => {
		const newStartTime = this.yToTime(newY)
		const newUser = this.xToUser(newX)

		const { onDropEvent } = this.props
		const pass =
			onDropEvent && (await onDropEvent(event, newStartTime, newUser))

		return pass
	}

	handleDragOfEvent = (event, dragDetails) => {
		// update time
		const { dragEventNode } = dragDetails
		const time = this.yToTime(parseFloat(dragEventNode.style.top))
		dragEventNode.querySelector('.time').innerHTML = time.format('h:mma')
	}

	placeAndSize = () => {
		const firstDayCol = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__day-col'
		)

		if (firstDayCol) {
			//size events
			const { startDate, events } = this.props

			this.eventsForDay(events, startDate).forEach(event => {
				this.placeEvent(event)
				this.sizeEvent(event)
			})

			//size time line to show current time n' such
			this.sizeTimeLine()
			this.placeTimeLine()
		}
	}

	dayColWidth = () => {
		const firstDayCol = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__day-col'
		)
		return sizeUtil.getWidth(firstDayCol)
	}
	dayColHeight = () => {
		const firstDayCol = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__day-col'
		)
		return sizeUtil.getHeight(firstDayCol)
	}

	slotHeight = () => {
		const { minTime, maxTime } = this.props
		const range = this.getTimeRangeDetails(minTime, maxTime)
		const dayColHeight = this.dayColHeight()
		return dayColHeight / range.totalTimeSlots
	}

	eventsForDay = memoize((events, date) => {
		const { timezone } = this.props
		return sortBy(
			events.filter(event => {
				const eventStart = moment.tz(event.startAt, timezone)
				return eventStart.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
			}),
			['startAt']
		)
	})

	getColumnMap = () => {
		if (!this._columnMapCache) {
			const { minTime, maxTime, startDate, events } = this.props
			const range = this.getTimeRangeDetails(minTime, maxTime)
			const totalTimeSlots = range.totalTimeSlots
			const slotHeight = this.slotHeight()
			let endSlot = 0

			const todaysEvents = this.eventsForDay(events, startDate)

			this._columnMapCache = {
				eventDetails: {}
			}

			todaysEvents.forEach(event => {
				const currentStart = moment(event.startAt)
				const eventMap = []
				const { userId } = event

				if (!this._columnMapCache[userId]) {
					this._columnMapCache[userId] = new Array(totalTimeSlots).fill(null)
				}

				// STEP 1, build event map (the eventId and busy/available for each timeslot)
				event.blocks.forEach(block => {
					const startY = this.timeToY(currentStart)
					const blockStartSlot = Math.round(startY / slotHeight)
					const endAt = moment(currentStart).add(block.durationSec, 'seconds')
					const endY = this.timeToY(endAt)
					const blockEndSlot = Math.round(endY / slotHeight)

					for (
						let blockSlot = blockStartSlot;
						blockSlot < blockEndSlot;
						blockSlot++
					) {
						eventMap[blockSlot] = { eventId: event.id, busy: block.markAsBusy }
					}

					currentStart.add(block.durationSec, 'seconds')
					endSlot = blockEndSlot
				})

				// STEP 2, check which column this event can fit in
				let column = 0
				let conflicts
				do {
					conflicts = 0
					eventMap.forEach((details, slot) => {
						// make sure slot / column exists
						if (!this._columnMapCache[userId][slot]) {
							this._columnMapCache[userId][slot] = []
						}

						if (!this._columnMapCache[userId][slot][column]) {
							this._columnMapCache[userId][slot][column] = {}
						}

						if (
							details.busy &&
							this._columnMapCache[userId][slot][column].busy
						) {
							conflicts++
						}
					})
					if (conflicts > 0) {
						column += 1
					}
				} while (conflicts > 0)

				// STEP 3, slot it in, tracking overlap
				let overlap = false
				eventMap.forEach((details, slot) => {
					if (this._columnMapCache[userId][slot][column].busy === false) {
						overlap = true
						this._columnMapCache[userId][slot][column] = {
							...details,
							overlapping: 1
						}
					} else {
						this._columnMapCache[userId][slot][column] = details
					}
				})

				// STEP 4, track it for easy retrieval
				const eventStartY = this.timeToY(event.startAt)
				const eventStartSlot = Math.round(eventStartY / slotHeight)
				this._columnMapCache.eventDetails[event.id] = {
					startSlot: eventStartSlot,
					endSlot,
					column,
					overlapping: overlap
				}
			})

			// STEP 5, add additional data around each event to make sizing possible
			todaysEvents.forEach(event => {
				const details = this._columnMapCache.eventDetails[event.id]
				let maxColumns = 0
				let overlapped = false
				for (let slot = details.startSlot; slot < details.endSlot; slot++) {
					overlapped =
						overlapped ||
						this._columnMapCache[event.userId][slot][details.column].eventId !==
							event.id

					if (
						this._columnMapCache[event.userId][slot][details.column].eventId ===
							event.id &&
						this._columnMapCache[event.userId][slot][details.column].busy
					) {
						maxColumns = Math.max(
							maxColumns,
							this._columnMapCache[event.userId][slot].filter(
								details => details.busy
							).length
						)
					}
				}
				this._columnMapCache.eventDetails[event.id].columns = Math.max(
					maxColumns,
					this._columnMapCache.eventDetails[event.id].column + 1
				)
				this._columnMapCache.eventDetails[event.id].overlapped = overlapped
			})
		}

		return this._columnMapCache
	}

	placeEvent = event => {
		const { users } = this.props
		const eventNode = this.dragGridRef.current.getEventNode(event)

		const userIndex = findIndex(users, u => u.id === event.userId)
		const dayColWidth = this.dayColWidth()
		const dayColHeight = this.dayColHeight()

		if (userIndex > -1 && dayColWidth && dayColHeight) {
			//left
			const left = userIndex * dayColWidth
			eventNode.style.left = `${left}px`

			//top
			const top = this.timeToY(event.startAt)
			eventNode.style.top = `${top}px`

			// show the event (if it was even hidden)
			eventNode.style.display = 'block'
		} else {
			//hide the event if it does not belong to a teammate
			eventNode.style.display = 'none'
		}
	}

	sizeEvent = event => {
		const { users } = this.props
		const userIndex = findIndex(users, u => u.id === event.userId)
		const dayColWidth = this.dayColWidth()
		const dayColHeight = this.dayColHeight()

		if (userIndex > -1 && dayColWidth && dayColHeight) {
			const { minTime, maxTime, eventRightMargin } = this.props

			const eventNode = this.dragGridRef.current.getEventNode(event)

			//height for blocks
			const blockNodes = eventNode.querySelectorAll('.bigcalendar__event-block')
			const dayColTimeRangeDetails = this.getTimeRangeDetails(minTime, maxTime)

			event.blocks.forEach((block, idx) => {
				const height =
					(block.durationSec / dayColTimeRangeDetails.seconds) * dayColHeight

				const node = blockNodes[idx]
				node.style.height = `${height}px`
			})

			if (event.id !== 'dragging') {
				const colMap = this.getColumnMap()
				const details = colMap.eventDetails[event.id]
				console.log({ colMap, details })
				let width = dayColWidth / details.columns
				let leftIndent = width * details.column

				if (details.overlapped) {
					width -= eventRightMargin * 2
				} else if (details.overlapping) {
					width -= eventRightMargin * 2
					leftIndent += eventRightMargin
				} else if (details.column === details.columns - 1) {
					width -= eventRightMargin
				}

				eventNode.style.width = width + 'px'
				eventNode.style.marginLeft = leftIndent + 'px'
			}
		}
	}

	sizeTimeLine = () => {
		const timeLineNode = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__time-line'
		)
		const pageWidth = this.dragGridRef.current.getScrollWidth()
		timeLineNode.style.width = `${pageWidth}px`
	}

	placeTimeLine = () => {
		const { timezone } = this.props
		const now = moment.tz(new Date(), timezone)
		const top = this.timeToY(now)
		const timeLineNode = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__time-line'
		)
		timeLineNode.style.top = `${top}px`
	}

	render() {
		const {
			users,
			hours,
			timezone,
			calendarBodyHeight,
			minTime,
			maxTime,
			slotsPerHour,
			startTime,
			endTime,
			startDate,
			events
		} = this.props

		const { scrollTop, scrollLeft } = this.state

		return (
			<div className="bigcalendar__view-day">
				<div className="bigcalendar__user-header">
					<TeammateHeader
						onMouseDown={this.handleViewMouseDown}
						onScroll={this.handleTeammateScroll}
						scrollLeft={scrollLeft}
						users={users}
					/>
				</div>
				<div className="bigcalendar__body-wrapper">
					<TimeGutter
						hours={hours}
						calendarBodyHeight={calendarBodyHeight}
						scrollTop={scrollTop}
						onMouseDown={this.handleViewMouseDown}
					/>
					<DragGrid
						snapEventToNearestValidX={this.snapEventToNearestValidX}
						snapEventToNearestValidY={this.snapEventToNearestValidY}
						onScroll={this.handleScroll}
						ref={this.dragGridRef}
						events={this.eventsForDay(events, startDate)}
						sizeEvent={this.sizeEvent}
						timezone={timezone}
						onDragEvent={this.handleDragOfEvent}
						onDropEvent={this.handleDropOfEvent}
						style={{
							height: calendarBodyHeight
						}}
					>
						<div className="scroll-inner" ref={this.scrollInnerRef}>
							{users.map(user => (
								<DayCol
									date={startDate}
									slotsPerHour={slotsPerHour}
									key={`day-col-${user.id}`}
									hours={hours}
									user={user}
									startTime={startTime}
									endTime={endTime}
									minTime={minTime}
									maxTime={maxTime}
									timezone={timezone}
								/>
							))}
							<TimeLine />
						</div>
					</DragGrid>
				</div>
			</div>
		)
	}
}

export default Day
