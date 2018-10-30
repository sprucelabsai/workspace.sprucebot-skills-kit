// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { Easing, Tween } from 'es6-tween'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment-timezone'

import TimeGutter from '../TimeGutter/TimeGutter'
import TeammateHeader from '../TeammateHeader/TeammateHeader'
import DayCol from './DayCol'
import Event from '../Event/Event'
import sizeUtils from '../../utils/size'
import size from '../../utils/size'

type Props = {
	showRightProps: boolean,
	users: Array<Object>,
	hours: Array<Object>,
	location: Object,
	className?: String,
	minTime: String,
	maxTime: String,
	startTime: String,
	endTime: String,
	viewHeight: Number,
	onScroll: Function,
	slotsPerHour: Number,
	onUpdateHorizontalPagerDetails: Function,
	events: Array<Object>,
	startDate: Object,
	dragThreshold: Number, // how far to drag before actually initiating drag
	onDropEvent: Function,
	scrollDuringDragMargin: Number, // how close to the edge do we need to get before we'll auto scroll for the user
	dragScrollSpeed: Number // how many pixels to jump if dragging near edge of scroll
}

type State = {
	scrollLeft: Number,
	scrollTop: Number,
	dragEvent: Object,
	dragBlock: Object
}

class Day extends Component<Props> {
	state = {
		scrollLeft: 0,
		scrollTop: 0
	}

	static defaultProps = {
		dragThreshold: 10,
		scrollDuringDragMargin: 50,
		dragScrollSpeed: 5
	}

	_timeRangeCache = {}

	constructor(props) {
		super(props)
		this.scrollWrapperRef = React.createRef()
		this.scrollInnerRef = React.createRef()
	}

	componentDidMount = () => {
		this.updateHorizontalPagerDetails()
		this.placeAndSize()

		window.addEventListener('resize', this.updateHorizontalPagerDetails)

		//TODO better way to detect everything is rendered and sized correctly
		setTimeout(this.updateHorizontalPagerDetails, 1000)
		setTimeout(this.placeAndSize, 1000)
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateHorizontalPagerDetails)
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

		// keep event under mouse as scroll
		if (this._activeDrag) {
			this.handleDragOfEvent(this._activeDrag.lastEvent, false)
		}
	}

	getTimeRangeDetails = (min, max) => {
		const {
			startDate,
			slotsPerHour,
			location: { timezone }
		} = this.props

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
		const scrolledRight = sizeUtils.isScrolledAllTheWayRight(
			this.scrollWrapperRef.current
		)
		const scrolledLeft = sizeUtils.isScrolledAllTheWayLeft(
			this.scrollWrapperRef.current
		)

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
		const pageWidth = sizeUtils.getWidth(this.scrollWrapperRef.current)
		this.animateHorizontalTo(scrollLeft + pageWidth)
	}

	handleHorizontalPageBack = () => {
		const { scrollLeft } = this.state
		const pageWidth = sizeUtils.getWidth(this.scrollWrapperRef.current)
		this.animateHorizontalTo(scrollLeft - pageWidth)
	}

	animateHorizontalTo = left => {
		const { scrollLeft } = this.state
		const node = this.scrollWrapperRef.current
		const pageWidth = sizeUtils.getWidth(this.scrollWrapperRef.current)

		this._activeTween = new Tween({
			scrollLeft
		})
			.to({ scrollLeft: left }, 500)
			.easing(Easing.Quintic.Out)
			.on('update', ({ scrollLeft }) => {
				node.scrollLeft = scrollLeft
			})

		this._activeTween.start()
	}

	handleTeammateScroll = e => {
		const target = e.target
		const { scrollLeft: teammateLeft } = target
		const { scrollLeft: viewLeft } = this.state

		if (teammateLeft !== viewLeft) {
			this.scrollWrapperRef.current.scrollLeft = teammateLeft
		}
	}

	handleViewMouseDown = e => {
		const { clientX, clientY } = e

		this.dragOffset = {
			startingScrollLeft: this.state.scrollLeft,
			startingScrollTop: this.state.scrollTop,
			startingClientX: clientX,
			startingClientY: clientY
		}
		e.preventDefault()
		window.addEventListener('mousemove', this.handleMouseDragOfView)
		window.addEventListener('mouseup', this.handleMouseUp)
	}

	handleMouseDragOfView = e => {
		const { clientX, clientY } = e
		const {
			startingClientX,
			startingClientY,
			startingScrollLeft,
			startingScrollTop
		} = this.dragOffset
		const deltaLeft = clientX - startingClientX
		const deltaTop = clientY - startingClientY

		this.scrollWrapperRef.current.scrollLeft = startingScrollLeft - deltaLeft
		this.scrollWrapperRef.current.scrollTop = startingScrollTop - deltaTop
	}

	handleEventMouseDown = (e, event, block, idx) => {
		if (block.markAsBusy) {
			e.preventDefault()
			e.stopPropagation()

			this._pendingDrag = { event, block, idx }
			this._startingDragPoint = { x: e.clientX, y: e.clientY }

			if (idx === 0) {
				window.addEventListener('mousemove', this.handleDragOfEvent)
			} else {
				window.addEventListener('mousemove', this.handleDragOfBlock)
			}
			window.addEventListener('mouseup', this.handleMouseUpOfEvent)
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
		return time.format('h:mma')
	}

	xToUser = y => {
		const slotHeight = this.slotHeight()
		const nearest = Math.round(y / slotHeight)
		return this.props.users[nearest]
	}

	beginScrollHorizontally = speed => {
		if (this._scrollHorizontalSpeed !== speed) {
			clearInterval(this._scrollHorizontalInterval)
			this._scrollHorizontalSpeed = speed
			this._scrollHorizontalInterval = setInterval(() => {
				this.scrollWrapperRef.current.scrollLeft += speed
			}, 10)
		}
	}
	stopScrollingHorizontally = () => {
		this._scrollHorizontalSpeed = 0
		clearInterval(this._scrollHorizontalInterval)
	}

	beginScrollingVertically = speed => {
		if (this._scrollVerticalSpeed !== speed) {
			clearInterval(this._scrollVerticalInterval)
			this._scrollVerticalSpeed = speed
			this._scrollVerticalInterval = setInterval(() => {
				this.scrollWrapperRef.current.scrollTop += speed
			}, 10)
		}
	}
	stopScrollingVertically = () => {
		this._scrollVerticalSpeed = 0
		clearInterval(this._scrollVerticalInterval)
	}

	handleDragOfEvent = (e, autoScroll = true) => {
		const { dragEvent } = this.state
		if (dragEvent) {
			const { type } = this._activeDrag
			const { clientX, clientY } = e
			const { scrollDuringDragMargin, dragScrollSpeed } = this.props

			const {
				dragEventNode,
				offsetX,
				offsetY,
				wrapperLeft,
				wrapperTop,
				dragEventHeight
			} = this._activeDrag

			//if we are close to an edge, lets scroll that first
			const normalizedClientX = clientX - wrapperLeft
			const normalizedClientY = clientY - wrapperTop
			const wrapperRight =
				size.getRight(this.scrollWrapperRef.current) - wrapperLeft
			const wrapperBottom =
				size.getBottom(this.scrollWrapperRef.current) - wrapperTop

			// scroll right
			if (autoScroll) {
				if (normalizedClientX >= wrapperRight - scrollDuringDragMargin) {
					this.beginScrollHorizontally(dragScrollSpeed)
				} else if (normalizedClientX <= scrollDuringDragMargin) {
					this.beginScrollHorizontally(-dragScrollSpeed)
				} else {
					this.stopScrollingHorizontally()
				}

				if (normalizedClientY >= wrapperBottom - scrollDuringDragMargin) {
					this.beginScrollingVertically(dragScrollSpeed)
				} else if (normalizedClientY <= scrollDuringDragMargin) {
					this.beginScrollingVertically(-dragScrollSpeed)
				} else {
					this.stopScrollingVertically()
				}
			}

			const scrollTop = this.scrollWrapperRef.current.scrollTop
			const scrollLeft = this.scrollWrapperRef.current.scrollLeft

			const x = this.snapEventToNearestValidX(
				normalizedClientX + scrollLeft - offsetX
			)
			const y = this.snapEventToNearestValidY(
				normalizedClientY + scrollTop - offsetY,
				dragEventHeight
			)

			// update position
			dragEventNode.style.left = x + 'px'
			dragEventNode.style.top = y + 'px'

			// update time
			const time = this.yToTime(y)
			dragEventNode.querySelector('.time').innerHTML = time

			//track last event
			this._activeDrag.lastEvent = e
		} else {
			const { clientX, clientY } = e
			const { x, y } = this._startingDragPoint

			const a = x - clientX
			const b = y - clientY

			const distance = Math.sqrt(a * a + b * b)
			if (distance >= this.props.dragThreshold) {
				if (this._pendingDrag.idx === 0) {
					this.startDragOfEvent(e, this._pendingDrag.event)
				} else {
					this.startDragOfBlock(
						e,
						this._pendingDrag.event,
						this._pendingDrag.block,
						this._pendingDrag.idx
					)
				}
				this._pendingDrag = null
			}
		}
	}

	handleMouseUp = e => {
		window.removeEventListener('mousemove', this.handleMouseDragOfView)
		window.removeEventListener('mouseup', this.handleMouseUp)
	}
	handleMouseUpOfEvent = e => {
		if (!this.state.dragEvent) {
			alert('SELECTED')
		} else {
			this.handleDropOfEvent()
		}

		window.removeEventListener('mousemove', this.handleDragOfEvent)
		window.removeEventListener('mouseup', this.handleMouseUpOfEvent)
	}

	handleDropOfEvent = async () => {
		const { dragEvent, dragEventNode, sourceEventNode } = this._activeDrag
		const { onDropEvent } = this.props

		// stop scrolling
		this.stopScrollingHorizontally()
		this.stopScrollingVertically()

		this._activeDrag = null

		const valid = onDropEvent ? await onDropEvent(dragEvent) : false

		const reset = () => {
			this.setState({ dragEvent: null })
		}

		if (valid) {
			reset()
		} else {
			dragEventNode.classList.toggle('animate', true)
			dragEventNode.style.left = sourceEventNode.style.left
			dragEventNode.style.top = sourceEventNode.style.top

			// let animations finish
			setTimeout(reset, 500)
		}
	}

	placeAndSize = () => {
		const firstDayCol = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__day-col'
		)

		if (firstDayCol) {
			const { events } = this.props

			events.forEach(event => {
				this.placeEvent(event)
				this.sizeEvent(event)
			})
		}
	}

	startDragOfEvent = async (e, event) => {
		//clone the event and render it in the dom
		const dragEvent = cloneDeep(event)
		dragEvent.originalId = dragEvent.id
		dragEvent.id = `dragging`

		await this.setState({ dragEvent })

		// make sure the event is the right size
		this.sizeEvent(dragEvent)

		// place this event right over the dragged one
		const eventNode = this.scrollWrapperRef.current.querySelector(
			`[data-event-id='${event.id}']`
		)
		const dragEventNode = this.scrollWrapperRef.current.querySelector(
			`[data-event-id='${dragEvent.id}']`
		)

		dragEventNode.style.left = eventNode.style.left
		dragEventNode.style.top = eventNode.style.top

		//calculate offset to keep event in proper position relative to the mouse
		const { clientX, clientY } = e

		const wrapperLeft = size.getLeft(this.scrollWrapperRef.current)
		const wrapperTop = size.getTop(this.scrollWrapperRef.current)

		const scrollTop = this.scrollWrapperRef.current.scrollTop
		const scrollLeft = this.scrollWrapperRef.current.scrollLeft

		const offsetY =
			clientY - wrapperTop - parseFloat(eventNode.style.top) + scrollTop
		const offsetX =
			clientX - wrapperLeft + scrollLeft - parseFloat(eventNode.style.left)

		this._activeDrag = {
			type: 'event',
			dragEvent,
			sourceEvent: event,
			dragEventNode,
			dragEventHeight: size.getHeight(dragEventNode),
			sourceEventNode: eventNode,
			offsetX,
			offsetY,
			wrapperLeft,
			wrapperTop
		}
	}

	dayColWidth = () => {
		const firstDayCol = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__day-col'
		)
		return sizeUtils.getWidth(firstDayCol)
	}
	dayColHeight = () => {
		const firstDayCol = this.scrollInnerRef.current.querySelector(
			'.bigcalendar__day-col'
		)
		return sizeUtils.getHeight(firstDayCol)
	}

	slotHeight = () => {
		const { minTime, maxTime } = this.props
		const range = this.getTimeRangeDetails(minTime, maxTime)
		const dayColHeight = this.dayColHeight()
		return dayColHeight / range.totalTimeSlots
	}

	placeEvent = event => {
		const { users, location, minTime, maxTime } = this.props

		const eventNode = this.scrollWrapperRef.current.querySelector(
			`[data-event-id='${event.id}']`
		)

		const userIndex = findIndex(users, u => u.id === event.userId)
		const dayColWidth = this.dayColWidth()
		const dayColHeight = this.dayColHeight()

		if (userIndex > -1 && dayColWidth && dayColHeight) {
			//left
			const left = userIndex * dayColWidth
			eventNode.style.left = `${left}px`

			//top
			const startTime = parseInt(
				moment.tz(event.startAt, location.timezone).format('X')
			)
			const dayColTimeRangeDetails = this.getTimeRangeDetails(minTime, maxTime)
			const secondsIntoDay = dayColTimeRangeDetails.maxTimestamp - startTime
			const top =
				(secondsIntoDay / dayColTimeRangeDetails.seconds) * dayColHeight
			eventNode.style.top = `${top}px`

			// show the event (if it was even hidden)
			eventNode.style.display = 'block'
		} else {
			//hide the event if it does not belong to a teammate
			eventNode.style.display = 'none'
		}
	}

	sizeEvent = event => {
		const { minTime, maxTime } = this.props

		const dayColHeight = this.dayColHeight()

		const eventNode = this.scrollWrapperRef.current.querySelector(
			`[data-event-id='${event.id}']`
		)
		//height for blocks
		const blockNodes = eventNode.querySelectorAll('.bigcalendar__event-block')
		const dayColTimeRangeDetails = this.getTimeRangeDetails(minTime, maxTime)

		event.blocks.forEach((block, idx) => {
			const height =
				(block.durationSec / dayColTimeRangeDetails.seconds) * dayColHeight

			const node = blockNodes[idx]
			node.style.height = `${height}px`
		})
	}

	render() {
		const {
			users,
			location,
			hours,
			viewHeight,
			minTime,
			maxTime,
			slotsPerHour,
			startTime,
			endTime,
			events,
			startDate
		} = this.props

		const { scrollTop, scrollLeft, dragEvent } = this.state

		return (
			<div className="bigcalendar__view-day">
				<div className="bigcalendar__user-header">
					<TeammateHeader
						onMouseDown={this.handleViewMouseDown}
						onScroll={this.handleTeammateScroll}
						scrollLeft={scrollLeft}
						users={users}
						location={location}
					/>
				</div>
				<div className="bigcalendar__body-wrapper">
					<TimeGutter
						hours={hours}
						viewHeight={viewHeight}
						scrollTop={scrollTop}
						onMouseDown={this.handleViewMouseDown}
					/>
					<div
						onMouseDown={this.handleViewMouseDown}
						onScroll={this.handleScroll}
						ref={this.scrollWrapperRef}
						className="bigcalendar__scroll-wrapper"
						style={{
							height: viewHeight
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
									timezone={location.timezone}
								/>
							))}
							{events.map(event => (
								<Event
									className={
										dragEvent && dragEvent.originalId === event.id
											? 'is-drag-source'
											: ''
									}
									onMouseDown={this.handleEventMouseDown}
									data-event-id={event.id}
									event={event}
									timezone={location.timezone}
								/>
							))}

							{dragEvent && (
								<Event
									className="is-active-drag"
									data-event-id="dragging"
									event={dragEvent}
									timezone={location.timezone}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Day
