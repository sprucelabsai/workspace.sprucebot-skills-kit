// @flow
import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Easing, Tween } from 'es6-tween'
import cloneDeep from 'lodash/cloneDeep'
import indexOf from 'lodash/indexOf'

import Event from '../Event/Event'
import sizeUtil from '../../utils/size'
import eventUtil from '../../utils/event'

import type { ElementRef } from 'react'
import type {
	Event as EventType,
	EventBlock as EventBlockType
} from '../../types'

export type EventSelection = {
	event: EventType,
	block: EventBlockType,
	blockIdx: number
}

type Props = {
	/** Triggerd when an event is clicked. Return false to cancel. Return selection with any changes you need. */
	onMouseDownOnEvent: (
		e: MouseEvent,
		selection: EventSelection
	) => EventSelection | boolean,
	onMouseDownOnView: (e: MouseEvent) => boolean,
	onDoubleClickView?: (e: MouseEvent) => boolean,
	onClickView?: (e: MouseEvent) => boolean,
	onScroll?: Function,
	onDropEvent: Function,
	onDragEvent: Function,
	onUnHighlightEvent: Function,
	onSelectEvent: Function,
	onDeselectEvent: Function,
	onLongPressView?: Function,
	onHighlightEvent: Function,
	snapEventToNearestValidX: Function,
	snapEventToNearestValidY: Function,
	dragThreshold: number, // how far to drag before actually initiating drag
	scrollDuringDragMargin: number, // how close to the edge do we need to get before we'll auto scroll for the user
	dragScrollSpeed: number, // how many pixels to jump if dragging near edge of scroll
	events: Array<EventType>,
	timezone: string,
	getDragNode: Function,
	highlightedEvent: Object,
	selectedEvent: Object,
	longPressDelay: number,
	sizeEvent: Function,
	doubleClickTime: number,
	timeFormat: string,
	enableAutoScrollX: boolean,
	enableAutoScrollY: boolean
}

type State = {
	dragEvent?: EventType
}

class DragGrid extends PureComponent<Props, State> {
	state = {}

	domNodeRef: { current: null | ElementRef<'div'> }

	/** animater for scrolling to x */
	_activeTween: ?Tween

	/** details of what is being dragged */
	_activeDrag: {
		dragEvent: EventType & { originalId: string },
		dragEventNode: HTMLDivElement,
		sourceEvent: EventType,
		sourceEventNode: HTMLDivElement
	} | null

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

	/** is dragging the view (causing scroll) */
	_isDraggingView: boolean = false

	/** tracks mouse position  */
	_mouseDownPosition: ?{
		startingScrollLeft: number,
		startingScrollTop: number,
		startingClientX: number,
		startingClientY: number
	}

	/** we just clicked on an event, so if we move, get ready to drag */
	_pendingDrag: ?EventSelection

	static defaultProps = {
		dragThreshold: 10,
		scrollDuringDragMargin: 50,
		dragScrollSpeed: 5,
		enableAutoScrollX: true,
		enableAutoScrollY: true
	}

	constructor(props: Props) {
		super(props)
		this.domNodeRef = React.createRef()
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

	eventById = (id: string) => {
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
		if (this._activeDrag) {
			this.handleDragOfEvent(this._activeDrag.eMouseMove, false)
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

	handleMouseDownOnView = (e: MouseEvent): boolean => {
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
		this._mouseDownPosition = {
			startingScrollLeft: this.getScrollLeft(),
			startingScrollTop: this.getScrollTop(),
			startingClientX: clientX,
			startingClientY: clientY
		}

		// console.log('mouse down in view')
		e.preventDefault()
		e.stopPropagation()

		window.addEventListener('mousemove', this.handleMouseMoveOnView)
		window.addEventListener('mouseup', this.handleMouseUpFromView)

		document.body &&
			document.body.addEventListener('mouseleave', this.handleMouseUpFromView)

		return true
	}

	handleMouseMoveOnView = (e: MouseEvent) => {
		const { clientX, clientY } = eventUtil.clientXY(e)

		if (this._isMouseDownOnView) {
			this.handleDragOfView({ clientX, clientY })
		} else if (this._isMouseDownOnEvent) {
			console.log('dragging event')
		}
	}

	handleDragOfView = ({
		clientX,
		clientY
	}: {
		clientX: number,
		clientY: number
	}) => {
		const {
			startingClientX,
			startingClientY,
			startingScrollLeft,
			startingScrollTop
		} = this._mouseDownPosition || {}

		const deltaLeft = clientX - startingClientX
		const deltaTop = clientY - startingClientY

		if (this.domNodeRef.current) {
			this.domNodeRef.current.scrollLeft = startingScrollLeft - deltaLeft
			this.domNodeRef.current.scrollTop = startingScrollTop - deltaTop
		}

		this._isDraggingView = true
	}

	handleTouchStartOnView = (e: MouseEvent) => {
		// don't register clicks (so double click won't fire)
		this._lastClickTime = null
		this._longPressTimeout && clearTimeout(this._longPressTimeout)

		// console.log('touch start on view')
		if (this.handleMouseDownOnView(e) !== false) {
			window.addEventListener('touchend', this.handleTouchEndOnView, {
				passive: false
			})

			let { clientX, clientY } = eventUtil.clientXY(e)
			const { longPressDelay } = this.props

			this._longPressTimeout = setTimeout(() => {
				this._longPressTimeout = null
				this.handleLongPressOnView({ clientX, clientY })
			}, longPressDelay)
		}
	}

	handleTouchEndOnView = (e: MouseEvent) => {
		// long press is still active
		this._longPressTimeout && clearTimeout(this._longPressTimeout)

		// console.log('touch end on view')
		this.handleMouseUpFromView(e)
		e.preventDefault()
		e.stopPropagation()

		window.removeEventListener('touchend', this.handleTouchEndOnView)
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
		const matches = document.elementsFromPoint(x, y)
		const blockNodes = matches.filter(node =>
			node.classList.contains('bigcalendar__event-block')
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
			if (eventId === 'dragging') {
				return false
			}
			const event: ?EventType = this.props.events.find(
				event => event.id === eventId
			)
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
		e: MouseEvent,
		{
			event,
			block,
			blockIdx,
			stopEvent = true,
			setListeners = true
		}: EventSelection
	) => {
		//ignore right clicks and if we have dropped something that is waiting to save
		if (e.button === 2 || this._isPendingDrop) {
			e.preventDefault()
			e.stopPropagation()
			return false
		}

		const {
			onMouseDownOnEvent = (
				e: MouseEvent,
				selection: EventSelection
			): EventSelection | boolean => (blockIdx === 0 ? selection : false)
		} = this.props

		const results = onMouseDownOnEvent(e, { event, block, blockIdx })

		// if they clicked on an available block (not busy) and the parent view has not returned false
		if (results && !block.markAsBusy) {
			this.handleMouseDownOnView(e)
			return
		} else if (results) {
			// console.log('mousedown', blockIdx)
			this._isMouseDownOnEvent = true

			stopEvent && e.preventDefault()
			stopEvent && e.stopPropagation()

			this._pendingDrag = results

			const { clientX, clientY } = eventUtil.clientXY(e)
			this._mouseDownPosition = {
				startingScrollLeft: this.getScrollLeft(),
				startingScrollTop: this.getScrollTop(),
				startingClientX: clientX,
				startingClientY: clientY
			}

			setListeners &&
				window.addEventListener('mousemove', this.handleDragOfEvent, {
					passive: false
				})
			setListeners &&
				window.addEventListener('mouseup', this.handleMouseUpFromEvent, {
					passive: false
				})

			setListeners &&
				document.body &&
				document.body.addEventListener(
					'mouseleave',
					this.handleCancelMouseUpFromEvent,
					{
						passive: false
					}
				)
		}

		return results !== false
	}

	handleTouchStartOnEvent = ({ e, event, block, blockIdx }) => {
		//if we are dragging, bail (the drop is handled in MouseDownOnEvent because i can't get the event to cancel)
		if (this.state.dragEvent) {
			e.preventDefault()
			e.stopPropagation()
			// this.handleMouseUpFromView(e)
			return
		}

		clearTimeout(this._longPressTimeout)
		window.addEventListener('touchend', this.handleTouchEndOnEvent)
		window.addEventListener('touchmove', this.handleTouchDragOfEvent, {
			passive: false
		})

		e.persist()
		e.preventDefault()
		e.stopPropagation()

		const { longPressDelay } = this.props
		this._pendingTouch = { e, event, block, blockIdx }
		this._longPressTimeout = setTimeout(() => {
			this._longPressTimeout = false
			this.handleLongPressOnEvent({ e, event, block, blockIdx })
		}, longPressDelay)
	}

	handleTouchStartOnDragEvent = ({ e, event, block, blockIdx }) => {
		const originalEvent = this.eventById(event.originalId)

		if (
			!this.handleMouseDownOnEvent({
				e,
				event: originalEvent,
				block,
				blockIdx,
				setListeners: false
			})
		) {
			e.preventDefault()
			e.stopPropagation()
			return
		}
		e.persist()

		const { clientX, clientY } = eventUtil.clientXY(e)
		this.startDragOfEvent({ clientX, clientY, event, block, blockIdx })

		this._tapOnDragEventTime = new Date()

		window.addEventListener('touchend', this.handleTouchEndOnEvent)
		window.addEventListener('touchmove', this.handleTouchDragOfEvent, {
			passive: false
		})
	}

	handleTouchEndOnEvent = e => {
		// console.log('touch end on event')
		// we did not successfully long press, simulate all mouse events hurry
		if (this._longPressTimeout) {
			clearInterval(this._longPressTimeout)

			const args = this._pendingTouch

			//start by simulating mouse down
			this.handleMouseDownOnEvent({
				...args,
				setListeners: false,
				stopEvent: false
			})
			this.handleMouseUpFromEvent(this._pendingTouch.e)
		}
		// if we simply tapped the event, deselect
		else if (this._tapOnDragEventTime) {
			const diff = new Date() - this._tapOnDragEventTime
			if (diff < 250) {
				this.handleMouseUpFromEvent(e)
			}
		}
		//if we are dragging a long pressed, new event
		else if (
			this.state.dragEvent &&
			this.state.dragEvent.originalId === 'new'
		) {
			this.handleMouseUpFromEvent()
		}

		this._tapOnDragEventTime = null
		this._touchDragging = false
		this._isMouseDownOnEvent = false

		window.removeEventListener('touchmove', this.handleTouchDragOfEvent)
		window.removeEventListener('touchend', this.handleTouchEndOnEvent)

		this.domNodeRef.current.style.overflow = ''
		document.body.style.overflow = ''

		e.preventDefault()
		e.stopPropagation()

		this._pendingTouch = null

		//if we are scrolling, kill it
		this.stopScrollingHorizontally()
		this.stopScrollingVertically()
	}

	handleLongPressOnEvent = ({ e, event, block, blockIdx }) => {
		const { onHighlightEvent = () => true } = this.props
		if (onHighlightEvent({ e, event, block, blockIdx }) !== false) {
			this.handleMouseDownOnEvent({
				e,
				event,
				block,
				blockIdx,
				setListeners: false,
				stopEvent: false
			})
			this.startDragOfEvent({ e, event, block, blockIdx })
		}
	}

	handleLongPressOnView = ({
		clientX,
		clientY
	}: {
		clientX: number,
		clientY: number
	}) => {
		const { startingScrollLeft, startingScrollTop } =
			this._mouseDownPosition || {}

		const scrollLeft = this.getScrollLeft()
		const scrollTop = this.getScrollTop()

		this._mouseDownPosition = {
			startingScrollLeft: this.getScrollLeft(),
			startingScrollTop: this.getScrollTop(),
			startingClientX: clientX,
			startingClientY: clientY
		}

		const a = startingScrollLeft - scrollLeft
		const b = startingScrollTop - scrollTop

		const distance = Math.sqrt(a * a + b * b)

		const { dragThreshold } = this.props
		if (distance <= dragThreshold) {
			const { onLongPressView = () => {} } = this.props
			onLongPressView({ clientX, clientY })
		}
	}

	beginScrollHorizontally = speed => {
		if (this.props.enableAutoScrollX && this._scrollHorizontalSpeed !== speed) {
			clearInterval(this._scrollHorizontalInterval)
			this._scrollHorizontalSpeed = speed
			this._scrollHorizontalInterval = setInterval(() => {
				this.domNodeRef.current.scrollLeft += speed
			}, 10)
		}
	}
	stopScrollingHorizontally = () => {
		this._scrollHorizontalSpeed = 0
		clearInterval(this._scrollHorizontalInterval)
	}

	beginScrollingVertically = (speed: number) => {
		if (this.props.enableAutoScrollY && this._scrollVerticalSpeed !== speed) {
			clearInterval(this._scrollVerticalInterval)
			this._scrollVerticalSpeed = speed
			this._scrollVerticalInterval = setInterval(() => {
				this.domNodeRef.current.scrollTop += speed
			}, 10)
		}
	}
	stopScrollingVertically = () => {
		this._scrollVerticalSpeed = 0
		clearInterval(this._scrollVerticalInterval)
	}

	handleTouchDragOfEvent = e => {
		clearTimeout(this._longPressTimeout)
		clearTimeout(this._tapOnDragEventTimeout)
		this._longPressTimeout = false
		if (this._activeDrag) {
			const { clientX, clientY } = eventUtil.clientXY(e)
			const { x, y } = this._startingDragPoint

			const a = x - clientX
			const b = y - clientY

			const distance = Math.sqrt(a * a + b * b)

			//start the drag!
			if (distance >= this.props.dragThreshold) {
				if (this.domNodeRef.current.style.overflow !== 'hidden') {
					this.domNodeRef.current.style.overflow = 'hidden'
					document.body.style.webkitTouchCallout = 'none'
					document.body.style.webkitUserSelect = 'none'
					document.body.style.overflow = 'hidden'
				}
				this._touchDragging = true
			}

			if (this._touchDragging) {
				this.handleDragOfEvent(e)
			}

			e.preventDefault()
			e.stopPropagation()
		}
	}

	handleDragOfEvent = (e, autoScroll = true) => {
		const { dragEvent } = this.state

		if (this._activeDrag) {
			//clearing this will ensure event is not deselect after it is dropped
			this._tapOnDragEventTime = null

			const { clientX, clientY } = eventUtil.clientXY(e)
			const {
				scrollDuringDragMargin,
				dragScrollSpeed,
				onDragEvent
			} = this.props

			const {
				offsetX,
				offsetY,
				wrapperLeft,
				wrapperTop,
				dragEventNodeHeight,
				sourceEvent,
				dragNode
			} = this._activeDrag

			//if we are close to an edge, lets scroll that first
			const normalizedClientX = clientX - wrapperLeft
			const normalizedClientY = clientY - wrapperTop

			const wrapperRight = sizeUtil.getRight(this.domNodeRef.current)
			const wrapperBottom = sizeUtil.getBottom(this.domNodeRef.current)

			// scroll in any direction depending on if you're under the scrollDuringDragMargin
			if (autoScroll) {
				if (clientX >= wrapperRight - scrollDuringDragMargin) {
					this.beginScrollHorizontally(dragScrollSpeed)
				} else if (clientX <= wrapperLeft + scrollDuringDragMargin) {
					this.beginScrollHorizontally(-dragScrollSpeed)
				} else {
					this.stopScrollingHorizontally()
				}

				if (clientY >= wrapperBottom - scrollDuringDragMargin) {
					this.beginScrollingVertically(dragScrollSpeed)
				} else if (clientY <= wrapperTop + scrollDuringDragMargin) {
					this.beginScrollingVertically(-dragScrollSpeed)
				} else {
					this.stopScrollingVertically()
				}
			}

			const scrollTop = this.domNodeRef.current.scrollTop
			const scrollLeft = this.domNodeRef.current.scrollLeft
			const snapProps = {
				dragNodeLeft: normalizedClientX + scrollLeft - offsetX,
				dragNodeTop: normalizedClientY + scrollTop - offsetY,
				mouseX: normalizedClientX + scrollLeft,
				mouseY: normalizedClientY + scrollTop,
				dragEvent,
				dragNodeHeight: dragEventNodeHeight,
				sourceEvent: sourceEvent
			}

			const x = this.props.snapEventToNearestValidX(snapProps)
			const y = this.props.snapEventToNearestValidY(snapProps)

			//track last event
			this._activeDrag.eMouseMove = e
			this._activeDrag.x = x
			this._activeDrag.y = y

			// let parent components know and have the opportunity to ignore this drag
			const ignoreDrag =
				onDragEvent && onDragEvent(sourceEvent, this._activeDrag)

			if (ignoreDrag !== false) {
				// update position
				dragNode.style.left = x + 'px'
				dragNode.style.top = y + 'px'
			}
		}
		// we have not actually started dragging yet, so we check how far we've moved from click
		else if (this._pendingDrag) {
			const { clientX, clientY } = eventUtil.clientXY(e)
			const { x, y } = this._startingDragPoint

			const a = x - clientX
			const b = y - clientY

			const distance = Math.sqrt(a * a + b * b)

			//start the drag!
			if (distance >= this.props.dragThreshold) {
				this.startDragOfEvent({
					e,
					event: this._pendingDrag.event,
					block: this._pendingDrag.block,
					blockIdx: this._pendingDrag.blockIdx,
					clientX: x,
					clientY: y
				})
				this._pendingDrag = null
			}
		}
	}

	handleMouseUpFromView = (e: MouseEvent) => {
		window.removeEventListener('mousemove', this.handleMouseMoveOnView)
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
			this._mouseDownPosition || {}

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
			onDeselectEvent && onDeselectEvent()
		}

		if (highlightedEvent && !moved) {
			onUnHighlightEvent && onUnHighlightEvent()
		}

		if (this.state.dragEvent && !moved) {
			debugger //?? why does this ever hit?
			this.handleDropEvent()
		}
		if (
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

	handleCancelMouseUpFromEvent = e => {
		return this.handleMouseUpFromEvent(e, { overrideValid: false })
	}

	handleMouseUpFromEvent = (e, { overrideValid } = {}) => {
		this._isMouseDownOnEvent = false

		this.domNodeRef.current.style.webkitOverflowScrolling = ''

		// console.log('mouse up of event')
		if (!this.state.dragEvent && this._pendingDrag) {
			this.props.onSelectEvent({
				event: this._pendingDrag.event,
				block: this._pendingDrag.block,
				blockIdx: this._pendingDrag.blockIdx
			})
			this._pendingDrag = null
		} else {
			this.handleDropEvent({ overrideValid })
			this.props.onDeselectEvent && this.props.onDeselectEvent()
			this.props.onUnHighlightEvent && this.props.onUnHighlightEvent()
		}

		window.removeEventListener('mousemove', this.handleDragOfEvent)
		window.removeEventListener('mouseup', this.handleMouseUpFromEvent)
		document.body.removeEventListener(
			'mouseleave',
			this.handleCancelMouseUpFromEvent
		)
	}

	cancelDrag = () => {
		this._activeDrag = null
		this.setState(() => {
			return { dragEvent: null }
		})
	}

	handleDropEvent = async ({ overrideValid }: { overrideValid?: boolean }) => {
		const { dragEventNode, sourceEvent, sourceEventNode } =
			this._activeDrag || {}
		const { onDropEvent } = this.props
		const { dragEvent } = this.state

		// stop scrolling
		this.stopScrollingHorizontally()
		this.stopScrollingVertically()
		this._activeDrag = null
		this._isPendingDrop = true

		let valid
		try {
			if (typeof overrideValid === 'boolean') {
				valid = overrideValid
			} else {
				valid = onDropEvent
					? await onDropEvent({
							event: sourceEvent,
							dragEvent,
							newX: parseFloat(dragEventNode.style.left),
							newY: parseFloat(dragEventNode.style.top)
					  })
					: false
			}
		} catch (err) {
			console.log('failed to handle drop', err)
			valid = false
		}

		const reset = () => {
			this.cancelDrag()
			this._isPendingDrop = false
		}

		// if valid, clear everything immediately and move on
		if (valid || !sourceEventNode) {
			reset()
		}
		// if not valid, animate this event back into place and then reset state
		else {
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

			// let animations finish
			setTimeout(reset, 500)
		}
	}

	isMouseDownOnEvent = (): boolean => {
		return this._isMouseDownOnEvent
	}

	isDraggingEvent = () => {
		return !!this._activeDrag
	}

	isDraggingView = () => {
		return this._isDraggingView
	}

	getDragNode = () => {
		return this.isDraggingEvent() ? this._activeDrag.dragNode : null
	}

	getDragBlockNode = () => {
		return this._activeDrag ? this._activeDrag.dragBlockNode : null
	}

	// TOUCH ONLY, assuming touch is down
	dropNewEventAndDrag = async ({ event, e, left, top }) => {
		const dragDetails = await this.startDragOfEvent({
			dragEvent: event,
			e,
			overrideTop: top,
			overrideLeft: left
		})

		this.props.sizeEvent(dragDetails.dragEvent)
		// this.handleTouchStartOnDragEvent({})
		window.addEventListener('touchend', this.handleTouchEndOnEvent)
		window.addEventListener('touchmove', this.handleTouchDragOfEvent, {
			passive: false
		})

		return dragDetails
	}

	startDragOfEvent = async ({
		clientX,
		clientY,
		event,
		block,
		blockIdx = 0,
		dragEvent: overrideDragEvent
	}: {
		clientX: number,
		clientY: number,
		event: EventType,
		block: EventBlockType,
		blockIdx: number,
		dragEvent?: EventType
	}) => {
		let dragEvent = overrideDragEvent
		let originalEvent = null

		this.domNodeRef.current.style.webkitOverflowScrolling = 'auto'

		if (event && event.id === 'dragging') {
			dragEvent = event
			originalEvent = this.eventById(event.originalId)
		} else if (event || dragEvent) {
			//clone the event and render it in the dom
			//if there is no event, this is a long press to creat one
			originalEvent = event
			dragEvent = cloneDeep(originalEvent || dragEvent)
			dragEvent.originalId = dragEvent.id
			dragEvent.id = `dragging`

			await this.setState(() => {
				return { dragEvent }
			})

			// make sure the event is the right size
			const { sizeEvent } = this.props
			sizeEvent(dragEvent)
		}

		const { onDragEvent, getDragNode } = this.props

		const eventNode = originalEvent ? this.getEventNode(originalEvent) : null
		const blockNode = originalEvent
			? this.getBlockNode(originalEvent, blockIdx)
			: null
		const dragEventNode = this.getEventNode(dragEvent)
		const dragBlockNode = this.getBlockNode(dragEvent, blockIdx)

		if (event && event.id !== 'dragging') {
			// place this event right over the dragged one
			dragEventNode.style.left = eventNode.style.left
			dragEventNode.style.top = eventNode.style.top
		} else if (overrideLeft !== undefined && overrideTop !== undefined) {
			dragEventNode.style.left = overrideLeft + 'px'
			dragEventNode.style.top = overrideTop + 'px'
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
		const wrapperLeft = sizeUtil.getLeft(this.domNodeRef.current)
		const wrapperTop = sizeUtil.getTop(this.domNodeRef.current)

		const scrollTop = this.domNodeRef.current.scrollTop
		const scrollLeft = this.domNodeRef.current.scrollLeft

		const offsetY = clientY - sizeUtil.getTop(dragNode)
		const offsetX = clientX - sizeUtil.getLeft(dragNode)

		this._activeDrag = {
			dragEvent,
			sourceEvent: originalEvent,
			block: block,
			blockIdx: blockIdx,
			dragEventNode,
			dragBlockNode,
			dragNode,
			dragEventNodeHeight: sizeUtil.getHeight(dragEventNode),
			dragEventNodeTop: sizeUtil.getLocalTop(dragEventNode),
			dragEventNodeBottom: sizeUtil.getLocalBottom(dragEventNode),
			dragBlockNodeHeight: sizeUtil.getHeight(dragBlockNode),
			sourceEventNode: eventNode,
			sourceBlockNode: blockNode,
			dragBlockNodeHeights: event
				? event.blocks.map((block, idx) => {
						return sizeUtil.getHeight(this.getBlockNode(event, idx))
				  })
				: [],
			offsetX,
			offsetY,
			wrapperLeft,
			wrapperTop,
			startScrollTop: scrollTop,
			startScrollLeft: scrollLeft,
			eMouseDown: e,
			eMouseMove: e,
			startingClientX: clientX,
			startingClientY: clientY
		}

		onDragEvent && onDragEvent(originalEvent, this._activeDrag)

		return this._activeDrag
	}

	render() {
		const {
			className,
			children,
			onScroll,
			onMouseDownOnEvent,
			onMouseDownOnView,
			onSelectEvent,
			onDeselectEvent,
			onHighlightEvent,
			onUnHighlightEvent,
			dragThreshold,
			scrollDuringDragMargin,
			dragScrollSpeed,
			snapEventToNearestValidX,
			snapEventToNearestValidY,
			events,
			timezone,
			onDropEvent,
			onDragEvent,
			sizeEvent,
			getDragNode,
			selectedEvent,
			highlightedEvent,
			onDoubleClickView,
			doubleClickTime,
			onLongPressView,
			longPressDelay,
			onClickView,
			timeFormat,
			enableAutoScrollX,
			enableAutoScrollY,
			...props
		} = this.props

		const { dragEvent } = this.state

		return (
			<div
				ref={this.domNodeRef}
				{...props}
				onScroll={this.handleScroll}
				onMouseDown={this.handleMouseDownOnView}
				onTouchStart={this.handleTouchStartOnView}
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
						onTouchStart={this.handleTouchStartOnEvent}
						data-event-id={event.id}
						event={event}
						timezone={timezone}
					/>
				))}

				{dragEvent && (
					<Event
						timeFormat={timeFormat}
						onTouchStart={this.handleTouchStartOnDragEvent}
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
