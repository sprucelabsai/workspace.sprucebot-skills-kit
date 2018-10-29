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
	},
	getWidth(node) {
		return node && node.offsetWidth ? node.offsetWidth : null
	},
	getHeight(node) {
		return node && node.offsetHeight ? node.offsetHeight : null
	},
	getScrollWidth(node) {
		return node && node.scrollWidth ? node.scrollWidth : null
	},
	isScrolledAllTheWayRight(node) {
		const width = this.getWidth(node)
		const scrollWidth = this.getScrollWidth(node)
		const scrollLeft = node.scrollLeft
		const maxScroll = scrollWidth - width

		return scrollLeft >= maxScroll
	},
	isScrolledAllTheWayLeft(node) {
		const scrollLeft = node.scrollLeft
		return scrollLeft === 0
	}
}
