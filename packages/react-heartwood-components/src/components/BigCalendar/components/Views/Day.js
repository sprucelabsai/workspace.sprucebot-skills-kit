// @flow
import React, { PureComponent } from 'react'
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

import Modal from '../../../Modal/Modal'

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
	longPressDelay: Number,
	allowResizeToZeroDurationBlocks: Boolean,
	getStartTimeForUser: Function,
	getEndTimeForUser: Function,
	doubleClickTime: Number,
	onDoubleClick: Function,
	newEventDefaultDurationSec: Number
}

type State = {
	selectedEvent: Object,
	highlightedEvent: Object
}

class Day extends PureComponent<Props> {
	state = {}

	static defaultProps = {
		dragThreshold: 10,
		scrollDuringDragMargin: 50,
		dragScrollSpeed: 5,
		eventRightMargin: 10,
		allowResizeToZeroDurationBlocks: true,
		newEventDefaultDurationSec: 900 * 4 // 60 minutes
	}

	_timeRangeCache = {}
	_columnMapCache = null
	_dragResizeUpdates = null

	constructor(props) {
		super(props)

		this.domNodeRef = React.createRef()
		this.dragGridRef = React.createRef()
		this.scrollInnerRef = React.createRef()
		this.teammateHeaderRef = React.createRef()
		this.timeGutterRef = React.createRef()
		this.mouseTimeIndicator = React.createRef()
		this.bodyWrapperRef = React.createRef()
	}

	componentDidMount = () => {
		this.updateHorizontalPagerDetails()
		this.placeAndSize()

		window.addEventListener('resize', this.handleResize)

		this._timeLineInterval = setInterval(this.placeTimeLine, 10000)

		//TODO better way to detect everything is rendered and sized correctly
		setTimeout(this.updateHorizontalPagerDetails, 1000)
		setTimeout(this.placeAndSize, 1000)
		setTimeout(this.placeTimeLine, 1000)
	}

	componentWillUnmount = () => {
		clearInterval(this._timeLineInterval)
		window.removeEventListener('resize', this.updateHorizontalPagerDetails)
	}

	componentDidUpdate(prevProps) {
		const { events, startDate, users } = this.props
		if (
			prevProps.events !== events ||
			prevProps.startDate !== startDate ||
			prevProps.users !== users
		) {
			// reset all event cache
			this._columnMapCache = null
			this.placeAndSize()
			this.sizeTimeLine()
			this.updateHorizontalPagerDetails()

			if (prevProps.startDate !== startDate) {
				this.setState({ highlightedEvent: null, selectedEvent: null })
				this.dragGridRef.current.cancelDrag()
			}
			// if we only changed events, lets make sure to update our selection
			else if (prevProps.events !== events) {
				if (this.state.selectedEvent) {
					const match = events.find(
						event => event.id === this.state.selectedEvent.id
					)

					if (match) {
						this.handleSelectEvent({ event: match })
					} else {
						this.handleDeselectEvent()
					}
				}
			}
			//consider deselecting higher up for this
			else if (
				prevProps.users !== users &&
				prevProps.users.length !== users.length
			) {
				if (this.state.selectedEvent) {
					this.handleDeselectEvent()
				}
			}
		}
	}

	handleResize = () => {
		this.updateHorizontalPagerDetails()
		this.placeAndSize()
	}

	handleScroll = e => {
		const target = e.target
		const { scrollTop, scrollLeft } = target

		this.teammateHeaderRef.current.domNodeRef.current.scrollLeft = scrollLeft
		this.timeGutterRef.current.domNodeRef.current.scrollTop = scrollTop

		// // arrows that sit in the upper right
		this.updateHorizontalPagerDetails()
		this.updateTimeIndicatorTime()

		if (
			this._lastDragDetails &&
			this.dragGridRef.current.isMouseDownOnEvent()
		) {
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
		this.dragGridRef.current.animateHorizontalTo(
			this.snapEventToNearestValidX({ mouseX: scrollLeft + pageWidth })
		)
	}

	handleHorizontalPageBack = () => {
		const scrollLeft = this.dragGridRef.current.getScrollLeft()
		const pageWidth = this.dragGridRef.current.getWidth()
		this.dragGridRef.current.animateHorizontalTo(
			this.snapEventToNearestValidX({ mouseX: scrollLeft - pageWidth })
		)
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

	secondsToHeight = seconds => {
		const { slotDurationMin } = this.getTimeRangeDetails(
			this.props.minTime,
			this.props.maxTime
		)
		const slotHeight = this.slotHeight()
		const minutes = seconds / 60

		const height = (minutes / slotDurationMin) * slotHeight

		return height
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
		return (
			e.target.classList.contains('hour-block') ||
			e.target.classList.contains('scroll-inner') ||
			e.target.classList.contains('bigcalendar__drag-grid')
		)
	}

	getMinBlockResizeHeight = event => {
		return this.props.allowResizeToZeroDurationBlocks && event.blocks.length > 1
			? 0
			: this.slotHeight()
	}

	handleMouseDownOnEvent = ({ e, event, block, blockIdx }) => {
		this.deselectAllTextSelections()

		const response = { e, event, block, blockIdx }
		let target = e.target
		// if we clicked an available block, find any events under us to see if
		// we should pass the click to them
		if (!block.markAsBusy && blockIdx !== event.blocks.length - 1) {
			let matches = this.dragGridRef.current.getEventsAtLocation({
				x: eventUtil.clientXY(e).clientX,
				y: eventUtil.clientXY(e).clientY
			})
			// the first one would actually match the event passed here
			// so lets check the first event under us
			matches.shift()

			//filter out non busy (available) blocks
			matches = matches.filter(match => match.block.markAsBusy || match.resize)

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
		} else {
			this._resizeDetails = null
		}

		if (!this._dragResizeUpdates) {
			this._dragResizeUpdates = {
				blockUpdates: []
			}
		}

		return response
	}

	handleDropEvent = async ({ event, dragEvent, newX, newY }) => {
		// console.log('drop event in day')
		// reset some things
		const dragDetails = this._dragDetails || {}
		const { blockUpdates = [] } = this._dragResizeUpdates || {}

		this._dragDetails = null
		this._resizeDetails = null
		this._lastDragDetails = null
		this._dragResizeUpdates = null

		const newStartAt = this.yToTime(newY)
		const newUser = this.xToUser(newX)

		const { onDropEvent, timezone, startDate } = this.props

		return (
			onDropEvent &&
			onDropEvent({
				event,
				dragEvent,
				newStartAt:
					newStartAt &&
					newStartAt.format('YYYY-MM-DD HH:mm') !==
						moment.tz(startDate, timezone).format('YYYY-MM-DD HH:mm')
						? newStartAt
						: null,
				newUser:
					!event || (newUser && newUser.id !== event.userId) ? newUser : null,
				...dragDetails,
				blockUpdates: blockUpdates.length === 0 ? null : blockUpdates
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

		const { onDragEvent } = this.props
		const { dragEventNode, blockIdx } = dragDetails

		dragEventNode.style.width = this.dayColWidth() + 'px'

		// to track the cancelling of drag grid moving the event for us
		let cancelDrag = false

		if (this._resizeDetails) {
			// console.log('handle drag resizing')
			cancelDrag = true

			const {
				eMouseMove,
				blockIdx,
				dragBlockNode,
				dragBlockNodeHeight,
				dragEventNodeTop,
				dragBlockNodeHeights,
				dragEventNodeBottom,
				startScrollTop,
				startingClientY
			} = dragDetails

			const deltaScrollTop =
				this.dragGridRef.current.getScrollTop() - startScrollTop

			const dragDistance =
				eventUtil.clientXY(eMouseMove).clientY -
				startingClientY +
				deltaScrollTop

			const originalHeight = dragBlockNodeHeight
			const minBlockResizeHeight = this.getMinBlockResizeHeight(event)
			const originalTop = dragEventNodeTop

			const { direction } = this._resizeDetails

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
				distance = Math.max(distance, dragBlockNodeHeights[blockIdx - 1] * -1)
			} else if (direction === 'n') {
				// so it won't go too far up
				distance = Math.max(distance, originalTop * -1)

				// so it won't go too far down
				distance = Math.min(distance, originalHeight - minBlockResizeHeight)
			} else if (direction === 's') {
				distance = Math.min(distance, this.dayColHeight() - dragEventNodeBottom)
			}

			let height = originalHeight
			if (direction === 's') {
				height += distance
			} else {
				height -= distance
			}
			height = Math.max(minBlockResizeHeight, height)

			dragBlockNode.style.height = parseInt(height) + 'px'

			this._dragResizeUpdates.blockUpdates[blockIdx] = {
				newDurationSec: this.heightToSeconds(height)
			}

			// if we are dragging a block after the first, resize the previous block
			if (blockIdx > 0 && direction === 'n') {
				const previousDragBlock = dragBlockNode.previousSibling
				const previousHeight = dragBlockNodeHeights[blockIdx - 1]

				let height = previousHeight + distance

				// can't go too big or it starts to feel like dragging a block down
				height = Math.min(
					height,
					originalHeight + previousHeight - minBlockResizeHeight
				)

				previousDragBlock.style.height = parseInt(height) + 'px'

				this._dragResizeUpdates.blockUpdates[blockIdx - 1] = {
					newDurationSec: this.heightToSeconds(height)
				}
			}
			// don't resize this block if we're dragging north and we're the first block
			//if we are the first block, we have to move the whole event up the inverse
			//of the change in the height of the block
			else if (blockIdx === 0 && direction === 'n') {
				const newTop = originalTop + distance
				dragEventNode.style.top = `${newTop}px`

				const start = this.yToTime(newTop)
				dragEventNode.querySelector('.time').innerHTML = start.format('h:mma')
			}
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
				dragBlockNode,
				eMouseMove,
				dragBlockNodeHeights,
				dragEventNodeBottom,
				startScrollTop,
				startingClientY,
				x
			} = dragDetails

			const previousDragBlock = dragBlockNode.previousSibling

			const deltaScrollTop =
				this.dragGridRef.current.getScrollTop() - startScrollTop

			const dragDistance =
				eventUtil.clientXY(eMouseMove).clientY +
				deltaScrollTop -
				startingClientY

			const originalHeight = dragBlockNodeHeights[blockIdx - 1]
			const maxDistance = this.dayColHeight() - dragEventNodeBottom

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
			this._dragResizeUpdates.blockUpdates[blockIdx - 1] = {
				newDurationSec: duration
			}
		}

		this._lastDragDetails = { event, dragDetails }

		// we ask drag grid to only move the dom node if we are moving the whole event (block 0)
		// all other drags are ignored
		return onDragEvent ? onDragEvent(event, dragDetails) : !cancelDrag
	}

	deselectAllTextSelections = () => {
		window.getSelection().removeAllRanges()
	}

	handleSelectEvent = async ({ event, block, blockIdx }) => {
		if (event.details) {
			this.deselectAllTextSelections()

			await this.setState({
				selectedEvent: event,
				showEventDetailsInDialog: false
			})

			// this can happen if a select/deselect happens rapid fire
			// and the result of the above setState is actually
			// setting the selected event to false
			if (!this.state.selectedEvent) {
				return
			}

			// place details next to event
			const eventNode = this.dragGridRef.current.getEventNode(event)
			const detailsNode = this.domNodeRef.current.querySelector(
				'.event-details'
			)

			// move details view away to grid sizes correctly for below calculations
			detailsNode.style.top = '-200em'

			const detailsWidth = sizeUtil.getWidth(detailsNode)
			const gridWidth = this.dragGridRef.current.getWidth()
			const scrollLeft = this.dragGridRef.current.getScrollLeft()
			const eventRight = sizeUtil.getLocalRight(eventNode)
			const eventLeft = sizeUtil.getLocalLeft(eventNode)
			const detailsRight = eventRight + detailsWidth
			const gridHeight = this.dragGridRef.current.getScrollHeight()
			const detailsHeight = sizeUtil.getHeight(detailsNode)

			let setTop = false
			let showInDialog = false

			// grid must be at least twice as details (not sure about this)
			if (
				detailsWidth > gridWidth / 2 ||
				detailsHeight > this.dragGridRef.current.getHeight()
			) {
				showInDialog = true
			}
			// check x positioning
			else if (detailsRight > gridWidth + scrollLeft) {
				if (eventLeft - detailsWidth < 0) {
					showInDialog = true
				} else {
					setTop = true
					detailsNode.style.left = `${eventLeft - detailsWidth}px`
				}
			} else {
				setTop = true
				detailsNode.style.left = `${eventRight}px`
			}

			if (setTop) {
				let top = sizeUtil.getLocalTop(eventNode)
				//check y positioning
				const detailsBottom = sizeUtil.getHeight(detailsNode) + top

				if (detailsBottom > gridHeight) {
					top = gridHeight - sizeUtil.getHeight(detailsNode)
				}
				detailsNode.style.top = `${top}px`
			}
			if (showInDialog) {
				this.setState({ showEventDetailsInDialog: true })
			}
		}
	}

	handleDeselectEvent = async () => {
		return this.setState(state => {
			if (state.selectedEvent) {
				return { selectedEvent: null }
			} else {
				return {}
			}
		})
	}

	handleHighlightEvent = async ({ event, block, blockIdx }) => {
		this.setState({ highlightedEvent: event })
	}

	handleUnHighlightEvent = () => {
		this.setState({ highlightedEvent: null })
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
		const { timezone, minTime, maxTime } = this.props
		const min = moment.tz(
			`${date.format('YYYY-MM-DD')} ${minTime}:00`,
			timezone
		)
		const max = moment.tz(
			`${date.format('YYYY-MM-DD')} ${maxTime}:00`,
			timezone
		)
		return sortBy(
			events.filter(event => {
				const eventStart = moment.tz(event.startAt, timezone)
				return (
					event.id &&
					eventStart.format('YYYY-MM-DD') === date.format('YYYY-MM-DD') &&
					eventStart.isBetween(min, max)
				)
			}),
			['startAt', 'title', 'subtitle']
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
			const { minTime, maxTime, startDate, events, timezone } = this.props
			const range = this.getTimeRangeDetails(minTime, maxTime)
			const totalTimeSlots = range.totalTimeSlots
			const slotHeight = this.slotHeight()
			let endSlot = 0

			const todaysEvents = this.eventsForDay(events, startDate)

			this._columnMapCache = {
				eventDetails: {}
			}

			todaysEvents.forEach(event => {
				const currentStart = moment.tz(event.startAt, timezone)
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
		const eventNode = this.dragGridRef.current.getEventNode(event)
		const { users } = this.props
		const userIndex = findIndex(users, u => u.id === event.userId)
		const dayColWidth = this.dayColWidth()
		const dayColHeight = this.dayColHeight()

		if (userIndex > -1 && dayColWidth && dayColHeight) {
			const { minTime, maxTime, eventRightMargin } = this.props

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
			const oldDisplay = timeLineNode.style.display
			timeLineNode.style.display = 'none'
			const pageWidth = this.dragGridRef.current.getScrollWidth()
			timeLineNode.style.width = `${pageWidth}px`
			timeLineNode.style.display = oldDisplay
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

			if (top > this.dayColHeight()) {
				timeLineNode.style.display = 'none'
			} else {
				timeLineNode.style.display = 'block'
				timeLineNode.style.top = `${top}px`
			}
		}
	}

	handleMouseMove = e => {
		const gridPosition = sizeUtil.getPosition(this.bodyWrapperRef.current)
		const gridWidth = sizeUtil.getWidth(this.bodyWrapperRef.current)
		const gridHeight = sizeUtil.getHeight(this.bodyWrapperRef.current)

		if (
			e.clientX > gridPosition.x &&
			e.clientX < gridPosition.x + gridWidth &&
			e.clientY > gridPosition.y &&
			e.clientY < gridPosition.y + gridHeight
		) {
			if (this.mouseTimeIndicator.current.classList.contains('hide')) {
				this.mouseTimeIndicator.current.classList.remove('hide')
			}

			this._lastMouseMove = {
				x: e.clientX,
				y: e.clientY,
				gridPosition,
				gridWidth,
				gridHeight
			}
			this.updateTimeIndicatorTime()
		} else {
			this.hideMouseTimeIndicator()
		}
	}

	hideMouseTimeIndicator = () => {
		if (!this.mouseTimeIndicator.current.classList.contains('hide')) {
			this.mouseTimeIndicator.current.classList.add('hide')
		}
	}

	updateTimeIndicatorTime = () => {
		// probably a touch device so no mouse movement has taken place yet
		// or we're moving around the view,ignore everything
		if (!this._lastMouseMove || this.dragGridRef.current.isDraggingView()) {
			return
		}

		let y = this._lastMouseMove.y

		// stick to gradding event
		if (this.dragGridRef.current.isDraggingEvent()) {
			const dragNode = this.dragGridRef.current.getDragNode()
			// cannot use getLocalTop because we may be dragging a block (vs the whole event)
			// and that would return the top from the event (first positioned parent)
			// are we resizing?
			if (
				!this._resizeDetails ||
				(this._resizeDetails && this._resizeDetails.direction === 'n')
			) {
				y = sizeUtil.getTop(dragNode)
			} else {
				y = sizeUtil.getBottom(dragNode)
			}
		}

		const bodyTop = sizeUtil.getTop(this.bodyWrapperRef.current)
		const scrollTop = this.dragGridRef.current.getScrollTop()
		const indicatorHeight = sizeUtil.getHeight(this.mouseTimeIndicator.current)

		y = y - bodyTop + scrollTop - indicatorHeight / 2

		const top = this.snapEventToNearestValidY({
			dragNodeTop: y
		})

		const time = this.yToTime(top)
		const minutes = time.format('mm')

		if (minutes === '00') {
			this.mouseTimeIndicator.current.style.display = 'none'
		} else {
			this.mouseTimeIndicator.current.style.top = top + 'px'
			this.mouseTimeIndicator.current.style.display = 'block'
			this.mouseTimeIndicator.current.innerHTML = `:${minutes}`
		}
	}

	handleDoubleClick = ({ e }) => {
		const { onDoubleClick } = this.props

		let time
		const { clientX, clientY } = this.dragGridRef.current.globalToLocal(
			eventUtil.clientXY(e)
		)
		// if they clicked the header, time is null
		if (e.currentTarget.classList.contains('bigcalendar__teammate-header')) {
			time = null
		} else {
			time = this.yToTime(
				this.snapEventToNearestValidY({ dragNodeTop: clientY })
			)
		}

		const user = this.xToUser(
			this.snapEventToNearestValidX({ mouseX: clientX })
		)

		return onDoubleClick && onDoubleClick({ time, user, e })
	}

	handleLongPressView = async ({ e }) => {
		const { clientX, clientY } = this.dragGridRef.current.globalToLocal(
			eventUtil.clientXY(e)
		)
		const startAt = this.yToTime(clientY)
		const user = this.xToUser(clientX)
		const { newEventDefaultDurationSec } = this.props

		const event = {
			id: 'new',
			startAt: startAt.format('YYYY-MM-DD HH:mm'),
			userId: user.id,
			className: 'event-fill-unavailable',
			blocks: [
				{
					durationSec: newEventDefaultDurationSec,
					markAsBusy: true
				}
			]
		}
		const dragDetails = await this.dragGridRef.current.dropNewEventAndDrag({
			event,
			e,
			left: this.snapEventToNearestValidX({ mouseX: clientX }),
			top: this.snapEventToNearestValidY({
				dragNodeTop:
					clientY - this.secondsToHeight(newEventDefaultDurationSec / 2),
				dragNodeHeight: this.secondsToHeight(newEventDefaultDurationSec)
			})
		})

		return dragDetails
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
			startDate,
			events,
			getStartTimeForUser,
			getEndTimeForUser,
			doubleClickTime,
			longPressDelay
		} = this.props

		const {
			selectedEvent,
			highlightedEvent,
			showEventDetailsInDialog
		} = this.state

		let eventDetails = null
		if (selectedEvent && selectedEvent.details) {
			eventDetails = { ...selectedEvent.details }
			eventDetails.header = eventDetails.header || {}
			eventDetails.header.onClickClose = this.handleCloseEventDetails
		}

		return (
			<div
				ref={this.domNodeRef}
				className={cx('bigcalendar__view-day', {
					'has-selected-event': !!selectedEvent,
					'has-highlighted-event': !!highlightedEvent,
					'single-user': users.length === 1,
					'no-users': users.length === 0
				})}
				onMouseMove={this.handleMouseMove}
				onMouseOut={this.handleMouseMove}
			>
				<div className="bigcalendar__user-header">
					<TeammateHeader
						onMouseDown={this.handleViewMouseDown}
						onDoubleClick={this.handleDoubleClick}
						doubleClickTime={doubleClickTime}
						onScroll={this.handleTeammateScroll}
						users={users}
						ref={this.teammateHeaderRef}
					/>
				</div>
				<div className="bigcalendar__body-wrapper" ref={this.bodyWrapperRef}>
					<TimeGutter
						hours={hours}
						calendarBodyHeight={calendarBodyHeight}
						onMouseDown={this.handleViewMouseDown}
						ref={this.timeGutterRef}
					>
						<div
							ref={this.mouseTimeIndicator}
							className="bigcalendar__day-view-mouse-time-indicator hide"
						>
							...
						</div>
					</TimeGutter>
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
						highlightedEvent={highlightedEvent}
						events={this.eventsForDay(events, startDate)}
						sizeEvent={this.sizeEvent}
						timezone={timezone}
						onDragEvent={this.handleDragOfEvent}
						onDropEvent={this.handleDropEvent}
						onDoubleClick={this.handleDoubleClick}
						doubleClickTime={doubleClickTime}
						longPressDelay={longPressDelay}
						onLongPressView={this.handleLongPressView}
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
									startTime={getStartTimeForUser(user, startDate)}
									endTime={getEndTimeForUser(user, startDate)}
									minTime={minTime}
									maxTime={maxTime}
									timezone={timezone}
								/>
							))}
							{this.isToday() && <TimeLine />}
						</div>
						{eventDetails && !showEventDetailsInDialog && (
							<EventDetails {...eventDetails} />
						)}
					</DragGrid>
				</div>
				{eventDetails && showEventDetailsInDialog && (
					<Modal isOpen={true} isSmall={true}>
						<EventDetails {...eventDetails} />
					</Modal>
				)}
			</div>
		)
	}
}

export default Day
