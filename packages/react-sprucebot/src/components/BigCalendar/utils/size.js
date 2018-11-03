export default {
	bodyWidth() {
		return document.body.clientWidth
	},
	bodyHeight() {
		return document.body.clientHeight
	},
	getTop(node) {
		return this.getPosition(node).y
	},
	getBottom(node) {
		return this.getPosition(node).y + this.getHeight(node)
	},
	getLeft(node) {
		return this.getPosition(node).x
	},
	getRight(node) {
		return this.getLeft(node) + this.getWidth(node)
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
	getScrollHeight(node) {
		return node && node.scrollHeight ? node.scrollHeight : null
	},
	getPosition(el) {
		var xPos = 0
		var yPos = 0
		let count = 0

		while (el) {
			if (el.tagName == 'BODY') {
				// deal with browser quirks with body/window/document and page scroll
				var xScroll = el.scrollLeft || document.documentElement.scrollLeft
				var yScroll = el.scrollTop || document.documentElement.scrollTop

				xPos += el.offsetLeft - xScroll + el.clientLeft
				yPos += el.offsetTop - yScroll + el.clientTop
			} else {
				const scrollLeft = count > 0 ? el.scrollLeft : 0
				const scrollTop = count > 0 ? el.scrollTop : 0

				// for all other non-BODY elements
				xPos += el.offsetLeft - scrollLeft + el.clientLeft
				yPos += el.offsetTop - scrollTop + el.clientTop
			}

			count++

			el = el.offsetParent
		}
		return {
			x: xPos,
			y: yPos
		}
	},
	getMaxScrollTop(node) {
		const height = this.getHeight(node)
		const scrollHeight = this.getScrollHeight(node)
		const maxScroll = scrollHeight - height
		return maxScroll
	},
	getMaxScrollLeft(node) {
		const width = this.getWidth(node)
		const scrollWidth = this.getScrollWidth(node)
		const maxScroll = scrollWidth - width
		return maxScroll
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
		return scrollLeft <= 0
	}
}
