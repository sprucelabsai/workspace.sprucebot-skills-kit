// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { Easing, Tween } from 'es6-tween'
import cloneDeep from 'lodash/cloneDeep'
import indexOf from 'lodash/indexOf'

import Event from '../Event/Event'
import sizeUtil from '../../utils/size'
import eventUtil from '../../utils/event'

type Props = {
	snapEventToNearestValidX: Function,
	snapEventToNearestValidY: Function,
	onMouseDownOnEvent: Function,
	onMouseDownOnView: Function,
	dragThreshold: Number, // how far to drag before actually initiating drag
	onDropEvent: Function,
	onDragEvent: Function,
	scrollDuringDragMargin: Number, // how close to the edge do we need to get before we'll auto scroll for the user
	dragScrollSpeed: Number, // how many pixels to jump if dragging near edge of scroll
	events: Array<Object>,
	timezone: String,
	getDragNode: Function,
	highlightedEvent: Object,
	onUnHighlightEvent: Function,
	onSelectEvent: Function,
	selectedEvent: Object,
	longPressDelay: Number,
	onHighlightEvent: Function,
	sizeEvent: Function,
	onDeselectEvent: Function
}

type State = {
	dragEvent: Object,
	dragBlock: Object
}

class DragGrid extends Component<Props> {
	state = {
		scrollLeft: 0,
		scrollTop: 0
	}

	constructor(props) {
		super(props)
		this.domNodeRef = React.createRef()
	}

	static defaultProps = {
		dragThreshold: 10,
		scrollDuringDragMargin: 50,
		dragScrollSpeed: 5
	}

	getEventNode = event => {
		return this.domNodeRef.current.querySelector(
			`[data-event-id='${event.id}']`
		)
	}

	getBlockNode = (event, blockIdx) => {
		return this.domNodeRef.current.querySelectorAll(
			`[data-event-id='${event.id}'] .bigcalendar__event-block`
		)[blockIdx]
	}

	eventById = id => {
		return this.props.events.find(e => e.id === id)
	}

	getScrollLeft = () => {
		return this.domNodeRef.current.scrollLeft
	}

	getScrollTop = () => {
		return this.domNodeRef.current.scrollTop
	}

	setScrollTop = top => {
		this.domNodeRef.current.scrollTop = top
		return this
	}

	setScrollLeft = left => {
		this.domNodeRef.current.scrollLeft = left
		return this
	}

	getWidth = () => {
		return sizeUtil.getWidth(this.domNodeRef.current)
	}

	getScrollWidth = () => {
		return sizeUtil.getScrollWidth(this.domNodeRef.current)
	}

	isScrolledAllTheWayRight = () => {
		return sizeUtil.isScrolledAllTheWayRight(this.domNodeRef.current)
	}

	isScrolledAllTheWayLeft = () => {
		return sizeUtil.isScrolledAllTheWayLeft(this.domNodeRef.current)
	}

	animateHorizontalTo = left => {
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

	handleScroll = e => {
		const { onScroll } = this.props

		onScroll && onScroll(e)

		// keep event under mouse as scroll
		if (this._activeDrag && this._handleDragOnScroll) {
			this.handleDragOfEvent(this._activeDrag.eMouseMove, false)
		}
	}

	handleMouseDownOnView = e => {
		const { clientX, clientY } = eventUtil.clientXY(e)
		const { onMouseDownOnView = () => true } = this.props

		if (onMouseDownOnView(e) === false) {
			return false
		}

		this._dragOffset = {
			startingScrollLeft: this.getScrollLeft(),
			startingScrollTop: this.getScrollTop(),
			startingClientX: clientX,
			startingClientY: clientY
		}
		// console.log('mouse down in view')
		e.preventDefault()
		window.addEventListener('mousemove', this.handleMouseDragOfView, {
			passive: false
		})
		window.addEventListener('mouseup', this.handleMouseUpFromView)

		return true
	}

	handleMouseDragOfView = e => {
		const { clientX, clientY } = eventUtil.clientXY(e)
		const {
			startingClientX,
			startingClientY,
			startingScrollLeft,
			startingScrollTop
		} = this._dragOffset
		const deltaLeft = clientX - startingClientX
		const deltaTop = clientY - startingClientY

		this.domNodeRef.current.scrollLeft = startingScrollLeft - deltaLeft
		this.domNodeRef.current.scrollTop = startingScrollTop - deltaTop
	}

	handleTouchStartOnView = e => {
		// console.log('touch start on view')
		if (this.handleMouseDownOnView(e) !== false) {
			window.addEventListener('touchend', this.handleTouchEndOnView, {
				passive: false
			})
		}
	}

	handleTouchEndOnView = e => {
		// console.log('touch end on view')
		this.handleMouseUpFromView(e)

		window.removeEventListener('touchend', this.handleTouchEndOnView)
	}

	getEventsAtLocation = ({ x, y }) => {
		const matches = document.elementsFromPoint(x, y)
		const blockNodes = matches.filter(node =>
			node.classList.contains('bigcalendar__event-block')
		)
		const resizes = [
			false,
			...matches.filter(node => node.classList.contains('resize-handle'))
		].map(match => {
			if (match) {
				return {
					direction: match.className.split(' ')[0]
				}
			}
		})

		const events = blockNodes.map((blockNode, idx) => {
			const eventNode = blockNode.parentNode
			const eventId = eventNode.dataset.eventId
			if (eventId === 'dragging') {
				return false
			}
			const event = this.props.events.find(event => event.id === eventId)
			const blockIdx = [...eventNode.children].indexOf(blockNode)
			const block = event.blocks[blockIdx]
			return { event, block, blockIdx, resize: resizes[idx] }
		})
		return events.filter(event => event)
	}

	handleMouseDownOnEvent = ({
		e,
		event,
		block,
		blockIdx,
		stopEvent = true,
		setListeners = true
	}) => {
		const {
			onMouseDownOnEvent = args => {
				return blockIdx === 0 ? args : false
			}
		} = this.props

		const results = onMouseDownOnEvent({ e, event, block, blockIdx })

		if (results) {
			// console.log('mousedown', blockIdx)
			this._isMouseDownOnEvent = true

			stopEvent && e.preventDefault()
			stopEvent && e.stopPropagation()

			this._pendingDrag = results
			const { clientX, clientY } = eventUtil.clientXY(e)
			this._startingDragPoint = { x: clientX, y: clientY }

			setListeners &&
				window.addEventListener('mousemove', this.handleDragOfEvent, {
					passive: false
				})
			setListeners &&
				window.addEventListener('mouseup', this.handleMouseUpFromEvent, {
					passive: false
				})
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

		this._pendingTouch = { e, event, block, blockIdx }
		this._longPressTimeout = setTimeout(() => {
			this._longPressTimeout = false
			this.handleLongPressOnEvent({ e, event, block, blockIdx })
		}, 200)
	}

	handleTouchStartOnDragEvent = ({ e, event, block, blockIdx }) => {
		const originalEvent = this.eventById(event.originalId)

		this.handleMouseDownOnEvent({
			e,
			event: originalEvent,
			block,
			blockIdx,
			setListeners: false
		})
		e.persist()

		this.startDragOfEvent({ e, event, block, blockIdx })

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

		this._touchDragging = false
		this._isMouseDownOnEvent = false

		window.removeEventListener('touchmove', this.handleTouchDragOfEvent)
		window.removeEventListener('touchend', this.handleTouchEndOnEvent)

		this.domNodeRef.current.style.overflow = 'auto'
		document.body.style.overflow = 'auto'

		e.preventDefault()
		e.stopPropagation()

		this._handleDragOnScroll = false
		this._pendingTouch = null
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

	beginScrollHorizontally = speed => {
		if (this._scrollHorizontalSpeed !== speed) {
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

	beginScrollingVertically = speed => {
		if (this._scrollVerticalSpeed !== speed) {
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
		this._longPressTimeout = false
		if (this._activeDrag) {
			const { clientX, clientY } = eventUtil.clientXY(e)
			const { x, y } = this._startingDragPoint

			const a = x - clientX
			const b = y - clientY

			const distance = Math.sqrt(a * a + b * b)

			// console.log({ distance })

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

		if (dragEvent) {
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
		else {
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
					blockIdx: this._pendingDrag.blockIdx
				})
				this._pendingDrag = null
			}
		}
	}

	handleMouseUpFromView = e => {
		// console.log('mouse up from view')
		window.removeEventListener('mousemove', this.handleMouseDragOfView)
		window.removeEventListener('mouseup', this.handleMouseUpFromView)

		const { startingScrollLeft = 0, startingScrollTop = 0 } =
			this._dragOffset || {}
		const {
			selectedEvent,
			highlightedEvent,
			onDeselectEvent,
			onUnHighlightEvent
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
			this.handleDropEvent()
		}
	}

	handleMouseUpFromEvent = e => {
		this._isMouseDownOnEvent = false

		// console.log('mouse up of event')
		if (!this.state.dragEvent) {
			this.props.onSelectEvent({
				event: this._pendingDrag.event,
				block: this._pendingDrag.block,
				blockIdx: this._pendingDrag.blockIdx
			})
			this._pendingDrag = null
		} else {
			this.handleDropEvent()
			this.props.onDeselectEvent && this.props.onDeselectEvent()
			this.props.onUnHighlightEvent && this.props.onUnHighlightEvent()
		}

		window.removeEventListener('mousemove', this.handleDragOfEvent)
		window.removeEventListener('mouseup', this.handleMouseUpFromEvent)
	}

	handleDropEvent = async () => {
		const { dragEventNode, sourceEvent, sourceEventNode } = this._activeDrag
		const { onDropEvent } = this.props
		// console.log('drop event in grid')
		// stop scrolling
		this.stopScrollingHorizontally()
		this.stopScrollingVertically()

		this._activeDrag = null

		const valid = onDropEvent
			? await onDropEvent(
					sourceEvent,
					parseFloat(dragEventNode.style.left),
					parseFloat(dragEventNode.style.top)
			  )
			: false

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

	isMouseDownOnEvent = () => {
		return this._isMouseDownOnEvent
	}

	startDragOfEvent = async ({ e, event, block, blockIdx }) => {
		let dragEvent = null
		let originalEvent = null

		if (event.id === 'dragging') {
			dragEvent = event
			originalEvent = this.eventById(event.originalId)
		} else {
			//clone the event and render it in the dom
			originalEvent = event
			dragEvent = cloneDeep(originalEvent)
			dragEvent.originalId = dragEvent.id
			dragEvent.id = `dragging`

			await this.setState({ dragEvent })

			// make sure the event is the right size
			const { sizeEvent } = this.props
			sizeEvent(dragEvent)
		}

		const { onDragEvent, getDragNode } = this.props

		const eventNode = this.getEventNode(originalEvent)
		const blockNode = this.getBlockNode(originalEvent, blockIdx)
		const dragEventNode = this.getEventNode(dragEvent)
		const dragBlockNode = this.getBlockNode(dragEvent, blockIdx)

		if (event.id !== 'dragging') {
			// place this event right over the dragged one
			dragEventNode.style.left = eventNode.style.left
			dragEventNode.style.top = eventNode.style.top
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
		const { clientX, clientY } = eventUtil.clientXY(e)

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
			dragBlockNodeHeights: event.blocks.map((block, idx) => {
				return sizeUtil.getHeight(this.getBlockNode(event, idx))
			}),
			offsetX,
			offsetY,
			wrapperLeft,
			wrapperTop,
			startScrollTop: scrollTop,
			startScrollLeft: scrollLeft,
			eMouseDown: e,
			eMouseMove: e
		}

		this._handleDragOnScroll = true
		onDragEvent && onDragEvent(originalEvent, this._activeDrag)
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
						key={`event-${event.id}`}
						className={cx({
							'is-drag-source': dragEvent && dragEvent.originalId === event.id,
							'is-selected': selectedEvent && selectedEvent.id === event.id,
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
