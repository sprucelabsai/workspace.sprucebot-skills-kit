// @flow

import type { Event as EventType, EventBlock as EventBlockType } from '../types'

export default {
	durationSec(event: EventType): number {
		let durationSec = 0

		event.blocks.forEach(block => {
			durationSec += block.durationSec
		})

		return durationSec
	},
	clientXY(e: MouseEvent | TouchEvent): { clientX: number, clientY: number } {
		if (e.touches instanceof Array && e.touches[0]) {
			return {
				clientX: e.touches[0].pageX,
				clientY: e.touches[0].pageY
			}
		}

		return {
			clientX: typeof e.clientX === 'number' ? e.clientX : 0,
			clientY: typeof e.clientY === 'number' ? e.clientY : 0
		}
	}
}
