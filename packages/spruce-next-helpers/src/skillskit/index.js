import { Iframes } from '@sprucelabs/spruce-utils/iframes'
function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

const skill = {
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

	editUserProfile: function({ userId, locationId }) {
		postMessage({
			name: 'Skill:EditUserProfile',
			userId,
			locationId
		})
	},

	ready: function({ resetUrlTrail = false, showHeader = true } = {}) {
		Iframes.sendMessage({
			to: window.parent
		})
		postMessage({
			name: 'Skill:Loaded',
			url: window.location.href,
			resetUrlTrail,
			showHeader
		})
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
