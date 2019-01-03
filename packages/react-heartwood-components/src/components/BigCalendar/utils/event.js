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
		if (e instanceof TouchEvent) {
			return {
				clientX: e.touches[0].pageX,
				clientY: e.touches[0].pageY
			}
		} else {
			return {
				clientX: e.clientX,
				clientY: e.clientY
			}
		}
	}
}
