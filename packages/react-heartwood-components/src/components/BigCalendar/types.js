// @flow

import type { Props as EventDetailsType } from './components/EventDetails/EventDetails'
import type { Props as IconType } from '../Icon/Icon'

export type Event = {
	id: string,
	userId: string,
	startAt: string, // ISO 8601
	className?: string,
	group?: string,
	resizable?: boolean,
	kind?: | 'default'
		| 'tentative'
		| 'active'
		| 'unavailable'
		| 'blocked'
		| 'past'
		| 'warn'
		| 'critical',
	blocks: Array<EventBlock>,
	details: EventDetailsType
}

export type EventBlock = {
	id: string,
	title: string,
	durationSec: number,
	subtitle?: string,
	rightIcons?: Array<IconType>,
	leftIcons?: Array<IconType>,
	markAsBusy?: boolean
}

export type DragEvent = Event & {
	originalId: string
}

export type EventSelection = {
	event: Event,
	block: EventBlock,
	blockIdx: number
}

export type ActiveDrag = {
	/** we can override the node being dragged, so track it here */
	dragNode: HTMLElement,

	/** the event we are dragging */
	dragEvent: DragEvent,

	/** the node of the event we are dragging */
	dragEventNode: HTMLElement,

	/** the node of the event we are dragging */
	dragBlockNode: HTMLElement,

	/** the event the drag originated from (drags are duplicate events) */
	sourceEvent: Event,

	/** the node the drag originated from */
	sourceEventNode: HTMLElement,

	/** the last x position for drag (used to move drag to proper location when scrolling) */
	lastClientX: number,

	/** last y mouse position for drag */
	lastClientY: number,

	/** how far from the top of the dragNode did we start the drag? */
	offsetX: number,

	/** how far from the left of the dragNode did we start the drag? */
	offsetY: number
}
