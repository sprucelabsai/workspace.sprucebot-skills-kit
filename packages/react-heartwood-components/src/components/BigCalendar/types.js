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
