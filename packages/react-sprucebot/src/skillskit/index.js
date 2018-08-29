function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

const skill = {
	height: 0,
	minHeight: 0,
	handleStickElementClick: {},
	listenersByEventName: {},
	forceAuth: function() {
		postMessage('Skill:ForceAuth')
	},
	/**
	 * Called anytime a skill is resized to let the parent know what to set the height of the iframe to
	 */
	resized: function() {
		var height = 0
		var body = document.body
		var docEl = document.documentElement

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
		var clientTop = docEl.clientTop || body.clientTop || 0
		var top = scrollTop - clientTop
		var height = Math.max(this.minHeight, top + body.clientHeight)

		if (height != this.height) {
			this.height = height
			postMessage({
				name: 'Skill:Resized',
				height: height
			})
		}
	},

	windowOrDocument: function() {
		const standalone = window.navigator.standalone
		const userAgent = window.navigator.userAgent.toLowerCase()
		const safari = /safari/.test(userAgent)
		const chrome = /chrome/.test(userAgent)
		const ios = /iphone|ipod|ipad/.test(userAgent)
		const android = /android/.test(userAgent)
		const isIOSWebView = ios && !safari && !standalone
		const isAndroidWebView = android && !chrome && !standalone

		if (isIOSWebView || isAndroidWebView) {
			return document
		} else {
			return window
		}
	},

	addEventListener: function(eventName, listener) {
		if (!this.listenersByEventName[eventName]) {
			this.listenersByEventName[eventName] = []
		}
		this.listenersByEventName[eventName].push(listener)
	},

	removeEventListener: function(eventName, listener) {
		if (!this.listenersByEventName[eventName]) {
			this.listenersByEventName[eventName] = []
		}
		const idx = this.listenersByEventName[eventName].indexOf(listener)
		if (idx > -1) {
			this.listenersByEventName[eventName].splice(idx, 1)
		}
	},

	dispatchEventListener: function(eventName, payload) {
		const listeners = this.listenersByEventName[eventName] || []
		listeners.forEach(l => l(payload))
	},

	setMinBodyHeight: function(height) {
		this.minHeight = height
	},
	clearMinBodyHeight: function() {
		this.minHeight = 0
	},
	showUnderlay: function() {
		postMessage('Skill:ShowUnderlay')
	},

	hideUnderlay: function() {
		postMessage('Skill:HideUnderlay')
	},

	canSendMessages: function() {
		return window.top !== window.self || window.__SBTEAMMATE__
	},

	back: function() {
		if (!this.canSendMessages()) {
			window.history.back()
		} else {
			postMessage('Skill:Back')
		}
	},

	editUserProfile: function({ userId, locationId }) {
		postMessage({
			name: 'Skill:EditUserProfile',
			userId,
			locationId
		})
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
		postMessage({
			name: 'Skill:ScrollTo',
			offset: offset || 0
		})
	},

	scrollBy: function(offset) {
		if (!this.canSendMessages()) {
			window.scrollBy({
				top: offset,
				behavior: 'smooth'
			})
		} else {
			postMessage({ name: 'Skill:ScrollBy', offset })
		}
	},

	requestScroll: function() {
		postMessage({ name: 'Skill:RequestContainerScrollTop' })
	},

	fullScreenOn: function() {
		postMessage({ name: 'Skill:FullScreenOn' })
	},

	fullScreenOff: function() {
		postMessage({ name: 'Skill:FullScreenOff' })
	},

	showHelp: async function({ title, body }) {
		if (!this.canSendMessages()) {
			alert(`[${title}] ${body}`)
		} else {
			const promise = new Promise((accept, reject) => {
				this._showHelpAccept = accept
			})

			postMessage({ name: 'Skill:ShowHelp', title, body })

			return promise
		}
	},

	handleIframeMessage: function(e) {
		if (typeof e.data === 'string') {
			try {
				const results = JSON.parse(e.data)

				// TODO make this different?
				if (results.name === 'Skill:HideHelp') {
					if (this._showHelpAccept) {
						this._showHelpAccept()
						this._showHelpAccept = null
					}
				}
				if (results.name.substring(0, 5) === 'Event') {
					const { name, payload } = results
					this.dispatchEventListener(name.substring(6), payload)
				} else if (results.name === 'Search:SelectUser') {
					if (this._onSelecUserFormSearchCallback) {
						this._onSelecUserFormSearchCallback(results.user)
						this._onSelecUserFormSearchCallback = null
					}
				} else if (results.name === 'Search:Cancel') {
					if (this._onCancelSearchCallback) {
						this._onCancelSearchCallback()
						this._onCancelSearchCallback = null
					}
				} else if (results.name === 'Skill:DidConfirm') {
					if (this._confirmAccept) {
						this._confirmAccept(results.pass)
						this._confirmAccept = null
					}
				} else if (results.name === 'Skill:DidClickStickyElement') {
					if (this.handleStickElementClick[results.position]) {
						this.handleStickElementClick[results.position](results.key)
					}
				}
			} catch (err) {}
		}
	},

	//TODO move to promise?
	searchForUser: function({
		onCancel = () => {},
		onSelectUser = () => {},
		roles = ['guest'],
		locationId
	} = {}) {
		postMessage({ name: 'Skill:SearchForUser', roles, locationId })

		this._onCancelSearchCallback = onCancel
		this._onSelecUserFormSearchCallback = onSelectUser
	},

	displayMessage: function({ message, type = 'error' }) {
		if (!this.canSendMessages()) {
			alert(message)
		} else {
			postMessage({ name: 'Skill:DisplayMessage', message, type })
		}
	},

	confirm: async function({ message }) {
		if (!this.canSendMessages()) {
			return window.confirm(message)
		} else {
			const promise = new Promise((accept, reject) => {
				this._confirmAccept = accept
			})

			postMessage({ name: 'Skill:PleaseConfirm', message })

			return promise
		}
	},

	/**
	 * position: 'top' | 'bottom'
	 * elements: [
	 * {
	 *  key: 'first-button', (key is passed back to onClick)
	 * 	type: 'button'|'title',
	 *  leftIcon: 'scissors',
	 *  rightIcon: 'pencil'
	 *  value: 'Hey There' //value MUST be a string, will be value of button or innerHTML of everything else
	 * }
	 * ]
	 */
	setStickyElement: function({
		elements,
		position = 'top',
		onClick = () => {}
	}) {
		this.handleStickElementClick[position] = onClick
		postMessage({
			name: 'Skill:SetStickyElement',
			elements,
			position
		})
	},

	updateStickyBoundingRect: function(rect) {
		if (
			this._lastRect &&
			this._lastRect.top === rect.top &&
			this._lastRect.bottom == rect.bottom
		) {
			return
		}

		this._lastRect = rect

		postMessage({
			name: 'Skill:SetStickyBoundingRect',
			boundingRect: {
				top: rect.top,
				bottom: rect.bottom,
				left: rect.left,
				right: rect.right,
				x: rect.x,
				y: rect.y
			}
		})
	},

	clearStickyElements() {
		postMessage({ name: 'Skill:ClearStickyElements' })
	},

	notifyOfRouteChangeStart() {
		postMessage({ name: 'Skill:RouteChangeStart' })
	}
}

if (typeof window !== 'undefined') {
	skill
		.windowOrDocument()
		.addEventListener('message', skill.handleIframeMessage.bind(skill))
}

export default skill
