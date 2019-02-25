// @flow

import type { Event as EventType } from '../types'

export default {
	durationSec(event: EventType): number {
		let durationSec = 0

		event.blocks.forEach(block => {
			durationSec += block.durationSec
		})

		return durationSec
	},
	clientXY(e: MouseEvent | TouchEvent): { clientX: number, clientY: number } {
		// $FlowFixMe
		if (e.touches && e.touches[0]) {
			return {
				// $FlowFixMe
				clientX: e.touches[0].clientX,
				// $FlowFixMe
				clientY: e.touches[0].clientY
			}
		}

		return {
			clientX: typeof e.clientX === 'number' ? e.clientX : 0,
			clientY: typeof e.clientY === 'number' ? e.clientY : 0
		}
	}
}
