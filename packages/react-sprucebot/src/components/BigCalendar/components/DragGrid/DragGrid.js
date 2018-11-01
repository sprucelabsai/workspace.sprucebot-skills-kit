// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { Easing, Tween } from 'es6-tween'
import cloneDeep from 'lodash/cloneDeep'
import indexOf from 'lodash/indexOf'

import Event from '../Event/Event'
import size from '../../utils/size'

type Props = {
	snapEventToNearestValidX: Function,
	snapEventToNearestValidY: Function,
	dragThreshold: Number, // how far to drag before actually initiating drag
	onDropEvent: Function,
	onDragEvent: Function,
	scrollDuringDragMargin: Number, // how close to the edge do we need to get before we'll auto scroll for the user
	dragScrollSpeed: Number, // how many pixels to jump if dragging near edge of scroll
	events: Array<Object>,
	timezone: String,
	getDragNode: Function
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
		return size.getWidth(this.domNodeRef.current)
	}
	getScrollWidth = () => {
		return size.getScrollWidth(this.domNodeRef.current)
	}

	isScrolledAllTheWayRight = () => {
		return size.isScrolledAllTheWayRight(this.domNodeRef.current)
	}

	isScrolledAllTheWayLeft = () => {
		return size.isScrolledAllTheWayLeft(this.domNodeRef.current)
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
		const target = e.target
		const { onScroll } = this.props

		onScroll && onScroll(e)

		// keep event under mouse as scroll
		if (this._activeDrag) {
			this.handleDragOfEvent(this._activeDrag.e, false)
		}
	}

	handleMouseDownOfView = e => {
		const { clientX, clientY, target } = e

		this._dragOffset = {
			startingScrollLeft: this.getScrollLeft(),
			startingScrollTop: this.getScrollTop(),
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
		} = this._dragOffset
		const deltaLeft = clientX - startingClientX
		const deltaTop = clientY - startingClientY

		this.domNodeRef.current.scrollLeft = startingScrollLeft - deltaLeft
		this.domNodeRef.current.scrollTop = startingScrollTop - deltaTop
	}

	handleMouseDownOfEvent = (e, event, block, idx) => {
		if (block.markAsBusy) {
			e.preventDefault()
			e.stopPropagation()

			this._pendingDrag = { event, block, blockIdx: idx }
			this._startingDragPoint = { x: e.clientX, y: e.clientY }

			window.addEventListener('mousemove', this.handleDragOfEvent)
			window.addEventListener('mouseup', this.handleMouseUpOfEvent)
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

	handleDragOfEvent = (e, autoScroll = true) => {
		const { dragEvent } = this.state

		if (dragEvent) {
			const { clientX, clientY } = e
			const {
				scrollDuringDragMargin,
				dragScrollSpeed,
				onDragEvent
			} = this.props

			const {
				dragEventNode,
				offsetX,
				offsetY,
				wrapperLeft,
				wrapperTop,
				dragEventHeight,
				sourceEvent
			} = this._activeDrag

			//if we are close to an edge, lets scroll that first
			const normalizedClientX = clientX - wrapperLeft
			const normalizedClientY = clientY - wrapperTop
			const wrapperRight = size.getRight(this.domNodeRef.current) - wrapperLeft
			const wrapperBottom = size.getBottom(this.domNodeRef.current) - wrapperTop

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

			const scrollTop = this.domNodeRef.current.scrollTop
			const scrollLeft = this.domNodeRef.current.scrollLeft

			const x = this.props.snapEventToNearestValidX({
				dragNodeLeft: normalizedClientX + scrollLeft - offsetX,
				clientX: normalizedClientX + scrollLeft,
				dragEvent,
				sourceEvent: sourceEvent
			})
			const y = this.props.snapEventToNearestValidY(
				normalizedClientY + scrollTop - offsetY,
				dragEventHeight
			)

			// update position
			dragEventNode.style.left = x + 'px'
			dragEventNode.style.top = y + 'px'

			//track last event
			this._activeDrag.e = e

			onDragEvent && onDragEvent(event, this._activeDrag)
		} else {
			const { clientX, clientY } = e
			const { x, y } = this._startingDragPoint

			const a = x - clientX
			const b = y - clientY

			const distance = Math.sqrt(a * a + b * b)
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
		const { dragEventNode, sourceEvent, sourceEventNode } = this._activeDrag
		const { onDropEvent } = this.props

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

	startDragOfEvent = async ({ e, event, block, blockIdx }) => {
		//clone the event and render it in the dom
		const dragEvent = cloneDeep(event)
		dragEvent.originalId = dragEvent.id
		dragEvent.id = `dragging`

		await this.setState({ dragEvent })

		// make sure the event is the right size
		const { sizeEvent, onDragEvent, getDragNode } = this.props
		sizeEvent(dragEvent)

		// place this event right over the dragged one
		const eventNode = this.getEventNode(event)
		const blockNode = this.getBlockNode(event, blockIdx)
		const dragEventNode = this.getEventNode(dragEvent)
		const dragBlockNode = this.getBlockNode(dragEvent, blockIdx)

		dragEventNode.style.left = eventNode.style.left
		dragEventNode.style.top = eventNode.style.top

		const dragNode = !getDragNode
			? dragEventNode
			: getDragNode({
					event,
					block,
					blockIdx,
					dragEventNode,
					dragBlockNode
			  })

		//calculate offset to keep event in proper position relative to the mouse
		const { clientX, clientY } = e

		const wrapperLeft = size.getLeft(this.domNodeRef.current)
		const wrapperTop = size.getTop(this.domNodeRef.current)

		const scrollTop = this.domNodeRef.current.scrollTop
		const scrollLeft = this.domNodeRef.current.scrollLeft

		const offsetY =
			clientY - wrapperTop - parseFloat(eventNode.style.top) + scrollTop
		const offsetX =
			clientX -
			wrapperLeft +
			scrollLeft -
			(parseFloat(eventNode.style.left) +
				parseFloat(eventNode.style.marginLeft))

		this._activeDrag = {
			dragEvent,
			sourceEvent: event,
			block: block,
			blockIdx: blockIdx,
			dragEventNode,
			dragBlockNode,
			dragNode,
			dragEventHeight: size.getHeight(dragEventNode),
			sourceEventNode: eventNode,
			sourceBlockNode: blockNode,
			offsetX,
			offsetY,
			wrapperLeft,
			wrapperTop
		}

		onDragEvent && onDragEvent(event, this._activeDrag)
	}

	render() {
		const {
			className,
			children,
			onScroll,
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
			...props
		} = this.props

		const { dragEvent } = this.state

		return (
			<div
				ref={this.domNodeRef}
				{...props}
				onScroll={this.handleScroll}
				onMouseDown={this.handleMouseDownOfView}
				className={cx('bigcalendar__drag-grid ', className)}
			>
				{children}
				{events.map(event => (
					<Event
						key={`event-${event.id}`}
						className={
							dragEvent && dragEvent.originalId === event.id
								? 'is-drag-source'
								: ''
						}
						onMouseDown={this.handleMouseDownOfEvent}
						data-event-id={event.id}
						event={event}
						timezone={timezone}
					/>
				))}

				{dragEvent && (
					<Event
						className="is-active-drag"
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
