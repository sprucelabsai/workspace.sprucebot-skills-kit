export default {
	getLocalTop(node) {
		return node.offsetTop
	},
	getTop(node) {
		return this.getPosition(node).y
	},
	getLocalBottom(node) {
		return this.getLocalTop(node) + node.offsetHeight
	},
	getBottom(node) {
		return this.getPosition(node).y + this.getHeight(node)
	},
	getLocalLeft(node) {
		return node.offsetLeft
	},
	getLeft(node) {
		return this.getPosition(node).x
	},
	getLocalRight(node) {
		return this.getLocalLeft(node) + this.getWidth(node)
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
		let xPos = 0
		let yPos = 0
		let count = 0

		while (el) {
			if (el.tagName == 'BODY') {
				// deal with browser quirks with body/window/document and page scroll
				let xScroll = el.scrollLeft || document.documentElement.scrollLeft
				let yScroll = el.scrollTop || document.documentElement.scrollTop

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
	},
	doesIntersect({ x, y, node }) {
		const { x: left, y: top } = this.getPosition(node)
		const right = left + this.getWidth(node)
		const bottom = top + this.getHeight(node)

		return x >= left && x <= right && y >= top && y <= bottom
	}
}
