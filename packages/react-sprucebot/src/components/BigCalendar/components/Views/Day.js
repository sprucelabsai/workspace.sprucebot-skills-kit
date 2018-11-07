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
import EventDetails from '../../components/EventDetails/EventDetails'

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
	onDragEvent: Function,
	scrollDuringDragMargin: Number, // how close to the edge do we need to get before we'll auto scroll for the user
	dragScrollSpeed: Number, // how many pixels to jump if dragging near edge of scroll
	eventRightMargin: Number,
	longPressDelay: Number
}

type State = {
	selectedEvent: Object,
	highlightedEventAndBlock: Object
}

class Day extends Component<Props> {
	state = {}

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
		this.teammateHeaderRef = React.createRef()
		this.timeGutterRef = React.createRef()
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

		this.teammateHeaderRef.current.domNodeRef.current.scrollLeft = scrollLeft
		this.timeGutterRef.current.domNodeRef.current.scrollTop = scrollTop

		// // arrows that sit in the upper right
		this.updateHorizontalPagerDetails()

		if (this._lastDragDetails) {
			this.handleDragOfEvent(
				this._lastDragDetails.event,
				this._lastDragDetails.dragDetails
			)
		}
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
		const scrollLeft = this.dragGridRef.current.getScrollLeft()
		const pageWidth = this.dragGridRef.current.getWidth()
		this.dragGridRef.current.animateHorizontalTo(scrollLeft + pageWidth)
	}

	handleHorizontalPageBack = () => {
		const scrollLeft = this.dragGridRef.current.getScrollLeft()
		const pageWidth = this.dragGridRef.current.getWidth()
		this.dragGridRef.current.animateHorizontalTo(scrollLeft - pageWidth)
	}

	handleTeammateScroll = e => {
		const target = e.target
		const { scrollLeft: teammateLeft } = target
		const viewLeft = this.dragGridRef.current.getScrollLeft()

		if (teammateLeft !== viewLeft) {
			this.dragGridRef.current.setScrollLeft(teammateLeft)
		}
	}

	snapEventToNearestValidX = ({ mouseX }) => {
		const dayColWidth = this.dayColWidth()
		const nearest = Math.floor(mouseX / dayColWidth)
		return Math.max(
			0,
			Math.min(this.props.users.length - 1, nearest) * dayColWidth
		)
	}

	snapEventToNearestValidY = ({ dragNodeTop, dragNodeHeight = 0 }) => {
		const slotHeight = this.slotHeight()
		const nearest = Math.round(dragNodeTop / slotHeight)
		const maxTop = this.dayColHeight() - dragNodeHeight
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

	heightToSeconds = height => {
		const range = this.getTimeRangeDetails(
			this.props.minTime,
			this.props.maxTime
		)
		const dayColHeight = this.dayColHeight()
		const ratio = height / dayColHeight
		return range.seconds * ratio
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

	getDragNode = ({ event, block, blockIdx, dragEventNode, dragBlockNode }) => {
		return blockIdx === 0 ? dragEventNode : dragBlockNode
	}

	handleMouseDownOnView = e => {
		if (!e.target.classList.contains('hour-block')) {
			return false
		}
	}

	handleMouseDownOnEvent = ({ e, event, block, blockIdx }) => {
		const response = { e, event, block, blockIdx }
		let target = e.target
		// if we clicked an available block, find any events under us to see if
		// we should pass the click to them
		if (!block.markAsBusy) {
			let matches = this.dragGridRef.current.getEventsAtLocation({
				x: eventUtil.clientXY(e).clientX,
				y: eventUtil.clientXY(e).clientY
			})
			// the first one would actually match the event passed here
			// so lets check the first event under us
			matches.shift()

			//filter out non busy (available) blocks
			matches = matches.filter(match => match.block.markAsBusy)

			if (matches.length > 0) {
				response.event = matches[0].event
				response.block = matches[0].block
				response.blockIdx = matches[0].blockIdx

				const resize = matches[0].resize

				if (resize) {
					const eventNode = this.dragGridRef.current.getEventNode(
						matches[0].event
					)
					target = eventNode.querySelector(`.${resize.direction}`)
				}
			}
			// ignore the click entirely so it gets passed onto the drag grid view
			else {
				return false
			}
		}

		// did we click a resize handle? if so, lets set up for that
		if (
			target.classList.contains('resize-handle') ||
			target.parentNode.classList.contains('resize-handle')
		) {
			const direction =
				target.classList.contains('resize-n') ||
				target.parentNode.classList.contains('resize-n')
					? 'n'
					: 's'

			this._resizeDetails = {
				e,
				event: response.event,
				block: response.block,
				blockIdx: response.blockIdx,
				direction
			}
		}

		this._scrollStartingPosition = {
			left: this.dragGridRef.current.getScrollLeft(),
			top: this.dragGridRef.current.getScrollTop()
		}
		return response
	}

	handleDropEvent = async (event, newX, newY) => {
		// console.log('drop event in day')
		// reset some things
		const dragDetails = this._dragDetails || {}
		const resizeDetails = this._resizeDetails || {}

		this._dragDetails = null
		this._resizeDetails = null
		this._lastDragDetails = null

		const newStartTime =
			dragDetails.newStartAt || resizeDetails.newStartAt || this.yToTime(newY)
		const newUser = this.xToUser(newX)

		const { onDropEvent } = this.props

		return (
			onDropEvent &&
			onDropEvent({
				event,
				newStartAt: newStartTime,
				newUser: newUser && newUser.id !== event.userId ? newUser : null,
				...dragDetails,
				...resizeDetails
			})
		)
	}

	handleDragOfEvent = (event, dragDetails) => {
		// if anything is selected, null it
		if (this.state.selectedEvent) {
			this.setState({
				selectedEvent: null
			})
		}

		const { onDragEvent, timezone } = this.props
		const { dragEventNode, blockIdx, sourceEventNode } = dragDetails

		// to track the cancelling of drag grid moving the event for us
		let cancelDrag = false

		if (this._resizeDetails) {
			// console.log('handle drag resizing')
			cancelDrag = true
			const { top: startingScrollTop } = this._scrollStartingPosition

			const deltaScrollTop =
				this.dragGridRef.current.getScrollTop() - startingScrollTop
			const {
				dragBlockNode,
				eMouseMove,
				eMouseDown,
				blockIdx,
				sourceBlockNode
			} = dragDetails

			const dragDistance =
				eventUtil.clientXY(eMouseMove).clientY -
				eventUtil.clientXY(eMouseDown).clientY +
				deltaScrollTop

			const originalHeight = sizeUtil.getHeight(sourceBlockNode)
			const slotHeight = this.slotHeight()
			const originalTop = parseFloat(sourceEventNode.style.top)

			const { direction } = this._resizeDetails
			const resizeDetails = {
				...this._resizeDetails,
				blockUpdates: []
			}

			// drag always changes the height of the selected block, so lets set the height
			// callout that height is set differently deppending on drag direction
			// also, when dragging north, we should not be able to drag more than the height
			// of the previous block (if there is one)

			let distance = this.snapEventToNearestValidY({
				dragNodeTop: Math.abs(dragDistance)
			})

			if (dragDistance < 0) {
				distance *= -1
			}

			// clamp distance
			if (direction === 'n' && blockIdx > 0) {
				distance = Math.max(
					distance,
					sizeUtil.getHeight(sourceBlockNode.previousSibling) * -1
				)
			} else if (direction === 'n') {
				// so it won't go too far up
				distance = Math.max(distance, originalTop * -1)

				// so it won't go too far down
				distance = Math.min(distance, originalHeight - slotHeight)
			} else if (direction === 's') {
				distance = Math.min(
					distance,
					this.dayColHeight() - sizeUtil.getLocalBottom(sourceEventNode)
				)
			}

			let height = originalHeight
			if (direction === 's') {
				height += distance
			} else {
				height -= distance
			}
			height = Math.max(slotHeight, height)

			dragBlockNode.style.height = parseInt(height) + 'px'

			resizeDetails.blockUpdates.push({
				blockIdx: blockIdx,
				newDurationSec: this.heightToSeconds(height)
			})

			// if we are dragging a block after the first, resize the previous block
			if (blockIdx > 0 && direction === 'n') {
				const previousDragBlock = dragBlockNode.previousSibling
				const previousSourceBlock = sourceBlockNode.previousSibling
				const previousHeight = sizeUtil.getHeight(previousSourceBlock)

				let height = previousHeight + distance

				// can't go too big or it starts to feel like dragging a block down
				height = Math.min(height, originalHeight + previousHeight - slotHeight)

				previousDragBlock.style.height = parseInt(height) + 'px'

				resizeDetails.blockUpdates.push({
					blockIdx: blockIdx - 1,
					newDurationSec: this.heightToSeconds(height)
				})
			}
			// don't resize this block if we're dragging north and we're the first block
			//if we are the first block, we have to move the whole event up the inverse
			//of the change in the height of the block
			else if (blockIdx === 0 && direction === 'n') {
				const newTop = originalTop + distance
				dragEventNode.style.top = `${newTop}px`
				const deltaSeconds = this.heightToSeconds(distance * -1)
				const newStartAt = moment
					.tz(event.startAt, timezone)
					.subtract(deltaSeconds, 'seconds')

				resizeDetails.newStartAt = newStartAt
				dragEventNode.querySelector('.time').innerHTML = newStartAt.format(
					'h:mma'
				)
			}

			this._resizeDetails = resizeDetails
		}
		// dragging an event is peasy peezy (drag grid handles it)
		// we'll just make some day view only updates
		else if (blockIdx === 0) {
			const time = this.yToTime(parseFloat(dragEventNode.style.top))
			dragEventNode.querySelector('.time').innerHTML = time.format('h:mma')
			this._didDragEvent = true
		}
		//dragging a block means changing duration of the block ahead of it
		//drag grid cannot handle this. but, we do want to move the event, so
		//we'll want to move the event on the x as well
		else {
			cancelDrag = true
			const {
				sourceBlockNode,
				dragBlockNode,
				eMouseMove,
				eMouseDown,
				x
			} = dragDetails

			const previousSourceBlockNode = sourceBlockNode.previousSibling
			const previousDragBlock = dragBlockNode.previousSibling
			const { top: startingScrollTop } = this._scrollStartingPosition

			const deltaScrollTop =
				this.dragGridRef.current.getScrollTop() - startingScrollTop

			const dragDistance =
				eventUtil.clientXY(eMouseMove).clientY +
				deltaScrollTop -
				eventUtil.clientXY(eMouseDown).clientY
			const originalHeight = sizeUtil.getHeight(previousSourceBlockNode)
			const maxDistance =
				this.dayColHeight() - sizeUtil.getLocalBottom(sourceEventNode)

			let distance = Math.min(dragDistance, maxDistance)

			const newHeight = Math.max(
				0,
				this.snapEventToNearestValidY({
					dragNodeTop: originalHeight + distance
				})
			)

			previousDragBlock.style.height = parseInt(newHeight) + 'px'
			dragEventNode.style.left = x + 'px'

			const duration = this.heightToSeconds(newHeight)
			this._dragDetails = {
				blockUpdates: [
					{
						blockIdx: blockIdx - 1,
						newDurationSec: duration
					}
				]
			}
		}

		// we ask drag grid to only move the dom node if we are moving the whole event (block 0)
		// all other drags are ignored
		this._lastDragDetails = { event, dragDetails }
		return onDragEvent ? onDragEvent(event, dragDetails) : !cancelDrag
	}

	handleSelectEvent = async ({ event, block, blockIdx }) => {
		if (event.details) {
			await this.setState({
				selectedEvent: event
			})

			// place details next to event
			const eventNode = this.dragGridRef.current.getEventNode(event)
			const detailsNode = this.dragGridRef.current.domNodeRef.current.querySelector(
				'.event-details'
			)

			const detailsWidth = sizeUtil.getWidth(detailsNode)
			const gridWidth = this.dragGridRef.current.getWidth()
			const eventRight = sizeUtil.getLocalRight(eventNode)
			const eventLeft = sizeUtil.getLocalLeft(eventNode)
			const detailsRight = eventRight + detailsWidth

			const top = sizeUtil.getLocalTop(eventNode)
			detailsNode.style.top = `${top}px`

			if (detailsRight > gridWidth) {
				detailsNode.style.left = `${eventLeft - detailsWidth}px`
			} else {
				detailsNode.style.left = `${eventRight}px`
			}
		}
	}

	handleDeselectEvent = () => {
		this.setState({ selectedEvent: null })
	}

	handleHighlightEvent = async ({ event, block, blockIdx }) => {
		this.setState({ highlightedEventAndBlock: { event, block, blockIdx } })
	}

	handleUnHighlightEvent = () => {
		this.setState({ highlightedEventAndBlock: null })
	}

	handleCloseEventDetails = () => {
		this.handleDeselectEvent()
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

	isToday = date => {
		return (
			this.props.startDate.format('YYYY-MM-DD') ===
			moment.tz(date, this.props.timezone).format('YYYY-MM-DD')
		)
	}

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
				node.style.height = `${parseInt(height)}px`
			})

			if (event.id !== 'dragging') {
				const colMap = this.getColumnMap()
				const details = colMap.eventDetails[event.id]
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
		if (timeLineNode) {
			const pageWidth = this.dragGridRef.current.getScrollWidth()
			timeLineNode.style.width = `${pageWidth}px`
		}
	}

	placeTimeLine = () => {
		const timeLineNode = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__time-line'
		)
		if (timeLineNode) {
			const { timezone } = this.props
			const now = moment.tz(new Date(), timezone)
			const top = this.timeToY(now)
			timeLineNode.style.top = `${top}px`
		}
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

		const { selectedEvent, highlightedEventAndBlock } = this.state

		let eventDetails = null
		if (selectedEvent && selectedEvent.details) {
			eventDetails = { ...selectedEvent.details }
			eventDetails.header = eventDetails.header || {}
			eventDetails.header.onClickClose = this.handleCloseEventDetails
		}

		return (
			<div
				className={cx('bigcalendar__view-day', {
					'has-selected-event': !!selectedEvent,
					'has-highlighted-event': !!highlightedEventAndBlock
				})}
			>
				<div className="bigcalendar__user-header">
					<TeammateHeader
						onMouseDown={this.handleViewMouseDown}
						onScroll={this.handleTeammateScroll}
						users={users}
						ref={this.teammateHeaderRef}
					/>
				</div>
				<div className="bigcalendar__body-wrapper">
					<TimeGutter
						hours={hours}
						calendarBodyHeight={calendarBodyHeight}
						onMouseDown={this.handleViewMouseDown}
						ref={this.timeGutterRef}
					/>
					<DragGrid
						onMouseDownOnView={this.handleMouseDownOnView}
						onSelectEvent={this.handleSelectEvent}
						onDeselectEvent={this.handleDeselectEvent}
						onHighlightEvent={this.handleHighlightEvent}
						onUnHighlightEvent={this.handleUnHighlightEvent}
						onMouseDownOnEvent={this.handleMouseDownOnEvent}
						getDragNode={this.getDragNode}
						snapEventToNearestValidX={this.snapEventToNearestValidX}
						snapEventToNearestValidY={this.snapEventToNearestValidY}
						onScroll={this.handleScroll}
						ref={this.dragGridRef}
						selectedEvent={selectedEvent}
						highlightedEventAndBlock={highlightedEventAndBlock}
						events={this.eventsForDay(events, startDate)}
						sizeEvent={this.sizeEvent}
						timezone={timezone}
						onDragEvent={this.handleDragOfEvent}
						onDropEvent={this.handleDropEvent}
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
							{this.isToday() && <TimeLine />}
						</div>
						{eventDetails && <EventDetails {...eventDetails} />}
					</DragGrid>
				</div>
			</div>
		)
	}
}

export default Day
