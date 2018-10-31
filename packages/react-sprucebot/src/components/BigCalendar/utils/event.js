export default {
	durationSec(event) {
		let durationSec = 0

		event.blocks.forEach(block => {
			durationSec += block.durationSec
		})

		return durationSec
	}
}
