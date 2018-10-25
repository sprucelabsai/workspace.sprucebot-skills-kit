export default {
	bodyWidth() {
		return document.body.clientWidth
	},
	bodyHeight() {
		return document.body.clientHeight
	},
	getTop(node) {
		return node && node.getBoundingClientRect
			? node.getBoundingClientRect().top
			: null
	},
	getLeft(node) {
		return node && node.getBoundingClientRect
			? node.getBoundingClientRect().left
			: null
	}
}
