// @flow
import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Easing, Tween } from 'es6-tween'
import cloneDeep from 'lodash/cloneDeep'

import Event from '../Event/Event'
import sizeUtil from '../../utils/size'
import eventUtil from '../../utils/event'

import type { ElementRef } from 'react'
import type {
	Event as EventType,
	DragEvent,
	EventSelection,
	ActiveDrag
} from '../../types'

type Props = {
	/** passthrough classname */
	className?: string,

	/** passthrough children */
	children?: any,

	/** Triggerd when an event is clicked. Return false to cancel. Return selection with any changes you need. */
	onMouseDownOnEvent: (
		e: MouseEvent | TouchEvent,
		selection: EventSelection
	) => boolean,

	/** triggered when mouse down or touch starts on the view (not an event). return false to cancel defalut action*/
	onMouseDownOnView: (e: MouseEvent | TouchEvent) => boolean | void,

	/** triggered when a double click or tap is performed on the view. return false to cancel defalut action*/
	onDoubleClickView?: (e: MouseEvent | TouchEvent) => boolean | void,

	/** triggerd when a click or tap is executed on the view, return false to cancel default action */
	onClickView?: (e: MouseEvent | TouchEvent) => void,

	/** trigged when the view is scrolled */
	onScroll?: (e: MouseEvent) => void,

	/** trigged when an event is dropped (if we are in a longPressToCreate scenario, event is empty) */
	onDropEvent?: ({
		event: ?EventType,
		dragEvent: DragEvent,
		newX: number,
		newY: number
	}) => Promise<boolean> | boolean,

	/** triggered as an event is being dragged */
	onDragEvent?: ActiveDrag => boolean | void,

	/** triggered by long press on event */
	onHighlightEvent?: (selection: EventSelection) => boolean | void,

	/** triggered when an event is unhighlighted (touch only) */
	onUnHighlightEvent?: (event: EventType) => void,

	/** triggered when an event is tapped/clicked */
	onSelectEvent?: (selection: EventSelection) => void,

	/** triggered when an event is deselected (from clicking/tapping off the event) */
	onDeselectEvent?: Function,

	/** triggered based on long press on the view (for creation) */
	onLongPressView?: ({ clientX: number, clientY: number }) => void,

	/** for snapping to the nearest x */
	snapEventToNearestValidX: Function,

	/** for snapping to the nearest y */
	snapEventToNearestValidY: Function,

	/** how far to drag before actually initiating drag */
	dragThreshold: number,

	/** how close to the edge do we need to get before we'll auto scroll for the user */
	scrollDuringDragMargin: number,

	/** how many pixels to jump if dragging near edge of scroll */
	dragScrollSpeed: number,

	/** all the events (to be rendered) */
	events: Array<EventType>,

	/** current timezone (America/Denver) */
	timezone: string,

	/** returns the node of the element being dragged */
	getDragNode: Function,

	/** set an event to be highlighted, which puts it into a drag state without having to drag */
	highlightedEvent: ?EventType,

	/** a selected event shows event details */
	selectedEvent: ?EventType,

	/** how long you have to hold down in milliseconds to trigger a long press */
	longPressDelay: number,

	/** a function i can pass an event to and it'll be sized according to duration */
	sizeEvent: Function,

	/** time in milliseconds you must click twice to count as a double click */
	doubleClickTime: number,

	/** moment format for time, passed through to events */
	timeFormat: string,

	/** should we enable autoscroll left/right when dragging */
	enableAutoScrollX: boolean,

	/** auto scroll when dragging up/down */
	enableAutoScrollY: boolean
}

type State = {
	dragEvent: ?DragEvent
}

class DragGrid extends PureComponent<Props, State> {
	/** the outer most node of this component */
	domNodeRef: { current: null | ElementRef<'div'> }

	/** animater for scrolling to x */
	_activeTween: ?Tween

	/** we just clicked on an event, so if we move, get ready to drag */
	_pendingDrag: ?EventSelection

	/** details of what is being dragged */
	_activeDrag: ActiveDrag | null

	/** tracking for double click */
	_lastClickTime: ?Date

	/** tracking for long press */
	_longPressTimeout: ?TimeoutID

	/** how fast are we vertically scrolling? */
	_scrollVerticalSpeed: number = 0

	/** how fast are we scrolling horizontally */
	_scrollHorizontalSpeed: number = 0

	/** we just dropped something, but are waiting for confirmation */
	_isPendingDrop: boolean = false

	/** is the mouse down on any event */
	_isMouseDownOnEvent: boolean = false

	/** is the mouse down on the main view (probably for dragging view around) */
	_isMouseDownOnView: boolean = false

	/** is a touch down on the main view */
	_isTouchDownOnView: boolean = false

	/** is a touch down on any event */
	_isTouchDownOnEvent: boolean = false

	/** is dragging the view (causing scroll) */
	_isDraggingView: boolean = false

	/** for tracking when you tap on the drag event to know if we are holding long enough to highlight the event */
	_tapOnDragEventTime: ?Date

	/** automatic scrolling up/down (while dragging) */
	_scrollVerticalInterval: ?IntervalID

	/** automatic scrolling left/right (while dragging) */
	_scrollHorizontalInterval: ?IntervalID

	/** tracks mouse position after a click  */
	_interactionStartPosition: ?{
		startingScrollLeft: number,
		startingScrollTop: number,
		startingClientX: number,
		startingClientY: number
	}

	static defaultProps = {
		dragThreshold: 10,
		scrollDuringDragMargin: 50,
		dragScrollSpeed: 5,
		enableAutoScrollX: true,
		enableAutoScrollY: true,
		onMouseDownOnEvent: (
			e: MouseEvent | TouchEvent,
			selection: EventSelection
		) => selection.blockIdx === 0
	}

	constructor(props: Props) {
		super(props)
		this.domNodeRef = React.createRef()

		this.state = { dragEvent: null }
	}

	componentDidMount = () => {
		const domNode = this.domNodeRef.current
		if (domNode) {
			domNode.addEventListener('mousedown', this.handleMouseDownOnView)
			domNode.addEventListener('touchstart', this.handleTouchStartOnView, {
				passive: false
			})
		}
	}

	getDomNode = () => {
		return this.domNodeRef.current
	}

	getEventNode = (event: EventType): HTMLElement | null => {
		return (
			this.domNodeRef.current &&
			this.domNodeRef.current.querySelector(`[data-event-id='${event.id}']`)
		)
	}

	getBlockNode = (event: EventType, blockIdx: number): HTMLElement | null => {
		return (
			this.domNodeRef.current &&
			this.domNodeRef.current.querySelectorAll(
				`[data-event-id='${event.id}'] .bigcalendar__event-block`
			)[blockIdx]
		)
	}

	eventById = (id: string): ?EventType => {
		return this.props.events.find(e => e.id === id)
	}

	getScrollLeft = (): number => {
		return this.domNodeRef.current ? this.domNodeRef.current.scrollLeft : 0
	}

	getScrollTop = (): number => {
		return this.domNodeRef.current ? this.domNodeRef.current.scrollTop : 0
	}

	setScrollTop = (top: number): DragGrid => {
		this.domNodeRef.current && (this.domNodeRef.current.scrollTop = top)
		return this
	}

	setScrollLeft = (left: number): DragGrid => {
		this.domNodeRef.current && (this.domNodeRef.current.scrollLeft = left)
		return this
	}

	getWidth = (): number => {
		return sizeUtil.getWidth(this.domNodeRef.current)
	}

	getHeight = (): number => {
		return sizeUtil.getHeight(this.domNodeRef.current)
	}

	getScrollWidth = (): number => {
		return sizeUtil.getScrollWidth(this.domNodeRef.current)
	}

	getScrollHeight = (): number => {
		return sizeUtil.getScrollHeight(this.domNodeRef.current)
	}

	getLeft = (): number => {
		return sizeUtil.getLeft(this.domNodeRef.current)
	}

	getTop = (): number => {
		return sizeUtil.getTop(this.domNodeRef.current)
	}

	isScrolledAllTheWayRight = (): boolean => {
		return sizeUtil.isScrolledAllTheWayRight(this.domNodeRef.current)
	}

	isScrolledAllTheWayLeft = (): boolean => {
		return sizeUtil.isScrolledAllTheWayLeft(this.domNodeRef.current)
	}

	animateHorizontalTo = (left: number) => {
		const scrollLeft = this.getScrollLeft()

		this._activeTween = new Tween({
			scrollLeft
		})
			.to({ scrollLeft: left }, 500)
			.easing(Easing.Quintic.Out)
			.on('update', ({ scrollLeft }) => {
				this.setScrollLeft(scrollLeft)
			})

		this._activeTween.start()
	}

	handleScroll = (e: MouseEvent) => {
		const { onScroll } = this.props

		onScroll && onScroll(e)

		// keep event under mouse as scroll
		if (this._activeDrag && this._isMouseDownOnEvent) {
			const { lastClientX, lastClientY } = this._activeDrag
			this.dragEvent({ clientX: lastClientX, clientY: lastClientY })
		}
	}

	globalToLocal = ({
		clientX,
		clientY
	}: {
		clientX: number,
		clientY: number
	}): { clientX: number, clientY: number } => {
		const gridTop = this.getTop()
		const gridLeft = this.getLeft()
		const scrollTop = this.getScrollTop()
		const scrollLeft = this.getScrollLeft()

		return {
			clientX: clientX - gridLeft + scrollLeft,
			clientY: clientY - gridTop + scrollTop
		}
	}

	handleMouseDownOnView = (e: MouseEvent | TouchEvent) => {
		const { clientX, clientY } = eventUtil.clientXY(e)
		const { onMouseDownOnView, onDoubleClickView, doubleClickTime } = this.props
		if (
			onDoubleClickView &&
			this._lastClickTime &&
			new Date() - this._lastClickTime < doubleClickTime
		) {
			return onDoubleClickView(e)
		}

		if (onMouseDownOnView && onMouseDownOnView(e) === false) {
			return false
		}

		this._lastClickTime = new Date()
		this._isMouseDownOnView = true
		this._interactionStartPosition = {
			startingScrollLeft: this.getScrollLeft(),
			startingScrollTop: this.getScrollTop(),
			startingClientX: clientX,
			startingClientY: clientY
		}

		// console.log('mouse down in view')
		e.preventDefault()
		e.stopPropagation()

		window.addEventListener('mousemove', this.handleMouseMove)
		window.addEventListener('mouseup', this.handleMouseUp)

		document.body &&
			document.body.addEventListener('mouseleave', this.handleMouseLeave)

		return true
	}

	handleMouseMove = (e: MouseEvent) => {
		const { clientX, clientY } = eventUtil.clientXY(e)

		if (this._isMouseDownOnView) {
			this.dragView({ clientX, clientY })
		}
		// a drag is pending, calculate drag distance to make sure we've made it the minimimu distance
		else if (this._pendingDrag) {
			const { startingClientX, startingClientY } =
				this._interactionStartPosition || {}

			const a = startingClientX - clientX
			const b = startingClientY - clientY

			const distance = Math.sqrt(a * a + b * b)

			//start the drag!
			if (this._pendingDrag && distance >= this.props.dragThreshold) {
				const selection = {
					event: this._pendingDrag.event,
					block: this._pendingDrag.block,
					blockIdx: this._pendingDrag.blockIdx
				}

				this.startDragOfEvent({
					selection,
					clientX: startingClientX,
					clientY: startingClientY
				})
			}
		}
		// we are already dragging
		else if (this._activeDrag) {
			this.dragEvent({ clientX, clientY })
		}
	}

	handleMouseUp = (e: MouseEvent | TouchEvent) => {
		// mouse down started on an event
		if (this._isMouseDownOnEvent) {
			// we have no actual drag (means a click but no drag beyond threshold)
			if (this.isDraggingEvent()) {
				this.dropEvent()
			}
			// we only have a pending drag which means it was just a click
			else if (this._pendingDrag) {
				this.props.onSelectEvent &&
					this.props.onSelectEvent({
						event: this._pendingDrag.event,
						block: this._pendingDrag.block,
						blockIdx: this._pendingDrag.blockIdx
					})
			}

			this._isMouseDownOnEvent = false
			this._pendingDrag = null
		}
		// the mouse down started on a view
		else if (this._isMouseDownOnView) {
			this._isMouseDownOnView = false
			this._isDraggingView = false

			this.domNodeRef.current &&
				(this.domNodeRef.current.style.webkitOverflowScrolling = '')

			const { startingScrollLeft = 0, startingScrollTop = 0 } =
				this._interactionStartPosition || {}

			const {
				selectedEvent,
				highlightedEvent,
				onDeselectEvent,
				onUnHighlightEvent,
				onClickView
			} = this.props

			// if we have not moved, it means we've clickd somewhere on the calendar
			// and if anything is selected or highlighted, that signals a deselect
			const moved =
				startingScrollLeft !== this.getScrollLeft() ||
				startingScrollTop !== this.getScrollTop()

			if (selectedEvent && !moved) {
				onDeselectEvent && onDeselectEvent(selectedEvent)
			}

			if (highlightedEvent && !moved) {
				onUnHighlightEvent && onUnHighlightEvent(highlightedEvent)
			}

			if (
				this._lastClickTime &&
				onClickView &&
				!moved &&
				!selectedEvent &&
				!highlightedEvent &&
				!this.state.dragEvent &&
				new Date() - this._lastClickTime < 200
			) {
				onClickView(e)
			}
		}

		// remove all listeners
		window.removeEventListener('mousemove', this.handleMouseMove)
		window.removeEventListener('mouseup', this.handleMouseUp)

		document.body &&
			document.body.removeEventListener('mouseleave', this.handleMouseLeave)
	}

	handleMouseLeave = (e: MouseEvent | TouchEvent) => {
		// if we are dragging around the view, the mouse up
		// handles stopping the scroll
		if (this._isMouseDownOnView) {
			this.handleMouseUp(e)
		}
		// if we are dragging an event, just cancel it
		else if (this.state.dragEvent) {
			//cancel drop
			this.cancelDrag()

			window.removeEventListener('mousemove', this.handleMouseMove)
			window.removeEventListener('mouseup', this.handleMouseUp)

			document.body &&
				document.body.removeEventListener('mouseleave', this.handleMouseLeave)
		}
	}

	dragView = ({ clientX, clientY }: { clientX: number, clientY: number }) => {
		const {
			startingClientX,
			startingClientY,
			startingScrollLeft,
			startingScrollTop
		} = this._interactionStartPosition || {}

		const deltaLeft = clientX - startingClientX
		const deltaTop = clientY - startingClientY

		if (this.domNodeRef.current) {
			this.domNodeRef.current.scrollLeft = startingScrollLeft - deltaLeft
			this.domNodeRef.current.scrollTop = startingScrollTop - deltaTop
		}

		this._isDraggingView = true
	}

	handleTouchStartOnView = (e: TouchEvent) => {
		let { clientX, clientY } = eventUtil.clientXY(e)

		// lets see if we tapped on an event (passive=false on touch start on view means touchStartOnEvent is never triggered)
		const events = this.getEventsAtLocation({ x: clientX, y: clientY })
		console.log(events)

		if (events[0]) {
			const { event, block, blockIdx } = events[0]
			//if we are mid-drag and we tapped a different event, push the touch to the view
			if (!this.isDraggingEvent() || event.id === 'dragging') {
				this.handleTouchStartOnEvent(e, { event, block, blockIdx })
				return
			}
		}

		// don't register clicks (so double click won't fire)
		this._longPressTimeout && clearTimeout(this._longPressTimeout)
		this._isTouchDownOnView = true

		e.preventDefault()
		e.stopPropagation()

		window.addEventListener('touchmove', this.handleTouchMove, {
			passive: false
		})
		window.addEventListener('touchend', this.handleTouchEnd)

		const { longPressDelay } = this.props

		const scrollLeft = this.getScrollLeft()
		const scrollTop = this.getScrollTop()

		this._interactionStartPosition = {
			startingScrollLeft: scrollLeft,
			startingScrollTop: scrollTop,
			startingClientX: clientX,
			startingClientY: clientY
		}

		//do not trigger long press on anything if already dragging
		if (this.isDraggingEvent()) {
			return
		}

		this._longPressTimeout = setTimeout(() => {
			this._longPressTimeout = null
			this.handleLongPressOnView({ clientX, clientY })
		}, longPressDelay)
	}

	handleLongPressOnView = ({
		clientX,
		clientY
	}: {
		clientX: number,
		clientY: number
	}) => {
		const { startingScrollLeft, startingScrollTop } =
			this._interactionStartPosition || {}

		const scrollLeft = this.getScrollLeft()
		const scrollTop = this.getScrollTop()

		const a = startingScrollLeft - scrollLeft
		const b = startingScrollTop - scrollTop

		const distance = Math.sqrt(a * a + b * b)

		const { dragThreshold, onLongPressView } = this.props

		if (onLongPressView && distance <= dragThreshold) {
			// update start position in case we did move a view pixels
			this._interactionStartPosition = {
				startingScrollLeft: scrollLeft,
				startingScrollTop: scrollTop,
				startingClientX: clientX,
				startingClientY: clientY
			}
			onLongPressView({ clientX, clientY })
		}
	}

	handleTouchEnd = (/*e: TouchEvent*/) => {
		this._longPressTimeout && clearTimeout(this._longPressTimeout)
		this._longPressTimeout = null

		//reset touch down on view props
		if (this._isTouchDownOnView) {
			this._isTouchDownOnView = false

			if (this.isDraggingEvent()) {
				const { startingScrollLeft, startingScrollTop } =
					this._interactionStartPosition || {}

				const scrollLeft = this.getScrollLeft()
				const scrollTop = this.getScrollTop()

				const a = startingScrollLeft - scrollLeft
				const b = startingScrollTop - scrollTop

				const distance = Math.sqrt(a * a + b * b)

				const { dragThreshold } = this.props

				if (distance < dragThreshold) {
					this.dropEvent()
				}
			}
		}
		//we were touching an event, reset props
		else if (this._isTouchDownOnEvent && this.isDraggingNewEvent()) {
			this._isTouchDownOnEvent = false
			this.dropEvent()
		}

		this.stopScrollingHorizontally()
		this.stopScrollingVertically()

		window.removeEventListener('touchmove', this.handleTouchMove)
		window.removeEventListener('touchend', this.handleTouchEnd)
	}

	handleTouchMove = (e: TouchEvent) => {
		let { clientX, clientY } = eventUtil.clientXY(e)
		if (
			this._isTouchDownOnView ||
			(this._isTouchDownOnEvent && !this.isDraggingEvent())
		) {
			/** nothing to do here, div is scrolled by browser on touch */
			console.log('touch is moving on view')
			this.dragView({ clientX, clientY })
		} else if (this._isTouchDownOnEvent && this.isDraggingEvent()) {
			e.preventDefault()
			e.stopPropagation()
			console.log('is dragging event')
			/** we are actively pressed on an event */
			this.dragEvent({ clientX, clientY })
		} else {
			console.log('touch move doing nothing')
		}
	}

	getEventsAtLocation = ({
		x,
		y
	}: {
		x: number,
		y: number
	}): Array<
		EventSelection & {
			resize: {
				direction: string
			},
			eventNode: HTMLDivElement,
			blockNode: HTMLDivElement
		}
	> => {
		// $FlowFixMe
		const matches = document.elementsFromPoint(x, y)

		const blockNodes = matches
			.filter(
				node =>
					node.classList.contains('bigcalendar__event-block') ||
					(node.parentNode &&
						node.parentNode.classList &&
						node.parentNode.classList.contains('bigcalendar__event-block'))
			)
			.map(node =>
				node.classList.contains('bigcalendar__event-block')
					? node
					: node.parentNode
			)

		const resizes = matches
			.filter(node => node.classList.contains('resize-handle'))
			.map(match => {
				if (match) {
					return {
						direction: match.className.split(' ')[0]
					}
				}
			})

		console.log('MATCHES', matches, blockNodes, resizes)

		const events: Array<
			EventSelection & {
				resize: {
					direction: string
				},
				eventNode: HTMLDivElement,
				blockNode: HTMLDivElement
			}
		> = blockNodes.map((blockNode, idx) => {
			const eventNode = blockNode.parentNode
			const eventId = eventNode.dataset.eventId
			// if (eventId === 'dragging') {
			// 	return false
			// }
			const event: ?EventType =
				eventId === 'dragging'
					? this.state.dragEvent
					: this.props.events.find(event => event.id === eventId)

			if (!event) {
				return false
			}

			const blockIdx = [...eventNode.children].indexOf(blockNode)
			const block = event.blocks[blockIdx]

			return {
				event,
				block,
				blockIdx,
				resize: resizes[idx],
				eventNode,
				blockNode
			}
		})

		return events.filter(event => event)
	}

	handleMouseDownOnEvent = (
		e: MouseEvent | TouchEvent,
		selection: EventSelection
	): boolean => {
		//ignore right clicks and if we have dropped something that is waiting to save
		if (e.button === 2 || this._isPendingDrop) {
			e.preventDefault()
			e.stopPropagation()
			return false
		}

		const { onMouseDownOnEvent } = this.props
		const { block } = selection

		const results = onMouseDownOnEvent(e, selection)

		// if they clicked on an available block (not busy) and the parent view has not returned false
		if (results && !block.markAsBusy) {
			this.handleMouseDownOnView(e)
			return false
		} else if (results) {
			this._isMouseDownOnEvent = true

			e.preventDefault()
			e.stopPropagation()

			this._pendingDrag = selection

			const { clientX, clientY } = eventUtil.clientXY(e)
			this._interactionStartPosition = {
				startingScrollLeft: this.getScrollLeft(),
				startingScrollTop: this.getScrollTop(),
				startingClientX: clientX,
				startingClientY: clientY
			}

			window.addEventListener('mousemove', this.handleMouseMove, {
				passive: false
			})

			window.addEventListener('mouseup', this.handleMouseUp, {
				passive: false
			})

			document.body &&
				document.body.addEventListener('mouseleave', this.handleMouseLeave, {
					passive: false
				})
		}

		return results !== false
	}

	handleTouchStartOnEvent = (
		e: TouchEvent,
		{ event, block, blockIdx }: EventSelection
	) => {
		const { onMouseDownOnEvent } = this.props

		if (onMouseDownOnEvent(e, { event, block, blockIdx }) === false) {
			return
		}

		this._longPressTimeout && clearTimeout(this._longPressTimeout)
		this._lastClickTime = new Date()

		window.addEventListener('touchend', this.handleTouchEnd)
		window.addEventListener('touchmove', this.handleTouchMove, {
			passive: false
		})

		e.preventDefault()
		e.stopPropagation()

		let { clientX, clientY } = eventUtil.clientXY(e)
		const { longPressDelay } = this.props

		const scrollLeft = this.getScrollLeft()
		const scrollTop = this.getScrollTop()

		this._interactionStartPosition = {
			startingScrollLeft: scrollLeft,
			startingScrollTop: scrollTop,
			startingClientX: clientX,
			startingClientY: clientY
		}

		if (event.id === 'dragging') {
			this.startDragOfEvent({
				clientX,
				clientY,
				selection: { event, block, blockIdx }
			})
			return
		}

		this._pendingDrag = { event, block, blockIdx }
		this._isTouchDownOnEvent = true

		this._longPressTimeout = setTimeout(() => {
			this._longPressTimeout = null
			this.handleLongPressOnEvent(
				{ clientX, clientY },
				{ event, block, blockIdx }
			)
		}, longPressDelay)
	}

	handleLongPressOnEvent = (
		{ clientX, clientY }: { clientX: number, clientY: number },
		selection: EventSelection
	) => {
		//if we long pressed the dragEvent, do not do anything
		if (selection.event.id === 'dragging') {
			return
		}

		const { startingScrollLeft, startingScrollTop } =
			this._interactionStartPosition || {}

		const scrollLeft = this.getScrollLeft()
		const scrollTop = this.getScrollTop()

		// make sure we didn't move too far to invoke highlight
		const a = startingScrollLeft - scrollLeft
		const b = startingScrollTop - scrollTop

		const distance = Math.sqrt(a * a + b * b)

		const { dragThreshold, onHighlightEvent } = this.props

		if (distance > dragThreshold) {
			return
		}

		if (!onHighlightEvent || onHighlightEvent(selection) !== false) {
			// update start position in case we did move a view pixels
			this._interactionStartPosition = {
				startingScrollLeft: scrollLeft,
				startingScrollTop: scrollTop,
				startingClientX: clientX,
				startingClientY: clientY
			}

			this.startDragOfEvent({ clientX, clientY, selection })
		}
	}

	beginScrollHorizontally = (speed: number) => {
		if (this.props.enableAutoScrollX && this._scrollHorizontalSpeed !== speed) {
			this._scrollHorizontalInterval &&
				clearInterval(this._scrollHorizontalInterval)
			this._scrollHorizontalSpeed = speed
			this._scrollHorizontalInterval = setInterval(() => {
				this.domNodeRef.current && (this.domNodeRef.current.scrollLeft += speed)
			}, 10)
		}
	}
	stopScrollingHorizontally = () => {
		this._scrollHorizontalSpeed = 0
		this._scrollHorizontalInterval &&
			clearInterval(this._scrollHorizontalInterval)
	}

	beginScrollingVertically = (speed: number) => {
		if (this.props.enableAutoScrollY && this._scrollVerticalSpeed !== speed) {
			this._scrollVerticalInterval &&
				clearInterval(this._scrollVerticalInterval)
			this._scrollVerticalSpeed = speed
			this._scrollVerticalInterval = setInterval(() => {
				this.domNodeRef.current && (this.domNodeRef.current.scrollTop += speed)
			}, 10)
		}
	}
	stopScrollingVertically = () => {
		this._scrollVerticalSpeed = 0
		this._scrollVerticalInterval && clearInterval(this._scrollVerticalInterval)
	}

	dragEvent = ({
		clientX,
		clientY,
		autoScroll = true
	}: {
		clientX: number,
		clientY: number,
		autoScroll?: boolean
	}) => {
		const { dragEvent } = this.state

		if (this._activeDrag) {
			//clearing this will ensure event is not deselect after it is dropped
			this._tapOnDragEventTime = null

			const {
				scrollDuringDragMargin,
				dragScrollSpeed,
				onDragEvent
			} = this.props

			const {
				offsetX,
				offsetY,
				containerLeft,
				containerTop,
				dragNodeRect,
				sourceEvent,
				dragNode
			} = this._activeDrag

			//if we are close to an edge, lets scroll that first
			const normalizedClientX = clientX - containerLeft
			const normalizedClientY = clientY - containerTop

			const wrapperRight = sizeUtil.getRight(this.domNodeRef.current)
			const wrapperBottom = sizeUtil.getBottom(this.domNodeRef.current)

			// scroll in any direction depending on if you're under the scrollDuringDragMargin
			if (autoScroll) {
				if (clientX >= wrapperRight - scrollDuringDragMargin) {
					this.beginScrollHorizontally(dragScrollSpeed)
				} else if (clientX <= containerLeft + scrollDuringDragMargin) {
					this.beginScrollHorizontally(-dragScrollSpeed)
				} else {
					this.stopScrollingHorizontally()
				}

				if (clientY >= wrapperBottom - scrollDuringDragMargin) {
					this.beginScrollingVertically(dragScrollSpeed)
				} else if (clientY <= containerTop + scrollDuringDragMargin) {
					this.beginScrollingVertically(-dragScrollSpeed)
				} else {
					this.stopScrollingVertically()
				}
			}

			const scrollTop =
				this.domNodeRef.current && this.domNodeRef.current.scrollTop
			const scrollLeft =
				this.domNodeRef.current && this.domNodeRef.current.scrollLeft

			const snapProps = {
				dragNodeLeft: normalizedClientX + scrollLeft - offsetX,
				dragNodeTop: normalizedClientY + scrollTop - offsetY,
				mouseX: normalizedClientX + scrollLeft,
				mouseY: normalizedClientY + scrollTop,
				dragEvent,
				dragNodeHeight: dragNodeRect.height,
				sourceEvent: sourceEvent
			}

			// calculate the new positions
			const x = this.props.snapEventToNearestValidX(snapProps)
			const y = this.props.snapEventToNearestValidY(snapProps)

			// calculate drag distance to store in active drag
			const {
				startingScrollLeft,
				startingScrollTop,
				startingClientX,
				startingClientY
			} = this._interactionStartPosition || {}

			const scrollYDistance = this.getScrollTop() - startingScrollTop
			const scrollXDistance = this.getScrollLeft() - startingScrollLeft
			const xDistance = clientX + scrollXDistance - startingClientX
			const yDistance = clientY + scrollYDistance - startingClientY

			// track position for when scroll hits so we can keep positioned under mouse/finger
			if (this._activeDrag) {
				this._activeDrag.lastClientX = clientX
				this._activeDrag.lastClientY = clientY
				this._activeDrag.dragXDistance = xDistance
				this._activeDrag.dragYDistance = yDistance
				this._activeDrag.destinationX = x
				this._activeDrag.destinationY = y
			}

			// let parent components know and have the opportunity to ignore this drag
			const ignoreDrag =
				onDragEvent && this._activeDrag && onDragEvent(this._activeDrag)

			if (ignoreDrag !== false) {
				// update position
				dragNode.style.left = x + 'px'
				dragNode.style.top = y + 'px'
			}
		}
	}

	handleMouseUpFromView = (e: MouseEvent | TouchEvent) => {
		window.removeEventListener('mousemove', this.handleMouseMove)
		window.removeEventListener('mouseup', this.handleMouseUpFromView)

		document.body &&
			document.body.removeEventListener(
				'mouseleave',
				this.handleMouseUpFromView
			)

		this._isMouseDownOnView = false
		this._isDraggingView = false

		this.domNodeRef.current &&
			(this.domNodeRef.current.style.webkitOverflowScrolling = '')

		const { startingScrollLeft = 0, startingScrollTop = 0 } =
			this._interactionStartPosition || {}

		const {
			selectedEvent,
			highlightedEvent,
			onDeselectEvent,
			onUnHighlightEvent,
			onClickView
		} = this.props

		const moved =
			startingScrollLeft !== this.getScrollLeft() ||
			startingScrollTop !== this.getScrollTop()

		if (selectedEvent && !moved) {
			onDeselectEvent && onDeselectEvent(selectedEvent)
		}

		if (highlightedEvent && !moved) {
			onUnHighlightEvent && onUnHighlightEvent(highlightedEvent)
		}

		if (this.state.dragEvent && !moved) {
			//?? why does this ever hit?
			this.dropEvent()
		}
		if (
			this._lastClickTime &&
			onClickView &&
			!moved &&
			!selectedEvent &&
			!highlightedEvent &&
			!this.state.dragEvent &&
			new Date() - this._lastClickTime < 200
		) {
			onClickView(e)
		}
	}

	// handleMouseUpFromEvent = (e: MouseEvent, { overrideValid } = {}) => {
	// 	this._isMouseDownOnEvent = false

	// 	this.domNodeRef.current &&
	// 		(this.domNodeRef.current.style.webkitOverflowScrolling = '')

	// 	// console.log('mouse up of event')
	// 	if (!this.state.dragEvent && this._pendingDrag) {
	// 		this.props.onSelectEvent({
	// 			event: this._pendingDrag.event,
	// 			block: this._pendingDrag.block,
	// 			blockIdx: this._pendingDrag.blockIdx
	// 		})
	// 		this._pendingDrag = null
	// 	} else {
	// 		this.dropEvent({ overrideValid })
	// 	}

	// 	window.removeEventListener('mousemove', this.dragEvent)
	// 	window.removeEventListener('mouseup', this.handleMouseUpFromEvent)

	// 	document.body.removeEventListener(
	// 		'mouseleave',
	// 		this.handleCancelMouseUpFromEvent
	// 	)
	// }

	cancelDrag = async () => {
		const { dragEventNode, sourceEventNode } = this._activeDrag || {}

		// stop auto scrolling
		this.stopScrollingHorizontally()
		this.stopScrollingVertically()

		this._activeDrag = null

		if (sourceEventNode) {
			dragEventNode.classList.toggle('animate', true)
			dragEventNode.style.left = sourceEventNode.style.left
			dragEventNode.style.top = sourceEventNode.style.top
			dragEventNode.style.width = sourceEventNode.style.width

			const sourceBlocks = sourceEventNode.querySelectorAll(
				'.bigcalendar__event-block'
			)
			const dragBlocks = dragEventNode.querySelectorAll(
				'.bigcalendar__event-block'
			)

			sourceBlocks.forEach((block, blockIdx) => {
				dragBlocks[blockIdx].style.height = block.style.height
			})

			await new Promise(resolve => {
				setTimeout(() => {
					this.setState(() => {
						return { dragEvent: null }
					}, resolve)
				}, 500)
			})
		}
	}

	dropEvent = async () => {
		const { dragEventNode, sourceEvent, sourceEventNode } =
			this._activeDrag || {}

		const { onDropEvent, selectedEvent, highlightedEvent } = this.props
		const { dragEvent } = this.state

		// stop scrolling
		this.stopScrollingHorizontally()
		this.stopScrollingVertically()

		this._isPendingDrop = true

		// to keep flow from yelling about optionals
		if (!dragEvent) {
			return
		}

		let valid
		try {
			valid = onDropEvent
				? await onDropEvent({
						event: sourceEvent,
						dragEvent,
						newX: parseFloat(dragEventNode.style.left),
						newY: parseFloat(dragEventNode.style.top)
				  })
				: false
		} catch (err) {
			console.log('failed to handle drop', err)
			valid = false
		}

		// if valid, clear everything immediately and move on
		if (valid || !sourceEventNode) {
			this.setState(() => {
				return { dragEvent: null }
			})
		}
		// if not valid, animate this event back into place and then reset state
		else {
			await this.cancelDrag()
		}

		this._activeDrag = null
		this._isPendingDrop = false

		//signal deselect and unhighlight
		this.props.onDeselectEvent &&
			selectedEvent &&
			this.props.onDeselectEvent(selectedEvent)

		this.props.onUnHighlightEvent &&
			highlightedEvent &&
			this.props.onUnHighlightEvent(highlightedEvent)
	}

	isMouseDownOnEvent = (): boolean => {
		return this._isMouseDownOnEvent
	}

	isDraggingEvent = () => {
		return !!this._activeDrag
	}

	isDraggingNewEvent = () => {
		return this._activeDrag && !this._activeDrag.sourceEvent
	}

	isDraggingView = () => {
		return this._isDraggingView
	}

	getDragNode = () => {
		return this.isDraggingEvent() && this._activeDrag
			? this._activeDrag.dragEventNode
			: null
	}

	getDragBlockNode = () => {
		return this._activeDrag && this._activeDrag
			? this._activeDrag.dragBlockNode
			: null
	}

	// TOUCH ONLY, assuming touch is down
	dropNewEventAndBeginDrag = async ({
		event,
		clientX,
		clientY,
		left,
		top
	}: {
		event: DragEvent,
		clientX: number,
		clientY: number,
		left: number,
		top: number
	}) => {
		const dragDetails = await this.startDragOfEvent({
			clientX,
			clientY,
			dragEvent: event,
			overrideDragNodeLeft: left,
			overrideDragNodeTop: top
		})

		// transfer touch to event
		this._isTouchDownOnView = false
		this._isTouchDownOnEvent = true

		// this.props.sizeEvent(dragDetails.dragEvent)
		// this.handleTouchStartOnDragEvent({})
		// this.lockScroll()

		// these can already be set after long press
		window.removeEventListener('touchend', this.handleTouchEnd)
		window.removeEventListener('touchmove', this.handleTouchMove)

		// reset listeners
		window.addEventListener('touchend', this.handleTouchEnd)
		window.addEventListener('touchmove', this.handleTouchMove, {
			passive: false
		})

		return dragDetails
	}

	lockScroll = () => {
		const domNode = this.domNodeRef.current
		const body = document.body

		if (body && domNode) {
			domNode.style.overflow = 'hidden'
			// $FlowFixMe
			body.style.webkitUserSelect = 'none'
			body.style.overflow = 'hidden'
		}
	}

	unlockScroll = () => {
		const domNode = this.domNodeRef.current
		const body = document.body

		if (body && domNode) {
			domNode.style.overflow = ''
			// $FlowFixMe
			body.style.webkitUserSelect = ''
			body.style.overflow = ''
		}
	}

	startDragOfEvent = async ({
		clientX,
		clientY,
		selection,
		dragEvent: overrideDragEvent,
		overrideDragNodeLeft,
		overrideDragNodeTop
	}: {
		clientX: number,
		clientY: number,
		selection?: EventSelection,
		dragEvent?: DragEvent,
		overrideDragNodeLeft?: number,
		overrideDragNodeTop?: number
	}): Promise<?ActiveDrag> => {
		const { event, block, blockIdx = 0 } = selection || {}

		let dragEvent: ?DragEvent = overrideDragEvent
		let originalEvent: ?EventType = null

		this.domNodeRef.current &&
			(this.domNodeRef.current.style.webkitOverflowScrolling = 'auto')

		if (event && event.id === 'dragging') {
			dragEvent = (event: any)
			originalEvent = this.eventById(dragEvent.originalId)
		} else if (event || dragEvent) {
			//clone the event and render it in the dom
			//if there is no event, this is a long press to creat one
			originalEvent = event
			dragEvent = cloneDeep(originalEvent || dragEvent)
			dragEvent.originalId = dragEvent.id
			dragEvent.id = `dragging`

			await new Promise(resolve => {
				this.setState(() => {
					return { dragEvent: dragEvent }
				}, resolve)
			})

			// make sure the event is the right size
			const { sizeEvent } = this.props
			sizeEvent(dragEvent)
		}

		const { getDragNode } = this.props

		const eventNode = originalEvent ? this.getEventNode(originalEvent) : null
		const blockNode = originalEvent
			? this.getBlockNode(originalEvent, blockIdx)
			: null
		const dragEventNode = dragEvent && this.getEventNode(dragEvent)
		const dragBlockNode = dragEvent && this.getBlockNode(dragEvent, blockIdx)

		if (dragEventNode && eventNode && event && event.id !== 'dragging') {
			// place this event right over the dragged one
			dragEventNode.style.left = eventNode.style.left
			dragEventNode.style.top = eventNode.style.top
		} else if (
			dragEventNode &&
			overrideDragNodeLeft !== undefined &&
			overrideDragNodeTop !== undefined
		) {
			dragEventNode.style.left = overrideDragNodeLeft + 'px'
			dragEventNode.style.top = overrideDragNodeTop + 'px'
		}

		const dragNode = !getDragNode
			? dragEventNode
			: getDragNode({
					originalEvent,
					block,
					blockIdx,
					dragEventNode,
					dragBlockNode
			  })

		//calculate offset to keep event in proper position relative to the mouse
		const containerLeft = this.getLeft()
		const containerTop = this.getTop()
		const containerHeight = this.getHeight()
		const scrollHeight = this.getScrollHeight()

		// const scrollTop =
		// 	this.domNodeRef.current && this.domNodeRef.current.scrollTop
		// const scrollLeft =
		// 	this.domNodeRef.current && this.domNodeRef.current.scrollLeft

		const offsetY = clientY - sizeUtil.getTop(dragNode)
		const offsetX = clientX - sizeUtil.getLeft(dragNode)

		this._pendingDrag = null

		// last sanity check for things possibly missing (flow)
		if (!dragEvent || !dragEventNode || !dragBlockNode || !dragNode) {
			return undefined
		}

		this._activeDrag = {
			dragEvent,
			dragEventNode,
			sourceEvent: originalEvent,
			sourceEventNode: eventNode,
			block: block,
			blockIdx: blockIdx,
			dragBlockNode,
			dragNode,
			lastClientX: clientX,
			lastClientY: clientY,
			dragNodeRect: {
				top: sizeUtil.getLocalTop(dragEventNode),
				height: sizeUtil.getHeight(dragEventNode),
				bottom: sizeUtil.getLocalBottom(dragEventNode)
			},
			dragBlockNodeRect: {
				height: sizeUtil.getHeight(dragBlockNode)
			},
			sourceBlockNode: blockNode,
			dragBlockNodeRects: event
				? event.blocks.map((block, idx) => {
						return { height: sizeUtil.getHeight(this.getBlockNode(event, idx)) }
				  })
				: [],
			offsetX,
			offsetY,
			containerLeft,
			containerTop,
			containerHeight,
			scrollHeight,
			dragXDistance: 0,
			dragYDistance: 0
			// startScrollTop: scrollTop,
			// startScrollLeft: scrollLeft,
			// startingClientX: clientX,
			// startingClientY: clientY
		}

		return this._activeDrag
	}

	render() {
		const {
			className,
			children,
			events,
			timezone,
			selectedEvent,
			highlightedEvent,
			timeFormat,
			...props
		} = this.props

		//clear out unneeded props
		delete props.onScroll
		delete props.onMouseDownOnEvent
		delete props.onMouseDownOnView
		delete props.onSelectEvent
		delete props.onDeselectEvent
		delete props.onHighlightEvent
		delete props.onUnHighlightEvent
		delete props.dragThreshold
		delete props.scrollDuringDragMargin
		delete props.dragScrollSpeed
		delete props.snapEventToNearestValidX
		delete props.snapEventToNearestValidY
		delete props.onDropEvent
		delete props.onDragEvent
		delete props.sizeEvent
		delete props.getDragNode
		delete props.onDoubleClickView
		delete props.doubleClickTime
		delete props.onLongPressView
		delete props.longPressDelay
		delete props.onClickView
		delete props.enableAutoScrollX
		delete props.enableAutoScrollY

		const { dragEvent } = this.state

		return (
			<div
				ref={this.domNodeRef}
				{...props}
				onScroll={this.handleScroll}
				className={cx('bigcalendar__drag-grid ', className)}
			>
				{children}
				{events.map(event => (
					<Event
						timeFormat={timeFormat}
						key={`event-${event.id}`}
						className={cx({
							'is-drag-source': dragEvent && dragEvent.originalId === event.id,
							'is-selected':
								selectedEvent &&
								(selectedEvent.id === event.id ||
									(selectedEvent.group && selectedEvent.group === event.group)),
							'is-highlight-source':
								highlightedEvent && highlightedEvent.id === event.id
						})}
						onMouseDown={this.handleMouseDownOnEvent}
						data-event-id={event.id}
						event={event}
						timezone={timezone}
					/>
				))}

				{dragEvent && (
					<Event
						timeFormat={timeFormat}
						className={cx('is-active-drag', {
							'is-active-highlight':
								highlightedEvent && highlightedEvent.id === dragEvent.originalId
						})}
						data-event-id="dragging"
						event={dragEvent}
						timezone={timezone}
					/>
				)}
			</div>
		)
	}
}

export default DragGrid
