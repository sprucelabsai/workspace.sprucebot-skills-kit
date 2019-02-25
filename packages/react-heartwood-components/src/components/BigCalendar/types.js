// @flow

import type { Props as EventDetailsType } from './components/EventDetails/EventDetails'
import type { Props as IconType } from '../Icon/Icon'

export type User = {
	id: string,
	name: string
}

export type Event = {
	id: string,
	userId: string,
	startAt: string, // ISO 8601
	className?: string,
	group?: string,
	resizable?: boolean,
	kind?: | 'default' //eslint-disable-line
		| 'tentative'
		| 'active'
		| 'unavailable'
		| 'blocked'
		| 'past'
		| 'warn'
		| 'critical',
	blocks: Array<EventBlock>,
	details?: EventDetailsType
}

export type EventBlock = {
	id: string,
	title: string,
	durationSec: number,
	subtitle?: string,
	rightIcons?: Array<IconType & { title: string }>,
	leftIcons?: Array<IconType & { title: string }>,
	markAsBusy?: boolean,
	className?: string
}

export type DragEvent = Event & {
	originalId: string
}

export type EventSelection = {
	event: Event | DragEvent,
	block: EventBlock,
	blockIdx: number
}

export type ActiveDrag = {
	/** we can override the node being dragged, so track it here */
	dragNode: HTMLElement,

	/** sizing re: the dragEventNode so we calculate once at the beginning of drag (vs a thousand times a second during drag) and use it for placement every dragEvent (only adding points when needed) */
	dragNodeRect: { top: number, height: number, bottom: number },

	/** the event we are dragging */
	dragEvent: DragEvent,

	/** the node of the event we are dragging */
	dragEventNode: HTMLElement,

	/** the node of the event we are dragging */
	dragBlockNode: HTMLElement,

	/** tracks sizing of each block for things like resize (only adding dimensions as needed) */
	dragBlockNodeRects: Array<{ height: number }>,

	/** the block idx that was click/pressed at the start of the drag */
	blockIdx: number,

	/** the event the drag originated from (drags are duplicate events). this is empty if we are long pressing to create an event */
	sourceEvent: ?Event,

	/** the node the drag originated from. is empty if long press to create. */
	sourceEventNode: ?HTMLElement,

	/** the last x position for drag (used for tracking to handle placement when scrolling) */
	lastClientX: number,

	/** last y position for drag (used for tracking to handle placement when scrolling) */
	lastClientY: number,

	/** how far from the top of the dragNode did we start the drag? */
	offsetX: number,

	/** how far from the left of the dragNode did we start the drag? */
	offsetY: number,

	/** the left position of the element that contains the drag node (used for calculations) */
	containerLeft: number,

	/** the top position of the element that contains the drag node */
	containerTop: number,

	/** the height of the container that contains the drag node */
	containerHeight: number,

	/** height of the container including scroll */
	scrollHeight: number,

	/** how far we have dragged left/right (takes into account scroll) */
	dragXDistance: number,

	/** how far we have dragged up/down (takes into account scroll) */
	dragYDistance: number,

	/** where we want to place the drag x before next render */
	destinationX?: number,

	/** where we want to place the drag y before next render */
	destinationY?: number
}

export type ActiveResize = {
	/** the direction we are dragging */
	direction: string
}

export type ColumnMap = {
	[eventId: string]: Array<Array<{ eventId: string, isBusy: boolean }>>,
	eventDetails: {
		[eventId: string]: {
			column: number,
			columns: number,
			endSlot: number,
			overlapped: boolean,
			overlapping: boolean,
			startSlot: number
		}
	}
}
