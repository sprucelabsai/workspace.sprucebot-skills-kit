function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

export default {
	height: 0,
	forceAuth: function() {
		postMessage('Skill:ForceAuth')
	},
	resized: function({ minHeight = 0 } = {}) {
		var height = 0

		var body = document.body
		var docEl = document.documentElement

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
		var clientTop = docEl.clientTop || body.clientTop || 0
		var top = scrollTop - clientTop
		var height = Math.max(minHeight, top + body.clientHeight)

		if (height != this.height) {
			this.height = height
			postMessage({
				name: 'Skill:Resized',
				height: height
			})
		}
	},
	back: function() {
		if (window.top === window.self) {
			window.history.back()
		} else {
			postMessage('Skill:Back')
		}
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
	},

	requestScroll: function() {
		postMessage({ name: 'Skill:RequestContainerScrollTop' })
	},

	searchForUser: function({
		onCancel = () => {},
		onSelectUser = () => {},
		roles = ['guest'],
		locationId
	} = {}) {
		postMessage({ name: 'Skill:SearchForUser', roles, locationId })

		this._onCancelSearchCallback = onCancel
		this._onSelecUserFormSearchCallback = onSelectUser

		window.addEventListener('message', this._searchCallback.bind(this))
	},

	displayMessage: function({ message, type = 'error' }) {
		if (window.top === window.self) {
			alert(message)
		} else {
			postMessage({ name: 'Skill:DisplayMessage', message, type })
		}
	},

	confirm: async function({ message }) {
		return window.confirm(message)
	},

	_searchCallback: function(e) {
		if (typeof e.data === 'string') {
			try {
				const results = JSON.parse(e.data)
				let shutdown = false

				if (results.name === 'Search:SelectUser') {
					this._onSelecUserFormSearchCallback(results.user)
					shutdown = true
				} else if (results.name === 'Search:Cancel') {
					this._onCancelSearchCallback()
					shutdown = true
				}

				if (shutdown) {
					window.removeEventListener('message', this._searchCallback)
					this._onCancelSearchCallback = null
					this._onSelecUserFormSearchCallback = null
				}
			} catch (err) {}
		}
	}
}
