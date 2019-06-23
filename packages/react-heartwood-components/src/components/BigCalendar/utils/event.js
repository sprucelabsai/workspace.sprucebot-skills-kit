export default {
	durationSec(event) {
		let durationSec = 0

		event.blocks.forEach(block => {
			durationSec += block.durationSec
		})

		return durationSec
	},
	clientXY(e) {
		if (e.touches && e.touches[0]) {
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
