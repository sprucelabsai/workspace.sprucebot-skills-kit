function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

export default {
	height: 0,
	forceAuth: function() {
		postMessage('Skill:ForceAuth')
	},
	resized: function() {
		var height = 0

		var body = document.body
		var docEl = document.documentElement
		var modal = document.querySelector('.dialog_underlay.on')

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
		var clientTop = docEl.clientTop || body.clientTop || 0
		var top = scrollTop - clientTop
		var height = top + body.clientHeight

		if (modal && modal.scrollHeight) {
			height = modal.scrollHeight
		}

		if (height != this.height) {
			this.height = height
			postMessage({
				name: 'Skill:Resized',
				height
			})
		}
	},
	back: function() {
		postMessage('Skill:Back')
	},

	ready: function({ resetUrlTrail = false } = { resetUrlTrail: false }) {
		this.resized()
		postMessage({
			name: 'Skill:Loaded',
			url: window.location.href,
			resetUrlTrail
		})
		this.resizedInterval = setInterval(this.resized.bind(this), 300)
	},
	scrollTo: function(offset) {
		postMessage({ name: 'Skill:ScrollTo', offset: offset || 0 })
	}
}
