// @flow
import Iframes from '@sprucelabs/spruce-utils/iframes'

function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

const skill = {
	editUserProfile: function({
		userId,
		organizationId,
		locationId
	}: {
		userId: string,
		organizationId: string,
		locationId: string
	}) {
		postMessage({
			name: 'Skill:EditUserProfile',
			userId,
			locationId,
			organizationId
		})
	},

	ready: function({ showHeader = true }: { showHeader: boolean } = {}) {
		Iframes.sendMessage({
			to: window.parent,
			eventName: 'Skill:Loaded',
			data: {
				url: window.location.href,
				showHeader
			}
		})
	},

	//TODO move to iframes?
	// searchForUser: function({
	// 	onCancel = () => {},
	// 	onSelectUser = () => {},
	// 	roles = ['guest'],
	// 	locationId
	// } = {}) {
	// 	postMessage({ name: 'Skill:SearchForUser', roles, locationId })

	// 	this._onCancelSearchCallback = onCancel
	// 	this._onSelecUserFormSearchCallback = onSelectUser
	// },

	saveBar: function() {
		const saveBar = {
			show: () => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:Show'
				})
			},
			hide: () => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:Hide'
				})
			},
			onSave: (callback: Function) => {
				if (this._onSaveListener) {
					this._onSaveListener.destroy()
				}
				this._onSaveListener = Iframes.onMessage('SaveBar:Save', callback)
			},
			onDiscard: (callback: Function) => {
				if (this._onDiscardListener) {
					this._onDiscardListener.destroy()
				}
				this._onDiscardListener = Iframes.onMessage('SaveBar:Discard', callback)
			},
			setIsSaving: (isSaving: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:SetIsSaving',
					data: { value: isSaving }
				})
			},
			setIsDiscarding: (isDiscarding: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:SetIsDiscarding',
					data: { value: isDiscarding }
				})
			},
			disableSave: () => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:DisableSave'
				})
			},
			enableSave: () => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:EnableSave'
				})
			},
			enableDiscard: () => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:EnableDiscard'
				})
			},
			disableDiscard: () => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SaveBar:DisableDiscard'
				})
			},
			destroy: () => {
				if (this._onSaveListener) {
					this._onSaveListener.destroy()
				}
			}
		}

		return saveBar
	},

	notifyOfRouteChangeStart() {
		Iframes.sendMessage({
			to: window.parent,
			eventName: 'Skill:RouteChangeStart'
		})
	}
}

export default skill
