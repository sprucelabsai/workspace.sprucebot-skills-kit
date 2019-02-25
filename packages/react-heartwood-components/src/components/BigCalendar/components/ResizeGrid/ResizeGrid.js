// @flow
import React, { PureComponent } from 'react'
import DragGrid from '../DragGrid/DragGrid'

import type { Element } from 'react'
import type {
	Event as EventType,
	ActiveDrag,
	EventSelection,
	ActiveResize,
	DragEvent
} from '../../types'

export type ResizeGridRenderOptions = {
	/** pass through to DragGrad.onDragEvent */
	handleDragEvent: (drag: ActiveDrag) => boolean | void,

	/** passthrough to DragGrid.onMouseDownOnEvent */
	handleMouseDownOnEvent: (
		e: MouseEvent | TouchEvent,
		selection: EventSelection
	) => boolean,

	/** passthrough to DragGrid.onDropEvent */
	handleDropEvent: ({
		event: ?EventType,
		dragEvent: DragEvent,
		newX: number,
		newY: number
	}) => Promise<boolean> | boolean,

	/** should we enable autoscroll left/right when dragging */
	enableAutoScrollX: boolean,

	/** auto scroll when dragging up/down */
	enableAutoScrollY: boolean
}

type ResizeGridProps = {
	/** This should return 1 item, a DragGrad */
	render: (options: ResizeGridRenderOptions) => Element<typeof DragGrid>,

	/** triggered as an event is being dragged/resized */
	onDragEvent: (drag: ActiveDrag) => boolean | void,

	/** called as resizing is happening. updates and indexed to match blockIdx (drag third block, updates[2].newHeight is passed) */
	onResizeEvent: (
		updates: Array<{ blockIdx: number, newHeight?: number, newWidth?: number }>
	) => boolean | void,

	/** Tricked when an event is clicked */
	onMouseDownOnEvent: (
		e: MouseEvent | TouchEvent,
		selection: EventSelection
	) => boolean,

	/** make sure we only are setting things to their proper Y positioning */
	snapEventToNearestValidY: Function,

	/** I'll pass an event and blockIdx and you tell me the smallest i can make it */
	getMinBlockResizeHeight: (event: EventType, blockIdx: number) => number,

	/** called on drop... adds in resizeUpdates */
	onDropEvent: ({
		event: ?EventType,
		dragEvent: DragEvent,
		newX: number,
		newY: number,
		resizeUpdates: Array<{
			blockIdx: number,
			newWidth?: number,
			newHeight?: number
		}>
	}) => Promise<boolean> | boolean
}

type ResizeGridState = {
	/** should we enable autoscroll left/right when dragging */
	enableAutoScrollX: boolean,

	/** auto scroll when dragging up/down */
	enableAutoScrollY: boolean
}

class ResizeGrid extends PureComponent<ResizeGridProps, ResizeGridState> {
	_activeResize: ActiveResize | null

	/** tracks all resizes */
	_resizeUpdates: Array<{
		blockIdx: number,
		newHeight?: number,
		newWidth?: number
	}> = []

	state = {
		enableAutoScrollX: true,
		enableAutoScrollY: true
	}

	getActiveResize = () => {
		return this._activeResize
	}

	handleMouseDownOnEvent = (
		e: MouseEvent | TouchEvent,
		originalSelection: EventSelection
	) => {
		const { target } = e
		const { onMouseDownOnEvent } = this.props

		const response = onMouseDownOnEvent
			? onMouseDownOnEvent(e, originalSelection)
			: true

		// was this mouse down cancelled?
		if (response === false) {
			return false
		}

		// determine if we tapped a resize handle and if so, which one
		if (
			(target instanceof HTMLElement &&
				target.classList.contains('resize-handle')) ||
			(target.parentNode instanceof HTMLElement &&
				target.parentNode.classList.contains('resize-handle'))
		) {
			const direction =
				(target instanceof HTMLElement &&
					target.classList.contains('resize-n')) ||
				(target.parentNode instanceof HTMLElement &&
					target.parentNode.classList.contains('resize-n'))
					? 'n'
					: 's'

			this._activeResize = {
				direction
			}

			this.setState({ enableAutoScrollX: false, enableAutoScrollY: true })
		} else {
			this.setState({ enableAutoScrollX: true, enableAutoScrollY: true })
			this._activeResize = null
		}

		return true
	}

	handleDragEvent = (drag: ActiveDrag) => {
		const { onDragEvent } = this.props
		const { dragEventNode, blockIdx } = drag

		// to track the cancelling of drag grid moving the event for us
		let cancelDrag = false

		const response = onDragEvent ? onDragEvent(drag) : true

		if (response === false) {
			return false
		}

		if (this._activeResize) {
			// console.log('handle drag resizing')
			cancelDrag = true

			const {
				getMinBlockResizeHeight,
				onResizeEvent,
				snapEventToNearestValidY
			} = this.props

			const {
				dragYDistance,
				dragEvent,
				dragNodeRect,
				dragBlockNode,
				dragBlockNodeRects,
				scrollHeight
			} = drag

			const { direction } = this._activeResize

			const minHeight = getMinBlockResizeHeight(dragEvent, blockIdx)
			const originalHeight = dragBlockNodeRects[blockIdx].height
			const originalTop = dragNodeRect.top

			const updates = []

			let distance = snapEventToNearestValidY({
				dragNodeTop: Math.abs(dragYDistance)
			})

			// track if we're dragging up (wich is negative) or down (which is possible)
			if (dragYDistance < 0) {
				distance *= -1
			}

			// clamping distances
			// if we are resizing a second/third block up, we can only drag up as far as the height of the block before it
			if (direction === 'n' && blockIdx > 0) {
				distance = Math.max(
					distance,
					dragBlockNodeRects[blockIdx - 1].height * -1
				)
				distance = Math.min(
					distance,
					dragBlockNodeRects[blockIdx].height - minHeight
				)
			}
			//we are dragging top of first block up, so we can go up as far as we are from the top
			//and if we are grading top of frist block down, go to min height
			else if (direction === 'n') {
				distance = Math.max(distance, originalTop * -1)
				distance = Math.min(
					distance,
					dragBlockNodeRects[blockIdx].height - minHeight
				)
			}
			//when dragging the bottom of any block down, we can only go until the event itself his the bottom of the container
			else if (direction === 's') {
				distance = Math.min(distance, scrollHeight - dragNodeRect.bottom) * -1
			}

			let height = originalHeight - distance

			height = Math.max(minHeight, height)

			updates.push({
				blockIdx,
				newHeight: height
			})

			let dragNodeNewTop: ?number
			let previousBlockNewHeight: ?number

			// if we are dragging the first block up, we actually slide the whole event up
			if (direction === 'n' && blockIdx === 0) {
				dragNodeNewTop = originalTop + distance
			} else if (direction === 'n' && blockIdx > 0) {
				const previousHeight = dragBlockNodeRects[blockIdx - 1].height
				previousBlockNewHeight = previousHeight + distance

				updates.push({
					blockIdx: blockIdx - 1,
					newHeight: previousBlockNewHeight
				})
			}

			//pass the resize up
			const response = onResizeEvent ? onResizeEvent(updates) : true
			if (response !== false) {
				// save each resize
				updates.forEach(update => this._saveResize(update))

				dragBlockNode.style.height = `${height}px`

				if (typeof dragNodeNewTop === 'number') {
					dragEventNode.style.top = `${dragNodeNewTop}px`
				}

				if (typeof previousBlockNewHeight === 'number') {
					const previousDragBlock: HTMLElement = (dragBlockNode.previousSibling: any)
					previousDragBlock.style.height = `${previousBlockNewHeight}px`
				}
			}
		}
		//dragging a block means changing duration of the block ahead of it
		//drag grid cannot handle this. but, we do want to move the event, so
		//we'll want to move the event on the x as well
		else if (blockIdx > 0) {
			cancelDrag = true

			const { snapEventToNearestValidY, onResizeEvent } = this.props
			const {
				dragBlockNode,
				dragYDistance,
				dragNodeRect,
				dragBlockNodeRects,
				scrollHeight,
				destinationX
			} = drag

			const previousDragBlock: HTMLElement = (dragBlockNode.previousSibling: any)
			const originalHeight = dragBlockNodeRects[blockIdx - 1].height
			const maxDistance = scrollHeight - dragNodeRect.bottom

			let distance = Math.min(dragYDistance, maxDistance)

			const newHeight = Math.max(
				0,
				snapEventToNearestValidY({
					dragNodeTop: originalHeight + distance
				})
			)

			const updates = [
				{ blockIdx: blockIdx - 1, newHeight: parseInt(newHeight, 10) }
			]

			const response = onResizeEvent ? onResizeEvent(updates) : true

			if (response !== false) {
				this._saveResize(updates[0])

				previousDragBlock &&
					(previousDragBlock.style.height = parseInt(newHeight, 10) + 'px')
				typeof destinationX !== 'undefined' &&
					(dragEventNode.style.left = destinationX + 'px')
			}
		}

		return !cancelDrag
	}

	_saveResize = ({
		blockIdx,
		newHeight,
		newWidth
	}: {
		blockIdx: number,
		newHeight?: number,
		newWidth?: number
	}) => {
		const updates = this._resizeUpdates.filter(
			update => update.blockIdx !== blockIdx
		)
		updates.push({ blockIdx, newWidth, newHeight })
		this._resizeUpdates = updates
	}

	handleDropEvent = async ({
		event,
		dragEvent,
		newX,
		newY
	}: {
		event: ?EventType,
		dragEvent: DragEvent,
		newX: number,
		newY: number
	}) => {
		const { onDropEvent } = this.props
		const updates = this._resizeUpdates
		this._resizeUpdates = []
		this._activeResize = null

		this.setState({ enableAutoScrollX: true, enableAutoScrollY: true })

		return (
			onDropEvent &&
			onDropEvent({
				event,
				dragEvent,
				newX,
				newY,
				resizeUpdates: updates
			})
		)
	}

	render() {
		const { render } = this.props
		const { enableAutoScrollX, enableAutoScrollY } = this.state

		return render ? (
			render({
				handleDragEvent: this.handleDragEvent,
				handleMouseDownOnEvent: this.handleMouseDownOnEvent,
				handleDropEvent: this.handleDropEvent,
				enableAutoScrollX,
				enableAutoScrollY
			})
		) : (
			<div>MISSING RENDER</div>
		)
	}
}

export default ResizeGrid
