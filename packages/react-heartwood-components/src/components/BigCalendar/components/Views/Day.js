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
import ResizeGrid from '../ResizeGrid/ResizeGrid'

import DayCol from './DayCol'
import EventDetails from '../../components/EventDetails/EventDetails'

import Modal from '../../../Modal/Modal'

import sizeUtil from '../../utils/size'
import eventUtil from '../../utils/event'
import timeUtil from '../../utils/time'

import TimeLine from '../TimeLine/TimeLine'

import type { ElementRef } from 'react'
import type {
	Event as EventType,
	DragEvent,
	ColumnMap,
	User,
	ActiveDrag,
	EventSelection
} from '../../types'

type Props = {
	/** all users to be rendered for this day */
	users: Array<User>,

	/** timezone of current calendar */
	timezone: string,

	/** passthrough classname */
	className?: string,

	/** earliest time to show on each day */
	minTime: string,

	/** latest time to show on each day */
	maxTime: string,

	/** everything before startTime is dimmed out */
	startTime: string,

	/** column is dimmed out after endTime */
	endTime: string,

	/** how tall the body of the calendar should be */
	calendarBodyHeight: number,

	/** trigger when scrolling any direction */
	onScroll: Function,

	/** how to split up an hour (4 = 15 minutes) */
	slotsPerHour: number,

	/** whenever scroll changes (like adding/removing users) this is tirggered  */
	onUpdateHorizontalPagerDetails: Function,

	/** all events, no matter what, i'll worry about what to render and what to skip */
	events: Array<EventType>,

	/** the starting date (end date matches on day view) */
	startDate: Object,

	/** how far do we have to drag before we can actually drag */
	dragThreshold: number,

	/** called when an event is dropped */
	onDropEvent: Function,

	/** called as an event is being dragged */
	onDragEvent: Function,

	/** how close to the edge do we need to get before we'll auto scroll for the user */
	scrollDuringDragMargin?: number,

	/** how many pixels to jump if dragging near edge of scroll */
	dragScrollSpeed: number,

	/** how far should we move over to make space for double/tripple booking */
	eventRightMargin: number,

	/** how long to press before it counts as a long press (ms) */
	longPressDelay: number,

	/** should we be able to resize zero duration blocks? */
	allowResizeToZeroDurationBlocks?: boolean,

	/** should we allow shrinking of first block to zero */
	allowResizeFirstBlockToZeroDuration?: boolean,

	/** i pass a user and the current date, you return the time HH:MM this user starts their shift */
	getStartTimeForUser: (user: User, date: moment) => string,

	/** i pass a user and current date, you return the time HH:MM this user ends their shift */
	getEndTimeForUser: (user: User, date: moment) => string,

	/** time in ms someone needs to click twice for a double click to count */
	doubleClickTime: number,

	/** triggered when two clicks happen within double click time (only called if doubleClickToCreate is true) */
	onDoubleClick: Function,

	/** should we use double click to create an event */
	doubleClickToCreate: boolean,

	/** the duration of a new event (long press) in seconds */
	newEventDefaultDurationSec: number,

	/** format for event time rendered on the event */
	eventTimeFormat: string,

	/** format for time rendered in gutter */
	timeGutterFormat?: string,

	/** triggered whenever a person clicks anywhere that is not an event  */
	onClick?: ({ time: moment, user: User }) => void
}

type State = {
	/** any currently selected event */
	selectedEvent?: ?EventType,

	/** an event that is highlighted is one that is long pressed and in "edit mode" */
	highlightedEvent?: ?EventType,

	/** tracks whether the screen is too smal to show the details next to the event */
	showEventDetailsInDialog: boolean
}

class Day extends PureComponent<Props, State> {
	static defaultProps = {
		dragThreshold: 10,
		scrollDuringDragMargin: 50,
		dragScrollSpeed: 5,
		eventRightMargin: 10,
		allowResizeToZeroDurationBlocks: true,
		allowResizeFirstBlockToZeroDuration: false,
		newEventDefaultDurationSec: 900 * 4, // 60 minutes
		timeGutterFormat: 'ha'
	}

	_timeRangeCache = {}

	/** tracks where everyhing should sit on the calendar */
	_columnMapCache: ?ColumnMap = null

	/** any event the mouse was last hovering */
	_lastHoverEvent: ?EventSelection &
		?{
			resize: {
				direction: string
			},
			eventNode: HTMLDivElement,
			blockNode: HTMLDivElement
		} = null

	/** keeps the current time line showing the current time */
	_timeLineInterval: ?IntervalID

	/** should the teammate header scroll trigger a body scroll (ignored when body is scrolling) */
	_ignoreNextTeammateScroll: boolean = false

	/** tracks the mouse position as it moves around the view */
	_lastMouseMove: ?{
		x: number,
		y: number
	}

	/** a ref to my outer most node */
	domNodeRef: { current: null | ElementRef<'div'> }

	/** a ref to the dragGrid */
	dragGridRef: { current: null | DragGrid }

	/** ref to the resizeGrid */
	resizeGridRef: { current: null | ResizeGrid }

	/** the div that sits inside the scroll area and wraps the day views  */
	scrollInnerRef: { current: null | ElementRef<'div'> }

	/** both the draggrid and the time gutter are wrapped in the body (teammate header is outside) */
	bodyWrapperRef: { current: null | ElementRef<'div'> }

	/** the headers that show teammates */
	teammateHeaderRef: { current: null | TeammateHeader }

	/** the time gutter on the left hand side */
	timeGutterRef: { current: null | TimeGutter }

	/** bit that shows the time as you move the mouse around */
	mouseTimeIndicatorRef: { current: null | ElementRef<'div'> }

	constructor(props: Props) {
		super(props)

		this.domNodeRef = React.createRef()
		this.dragGridRef = React.createRef()
		this.resizeGridRef = React.createRef()
		this.scrollInnerRef = React.createRef()
		this.teammateHeaderRef = React.createRef()
		this.timeGutterRef = React.createRef()
		this.mouseTimeIndicatorRef = React.createRef()
		this.bodyWrapperRef = React.createRef()

		this.state = {
			showEventDetailsInDialog: false
		}
	}

	getBodyNode = () => {
		return this.bodyWrapperRef.current
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
		this._timeLineInterval && clearInterval(this._timeLineInterval)
		window.removeEventListener('resize', this.updateHorizontalPagerDetails)
	}

	componentDidUpdate(prevProps: Props) {
		const { events, startDate, users, slotsPerHour } = this.props
		if (
			prevProps.events !== events ||
			prevProps.startDate !== startDate ||
			prevProps.users !== users ||
			prevProps.slotsPerHour !== slotsPerHour
		) {
			// reset all event cache
			this._columnMapCache = null
			this.placeAndSize()
			this.updateHorizontalPagerDetails()

			if (prevProps.slotsPerHour !== slotsPerHour) {
				this._timeRangeCache = {}
			}
			if (prevProps.startDate !== startDate) {
				this.setState({ highlightedEvent: null, selectedEvent: null })
				this.dragGridRef.current && this.dragGridRef.current.cancelDrag()
			}
			// if we only changed events, lets make sure to update our selection
			if (prevProps.events !== events) {
				const { selectedEvent } = this.state
				if (selectedEvent) {
					const match = events.find(event => event.id === selectedEvent.id)

					if (match) {
						this.handleSelectEvent({ event: match })
					} else {
						this.handleDeselectEvent()
					}
				}
			}
			//consider deselecting higher up for this
			if (
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
		if (this.dragGridRef.current) {
			this.updateHorizontalPagerDetails()
			this.placeAndSize()
		}
	}

	handleScroll = (e: Event) => {
		const { target } = e

		if (target instanceof HTMLElement) {
			const { scrollTop, scrollLeft } = target

			this._ignoreNextTeammateScroll = true

			this.teammateHeaderRef.current &&
				this.teammateHeaderRef.current.setScrollLeft(Math.max(0, scrollLeft))

			this.timeGutterRef.current &&
				this.timeGutterRef.current.setScrollTop(Math.max(0, scrollTop))

			// // arrows that sit in the upper right
			this.updateHorizontalPagerDetails()
			this.updateTimeIndicator()
		}
	}

	getTimeRangeDetails = (min: string, max: string) => {
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
		const scrolledRight =
			this.dragGridRef.current &&
			this.dragGridRef.current.isScrolledAllTheWayRight()
		const scrolledLeft =
			this.dragGridRef.current &&
			this.dragGridRef.current.isScrolledAllTheWayLeft()

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
		const dragGrid = this.dragGridRef.current

		if (dragGrid) {
			const scrollLeft = dragGrid.getScrollLeft()
			const pageWidth = dragGrid.getWidth()
			dragGrid.animateHorizontalTo(
				this.snapEventToNearestValidX({ mouseX: scrollLeft + pageWidth })
			)
		}
	}

	handleHorizontalPageBack = () => {
		const dragGrid = this.dragGridRef.current

		if (dragGrid) {
			const scrollLeft = dragGrid.getScrollLeft()
			const pageWidth = dragGrid.getWidth()
			dragGrid.animateHorizontalTo(
				this.snapEventToNearestValidX({ mouseX: scrollLeft - pageWidth })
			)
		}
	}

	handleTeammateScroll = (e: Event) => {
		const target = e.target

		if (target instanceof HTMLElement) {
			const { scrollLeft: teammateLeft } = target

			if (this._ignoreNextTeammateScroll) {
				this._ignoreNextTeammateScroll = false
				return true
			}

			this.dragGridRef.current &&
				this.dragGridRef.current.setScrollLeft(teammateLeft)
		}
	}

	snapEventToNearestValidX = ({ mouseX }: { mouseX: number }) => {
		const dayColWidth = this.dayColWidth()
		const nearest = Math.floor(mouseX / dayColWidth)
		return Math.max(
			0,
			Math.min(this.props.users.length - 1, nearest) * dayColWidth
		)
	}

	snapEventToNearestValidY = ({
		dragNodeTop,
		dragNodeHeight = 0,
		round = Math.round
	}: {
		dragNodeTop: number,
		dragNodeHeight?: number,
		round?: Function
	}) => {
		const slotHeight = this.slotHeight()
		const nearest = round(dragNodeTop / slotHeight)
		const maxTop = this.dayColHeight() - dragNodeHeight
		return Math.max(0, Math.min(maxTop, nearest * slotHeight))
	}

	yToTime = (y: number) => {
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

	heightToSeconds = (height: number) => {
		const range = this.getTimeRangeDetails(
			this.props.minTime,
			this.props.maxTime
		)
		const dayColHeight = this.dayColHeight()
		const ratio = height / dayColHeight
		return range.seconds * ratio
	}

	secondsToHeight = (seconds: number) => {
		const { slotDurationMin } = this.getTimeRangeDetails(
			this.props.minTime,
			this.props.maxTime
		)
		const slotHeight = this.slotHeight()
		const minutes = seconds / 60

		const height = (minutes / slotDurationMin) * slotHeight

		return height
	}

	timeToY = (date: moment) => {
		const { timezone, minTime, maxTime } = this.props
		const dayColHeight = this.dayColHeight()

		const startTime = parseInt(moment.tz(date, timezone).format('X'))
		const dayColTimeRangeDetails = this.getTimeRangeDetails(minTime, maxTime)
		const secondsIntoDay = startTime - dayColTimeRangeDetails.minTimestamp
		const top = (secondsIntoDay / dayColTimeRangeDetails.seconds) * dayColHeight

		return top
	}

	xToUser = (x: number) => {
		const dayColWidth = this.dayColWidth()
		const nearest = Math.floor(x / dayColWidth)
		return this.props.users[nearest]
	}

	getDragNode = ({
		blockIdx,
		dragEventNode,
		dragBlockNode
	}: {
		blockIdx: number,
		dragEventNode: HTMLElement,
		dragBlockNode: HTMLElement
	}) => {
		return blockIdx === 0 ? dragEventNode : dragBlockNode
	}

	handleMouseDownOnView = (e: Event) => {
		const target = e.target
		if (target instanceof HTMLElement) {
			const parentNode = target.parentNode
			if (parentNode instanceof HTMLElement) {
				return (
					target.classList.contains('timeslot') || // clicked a timeslot
					target.classList.contains('hour-block') || // clicked on hour block
					target.classList.contains('scroll-inner') || // clicked anywhere inside the drag scroll area
					target.classList.contains('bigcalendar__drag-grid') || // clicked on the drag view specifically
					(parentNode.classList.contains('bigcalendar__event-block') &&
						parentNode.classList.contains('available')) // they clicked on an available block (markAsBusy === false)
				)
			}
		}
		return false
	}

	getMinBlockResizeHeight = (event: EventType, blockIdx: number) => {
		return (this.props.allowResizeToZeroDurationBlocks && blockIdx > 0) ||
			(this.props.allowResizeToZeroDurationBlocks &&
				this.props.allowResizeFirstBlockToZeroDuration)
			? 0
			: this.slotHeight()
	}

	handleMouseDownOnEvent = () =>
		// e: MouseEvent | TouchEvent
		// selection: EventSelection
		{
			this.deselectAllTextSelections()
			return true
		}

	handleDropEvent = async ({
		event,
		dragEvent,
		newX,
		newY,
		resizeUpdates
	}: {
		event: ?EventType,
		dragEvent: DragEvent,
		newX: number,
		newY: number,
		resizeUpdates: Array<{
			blockIdx: number,
			newWidth?: number,
			newHeight?: number
		}>
	}) => {
		let newStartAt = this.yToTime(newY)
		const newUser = this.xToUser(newX)

		const { onDropEvent, timezone } = this.props
		const matches = document.querySelectorAll(
			'.bigcalendar__event.hover-available'
		)
		matches.forEach(match => match.classList.toggle('hover-available', false))

		if (
			newStartAt &&
			event &&
			newStartAt.format('YYYY-MM-DD HH:mm') ===
				moment.tz(event.startAt, timezone).format('YYYY-MM-DD HH:mm')
		) {
			newStartAt = null
		}

		// calculate durations for resizes
		let updates = []
		resizeUpdates.forEach(update => {
			if (typeof update.newHeight === 'number') {
				const duration = this.heightToSeconds(update.newHeight)

				updates.push({
					blockIdx: update.blockIdx,
					newDurationSec: duration
				})
			}
		})

		return (
			onDropEvent &&
			onDropEvent({
				event,
				dragEvent,
				newStartAt,
				newUser:
					!event || (newUser && newUser.id !== event.userId) ? newUser : null,
				blockUpdates: updates.length === 0 ? null : updates
			})
		)
	}

	handleDragEvent = (drag: ActiveDrag) => {
		// if anything is selected, null it
		if (this.state.selectedEvent) {
			this.setState({
				selectedEvent: null
			})
		}

		const { onDragEvent } = this.props
		const { dragEventNode, blockIdx } = drag

		if (blockIdx === 0) {
			const time = this.yToTime(parseFloat(dragEventNode.style.top))
			const timeNode = dragEventNode.querySelector('.time')
			timeNode && (timeNode.innerHTML = time.format('h:mma'))
		}

		return onDragEvent ? onDragEvent(drag) : true
	}

	handleResizeEvent = () =>
		/*updates: Array<{ blockIdx: number, newHeight?: number, newWidth?: number }>*/
		{
			//console.log('resizing event')
			return true
		}

	deselectAllTextSelections = () => {
		window.getSelection().removeAllRanges()
	}

	handleSelectEvent = ({ event }: { event: EventType }) => {
		if (event.details) {
			this.deselectAllTextSelections()

			this.setState(
				{
					selectedEvent: event,
					showEventDetailsInDialog: false
				},
				() => {
					// this can happen if a select/deselect happens rapid fire
					// and the result of the above setState is actually
					// setting the selected event to false
					if (!this.state.selectedEvent) {
						return
					}

					const dragGrid = this.dragGridRef.current
					const domNode = this.domNodeRef.current

					if (!dragGrid || !domNode) {
						return
					}
					// place details next to event
					const eventNode = dragGrid.getEventNode(event)
					const detailsNode = domNode.querySelector('.event-details')

					if (!eventNode || !detailsNode) {
						return
					}

					// move details view away to grid sizes correctly for below calculations
					detailsNode.style.top = '-200em'

					const detailsWidth = sizeUtil.getWidth(detailsNode)
					const gridWidth = dragGrid.getWidth()
					const scrollLeft = dragGrid.getScrollLeft()
					const eventRight = sizeUtil.getLocalRight(eventNode)
					const eventLeft = sizeUtil.getLocalLeft(eventNode)
					const detailsRight = eventRight + detailsWidth
					const gridHeight = dragGrid.getScrollHeight()
					const detailsHeight = sizeUtil.getHeight(detailsNode)

					let setTop = false
					let showInDialog = false

					// grid must be at least twice as details (not sure about this)
					if (
						detailsWidth > gridWidth / 2 ||
						detailsHeight > dragGrid.getHeight()
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
			)
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

	handleHighlightEvent = ({ event }: { event: EventType }) => {
		this.setState({ highlightedEvent: event })
	}

	handleUnHighlightEvent = () => {
		this.setState({ highlightedEvent: null })
	}

	handleCloseEventDetails = () => {
		this.handleDeselectEvent()
	}

	placeAndSize = () => {
		const firstDayCol =
			this.scrollInnerRef.current &&
			this.scrollInnerRef.current.querySelector('.bigcalendar__day-col')

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
		const firstDayCol =
			this.scrollInnerRef.current &&
			this.scrollInnerRef.current.querySelector('.bigcalendar__day-col')
		return sizeUtil.getWidth(firstDayCol)
	}
	dayColHeight = () => {
		const firstDayCol =
			this.scrollInnerRef.current &&
			this.scrollInnerRef.current.querySelector('.bigcalendar__day-col')
		const height = sizeUtil.getHeight(firstDayCol)
		return height
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
					eventStart.isBetween(min, max, null, '[]')
				)
			}),
			['startAt', 'title', 'subtitle']
		)
	})

	isToday = (date: moment) => {
		return (
			this.props.startDate.format('YYYY-MM-DD') ===
			moment.tz(date, this.props.timezone).format('YYYY-MM-DD')
		)
	}

	getColumnMap = (): ColumnMap => {
		if (!this._columnMapCache) {
			const { minTime, maxTime, startDate, events, timezone } = this.props
			const range = this.getTimeRangeDetails(minTime, maxTime)
			const totalTimeSlots = range.totalTimeSlots
			const slotHeight = this.slotHeight()
			let endSlot = 0

			const todaysEvents = this.eventsForDay(events, startDate)

			const columnMap: ColumnMap = {
				eventDetails: {}
			}

			todaysEvents.forEach(event => {
				const currentStart = moment.tz(event.startAt, timezone)
				const eventMap = []
				const { userId } = event

				if (!columnMap[userId]) {
					columnMap[userId] = new Array(totalTimeSlots).fill(null)
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
						if (!columnMap[userId][slot]) {
							columnMap[userId][slot] = []
						}

						if (!columnMap[userId][slot][column]) {
							columnMap[userId][slot][column] = {}
						}

						if (details.busy && columnMap[userId][slot][column].busy) {
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
					if (columnMap[userId][slot][column].busy === false) {
						overlap = true
						columnMap[userId][slot][column] = {
							...details,
							overlapping: 1
						}
					} else {
						columnMap[userId][slot][column] = details
					}
				})

				// STEP 4, track it for easy retrieval
				const eventStartY = this.timeToY(event.startAt)

				const eventStartSlot = Math.round(eventStartY / slotHeight)
				columnMap.eventDetails[event.id] = {
					startSlot: eventStartSlot,
					endSlot,
					column,
					overlapping: overlap
				}
			})

			// STEP 5, add additional data around each event to make sizing possible
			todaysEvents.forEach(event => {
				const details = columnMap.eventDetails[event.id]
				let maxColumns = 0
				let overlapped = false
				for (let slot = details.startSlot; slot < details.endSlot; slot++) {
					overlapped =
						overlapped ||
						columnMap[event.userId][slot][details.column].eventId !== event.id

					if (
						columnMap[event.userId][slot][details.column].eventId ===
							event.id &&
						columnMap[event.userId][slot][details.column].busy
					) {
						maxColumns = Math.max(
							maxColumns,
							columnMap[event.userId][slot].filter(details => details.busy)
								.length
						)
					}
				}
				columnMap.eventDetails[event.id].columns = Math.max(
					maxColumns,
					columnMap.eventDetails[event.id].column + 1
				)
				columnMap.eventDetails[event.id].overlapped = overlapped
			})

			this._columnMapCache = columnMap
		}

		return this._columnMapCache
	}

	placeEvent = (event: EventType) => {
		const { users } = this.props
		const eventNode =
			this.dragGridRef.current && this.dragGridRef.current.getEventNode(event)

		const userIndex = findIndex(users, u => u.id === event.userId)
		const dayColWidth = this.dayColWidth()
		const dayColHeight = this.dayColHeight()

		if (eventNode && userIndex > -1 && dayColWidth && dayColHeight) {
			//left
			const left = userIndex * dayColWidth
			eventNode.style.left = `${left}px`

			//top
			const top = this.timeToY(event.startAt)
			eventNode.style.top = `${top}px`

			// show the event (if it was even hidden)
			eventNode.style.display = 'block'
		} else if (eventNode) {
			//hide the event if it does not belong to a teammate
			eventNode.style.display = 'none'
		}
	}

	sizeEvent = (event: EventType | DragEvent) => {
		const eventNode =
			this.dragGridRef.current && this.dragGridRef.current.getEventNode(event)

		const { users } = this.props
		const userIndex = findIndex(users, u => u.id === event.userId)
		const dayColWidth = this.dayColWidth()
		const dayColHeight = this.dayColHeight()

		if (eventNode && userIndex > -1 && dayColWidth && dayColHeight) {
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
			} else {
				eventNode.style.width = dayColWidth + 'px'
			}
		}
	}

	sizeTimeLine = () => {
		const timeLineNode =
			this.scrollInnerRef.current &&
			this.scrollInnerRef.current.querySelector('.bigcalendar__time-line')

		const dragGrid = this.dragGridRef.current

		if (timeLineNode && dragGrid) {
			const oldDisplay = timeLineNode.style.display
			timeLineNode.style.display = 'none'
			const pageWidth = dragGrid.getScrollWidth()
			timeLineNode.style.width = `${pageWidth}px`
			timeLineNode.style.display = oldDisplay
		}
	}

	placeTimeLine = () => {
		const timeLineNode =
			this.scrollInnerRef.current &&
			this.scrollInnerRef.current.querySelector('.bigcalendar__time-line')

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

	handleMouseMove = (e: MouseEvent) => {
		const gridPosition = sizeUtil.getPosition(this.bodyWrapperRef.current)
		const gridWidth = sizeUtil.getWidth(this.bodyWrapperRef.current)
		const gridHeight = sizeUtil.getHeight(this.bodyWrapperRef.current)
		const { clientX: x, clientY: y } = eventUtil.clientXY(e)

		const dragGrid = this.dragGridRef.current
		const domNode = this.domNodeRef.current

		if (!dragGrid || !domNode) {
			return
		}

		if (dragGrid.isDraggingEvent()) {
			this._lastHoverEvent = null
		} else {
			// update hover state on all daycols
			let hoverEvent = dragGrid.getEventsAtLocation({
				x,
				y
			})[0]

			//first lets make sure it's not because a hit test failed
			if (
				this._lastHoverEvent &&
				!hoverEvent &&
				sizeUtil.doesIntersect({ x, y, node: this._lastHoverEvent.blockNode })
			) {
				hoverEvent = this._lastHoverEvent
			} else {
				if (this._lastHoverEvent) {
					domNode.querySelectorAll('.hover-available').forEach(eventNode => {
						eventNode.classList.toggle('hover-available', false)
					})
				}

				if (hoverEvent && !hoverEvent.block.markAsBusy) {
					hoverEvent.eventNode.classList.toggle('hover-available', true)
				}
			}

			this._lastHoverEvent = hoverEvent
		}

		const mouseTimeIndicator = this.mouseTimeIndicatorRef.current

		if (
			mouseTimeIndicator &&
			e.clientX > gridPosition.x &&
			e.clientX < gridPosition.x + gridWidth &&
			e.clientY > gridPosition.y &&
			e.clientY < gridPosition.y + gridHeight
		) {
			if (mouseTimeIndicator.classList.contains('hide')) {
				mouseTimeIndicator.classList.remove('hide')
			}

			this._lastMouseMove = {
				x,
				y,
				gridPosition,
				gridWidth,
				gridHeight
			}
			this.updateTimeIndicator()
		} else {
			this.hideMouseTimeIndicatorRef()
		}
	}

	hideMouseTimeIndicatorRef = () => {
		const indicator = this.mouseTimeIndicatorRef.current
		if (indicator && !indicator.classList.contains('hide')) {
			indicator.classList.add('hide')
		}
	}

	updateTimeIndicator = () => {
		const indicator = this.mouseTimeIndicatorRef.current
		const dragGrid = this.dragGridRef.current
		const resizeGrid = this.resizeGridRef.current

		if (!indicator || !dragGrid || !resizeGrid) {
			return
		}

		// probably a touch device so no mouse movement has taken place yet
		// or we're moving around the view,ignore everything
		if (!this._lastMouseMove || dragGrid.isDraggingView()) {
			indicator.style.display = 'none'
			return
		}

		let y = this._lastMouseMove.y

		// stick to dradding event
		if (dragGrid.isDraggingEvent()) {
			// cannot use getLocalTop because we may be dragging a block (vs the whole event)
			// and that would return the top from the event (first positioned parent)
			// are we resizing?
			const dragNode = dragGrid.getDragBlockNode()
			const activeResize = resizeGrid.getActiveResize()

			if (activeResize && activeResize.direction === 's') {
				y = sizeUtil.getBottom(dragNode)
			} else {
				y = sizeUtil.getTop(dragNode)
			}
		}

		const bodyTop = sizeUtil.getTop(this.bodyWrapperRef.current)
		const scrollTop = dragGrid.getScrollTop()

		y = y - bodyTop + scrollTop

		const top = this.snapEventToNearestValidY({
			dragNodeTop: y,
			round: Math.floor
		})

		const time = this.yToTime(top)
		const minutes = time.format('mm')

		if (minutes === '00') {
			indicator.style.display = 'none'
		} else {
			indicator.style.lineHeight = this.slotHeight() + 'px'
			indicator.style.top = top + 'px'
			indicator.style.display = 'block'
			indicator.innerHTML = `:${minutes}`
		}
	}

	handleClickView = (e: MouseEvent | TouchEvent) => {
		const { onClick, doubleClickToCreate } = this.props

		//if we are doing double click to create, no need to run logic
		if (doubleClickToCreate) {
			return
		}

		const dragGrid = this.dragGridRef.current

		if (!dragGrid) {
			return
		}

		let time
		const { clientX, clientY } = dragGrid.globalToLocal(eventUtil.clientXY(e))
		const currentTarget: HTMLElement = (e.currentTarget: any)

		// if they clicked the header, time is null
		if (
			currentTarget.classList &&
			currentTarget.classList.contains('bigcalendar__teammate-header')
		) {
			time = null
		} else {
			time = this.yToTime(
				this.snapEventToNearestValidY({
					dragNodeTop: clientY,
					round: Math.floor
				})
			)
		}

		const user = this.xToUser(
			this.snapEventToNearestValidX({ mouseX: clientX })
		)

		return onClick && onClick({ time, user, e })
	}

	handleDoubleClick = (e: MouseEvent | TouchEvent) => {
		const { onDoubleClick, doubleClickToCreate } = this.props
		const dragGrid = this.dragGridRef.current

		if (!dragGrid) {
			return
		}

		let time
		const { clientX, clientY } = dragGrid.globalToLocal(eventUtil.clientXY(e))

		const currentTarget: HTMLElement = (e.currentTarget: any)

		// if they clicked the header, time is null
		if (
			currentTarget.classList &&
			currentTarget.classList.contains('bigcalendar__teammate-header')
		) {
			time = null
		} else {
			time = this.yToTime(
				this.snapEventToNearestValidY({
					dragNodeTop: clientY,
					round: Math.floor
				})
			)
		}

		const user = this.xToUser(
			this.snapEventToNearestValidX({ mouseX: clientX })
		)

		// pass through double clicks on teammate header
		if (!doubleClickToCreate && time) {
			return
		}

		return onDoubleClick && onDoubleClick({ time, user, e })
	}

	handleLongPressView = ({
		clientX,
		clientY
	}: {
		clientX: number,
		clientY: number
	}) => {
		const dragGrid = this.dragGridRef.current

		if (!dragGrid) {
			return
		}

		const { newEventDefaultDurationSec } = this.props

		const height = this.secondsToHeight(newEventDefaultDurationSec)
		const {
			clientX: normalizedX,
			clientY: normalizedY
		} = dragGrid.globalToLocal({ clientX, clientY })

		const top = normalizedY - height / 2
		const startAt = this.yToTime(top)
		const user = this.xToUser(normalizedX)

		const event = {
			id: 'new',
			originalId: '',
			startAt: startAt.format('YYYY-MM-DD HH:mm'),
			userId: user.id,
			kind: 'tentative',
			blocks: [
				{
					id: 'new-block',
					title: '',
					durationSec: newEventDefaultDurationSec,
					markAsBusy: true
				}
			]
		}

		dragGrid.dropNewEventAndBeginDrag({
			clientX,
			clientY,
			event,
			left: this.snapEventToNearestValidX({ mouseX: normalizedX }),
			top: this.snapEventToNearestValidY({
				dragNodeTop: top,
				dragNodeHeight: height
			})
		})
	}

	render() {
		const {
			users,
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
			longPressDelay,
			eventTimeFormat,
			dragThreshold,
			dragScrollSpeed,
			scrollDuringDragMargin,
			timeGutterFormat
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

		const hours = timeUtil.generateTimeGutterHours({
			date: startDate,
			min: minTime,
			max: maxTime,
			timezone,
			format: timeGutterFormat
		})

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
			>
				<div className="bigcalendar__user-header">
					<TeammateHeader
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
						ref={this.timeGutterRef}
					>
						<div
							ref={this.mouseTimeIndicatorRef}
							className="bigcalendar__day-view-mouse-time-indicator hide"
						>
							...
						</div>
					</TimeGutter>
					<ResizeGrid
						ref={this.resizeGridRef}
						onMouseDownOnEvent={this.handleMouseDownOnEvent}
						onDragEvent={this.handleDragEvent}
						onResizeEvent={this.handleResizeEvent}
						snapEventToNearestValidY={this.snapEventToNearestValidY}
						getMinBlockResizeHeight={this.getMinBlockResizeHeight}
						onDropEvent={this.handleDropEvent}
						render={({
							handleDragEvent,
							handleMouseDownOnEvent,
							handleDropEvent,
							enableAutoScrollX,
							enableAutoScrollY
						}) => (
							<DragGrid
								onMouseDownOnView={this.handleMouseDownOnView}
								onSelectEvent={this.handleSelectEvent}
								onDeselectEvent={this.handleDeselectEvent}
								onHighlightEvent={this.handleHighlightEvent}
								onUnHighlightEvent={this.handleUnHighlightEvent}
								onMouseDownOnEvent={handleMouseDownOnEvent}
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
								onDragEvent={handleDragEvent}
								onDropEvent={handleDropEvent}
								onDoubleClick={this.handleDoubleClick}
								onClickView={this.handleClickView}
								doubleClickTime={doubleClickTime}
								longPressDelay={longPressDelay}
								onLongPressView={this.handleLongPressView}
								timeFormat={eventTimeFormat}
								dragThreshold={dragThreshold}
								scrollDuringDragMargin={scrollDuringDragMargin}
								dragScrollSpeed={dragScrollSpeed}
								enableAutoScrollX={enableAutoScrollX}
								enableAutoScrollY={enableAutoScrollY}
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
						)}
					/>
				</div>
				{eventDetails && showEventDetailsInDialog && (
					<Modal
						isOpen={true}
						isSmall={true}
						onRequestClose={this.handleDeselectEvent}
					>
						<EventDetails {...eventDetails} />
					</Modal>
				)}
			</div>
		)
	}
}

export default Day
