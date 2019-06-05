// @flow
import Iframes from '@sprucelabs/spruce-utils/iframes'

function postMessage(message) {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

let skillStatusCheckListener = null

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

		// This is a simple callback that Core can use to see if a skill is
		// running inside the iframe. Necessary since we don't necessarily want
		// to allow direct cross-domain access for security reasons.
		if (!skillStatusCheckListener) {
			skillStatusCheckListener = Iframes.onMessage(
				'Skill:StatusCheck',
				(data, responder) => {
					responder({
						eventName: 'Skill:IsAlive'
					})
				}
			)
		}
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

	modal: function() {
		const modal = {
			open: (data: Object) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:Open',
					data
				})
			},
			close: () => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:Close'
				})
			},
			onGoBack: (callback: Function) => {
				if (this._onGoBackListener) {
					this._onGoBackListener.destroy()
				}
				this._onGoBackListener = Iframes.onMessage(
					'SkillViewDialog:GoBack',
					callback
				)
			},
			onClickFooterPrimaryAction: (callback: Function) => {
				if (this._onClickFooterPrimaryActionListener) {
					this._onClickFooterPrimaryActionListener.destroy()
				}
				this._onClickFooterPrimaryActionListener = Iframes.onMessage(
					'SkillViewDialog:ClickFooterPrimaryAction',
					callback
				)
			},
			onClickFooterSecondaryAction: (callback: Function) => {
				if (this._onClickFooterSecondaryActionListener) {
					this._onClickFooterSecondaryActionListener.destroy()
				}
				this._onClickFooterSecondaryActionListener = Iframes.onMessage(
					'SkillViewDialog:ClickFooterSecondaryAction',
					callback
				)
			},
			onClosed: (callback: Function) => {
				if (this._onClosedListener) {
					this._onClosedListener.destroy()
				}
				this._onClosedListener = Iframes.onMessage(
					'SkillViewDialog:Closed',
					callback
				)
			},
			setFooterPrimaryActionIsLoading: (isLoading: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetFooterPrimaryActionIsLoading',
					data: { value: isLoading }
				})
			},
			setFooterSecondaryActionIsLoading: (isLoading: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetFooterSecondaryActionIsLoading',
					data: { value: isLoading }
				})
			},
			setFooterPrimaryActionIsDisabled: (isDisabled: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetFooterPrimaryActionIsDisabled',
					data: { value: isDisabled }
				})
			},
			setFooterSecondaryActionIsDisabled: (isDisabled: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetFooterSecondaryActionIsDisabled',
					data: { value: isDisabled }
				})
			},
			setFooterPrimaryActionText: (text: string) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetFooterPrimaryActionText',
					data: { value: text }
				})
			},
			setFooterSecondaryActionText: (text: string) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetFooterSecondaryActionText',
					data: { value: text }
				})
			},
			setTitle: (text: string) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetTitle',
					data: { value: text }
				})
			},
			setBackButtonIsVisible: (isVisible: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetBackButtonIsVisible',
					data: { value: isVisible }
				})
			}
		}

		return modal
	},

	confirm: function() {
		const confirm = {
			show: (data: Object, onConfirm?: Function, onCancel?: Function) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:Show',
					data
				})
				if (onConfirm) {
					if (this._onConfirmListener) {
						this._onConfirmListener.destroy()
					}
					this._onConfirmListener = Iframes.onMessage(
						'Confirm:Confirm',
						onConfirm
					)
				}
				if (onCancel) {
					if (this._onCancelListener) {
						this._onCancelListener.destroy()
					}
					this._onCancelListener = Iframes.onMessage('Confirm:Cancel', onCancel)
				}
			}
		}

		return confirm
	},

	notifyOfRouteChangeStart() {
		Iframes.sendMessage({
			to: window.parent,
			eventName: 'Skill:RouteChangeStart'
		})
	}
}

export default skill
