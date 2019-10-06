import Iframes from '@sprucelabs/spruce-utils/iframes'
import { ICoreUserLocation, ICoreCalendarEvent } from '@sprucelabs/spruce-types'

function postMessage(message: Record<string, any>): void {
	return window.parent.postMessage(JSON.stringify(message), '*')
}

let skillStatusCheckListener = null

export interface ISearchForUserLegacy {
	onCancel?: () => void
	onSelectUser?: (userLocation: ICoreUserLocation) => void
	roles?: string[]
	locationId?: string
}

export interface IBigSearch {
	/** Search for ANYTHING! */
	search(options: { locationId?: string }): void
	/** callback to be invoked when a selection is made */
	onSelect(callback: (selection: Record<string, any>) => void): void
	/** pass a callback to be triggered on cancel of search */
	onCancel(callback: () => void): void
}

export interface ISaveBar {
	/** show the save bar */
	show(): void
	/** hide the save bar */
	hide(): void
	/** callback invoked when save is clicked */
	onSave(callback: () => void): void
	/** callback invoked when discard is clicked */
	onDiscard(callback: () => void): void
	/** sets progress on save button */
	setIsSaving(isSaving: boolean): void
	/** sets progress on discard button */
	setIsDiscarding(isDiscarding: boolean): void
	/** enable the save button */
	disableSave(): void
	/** disable the save button */
	enableSave(): void
	/** enable discard button */
	enableDiscard(): void
	/** disable discard button */
	disableDiscard(): void
}

export interface ICalendar {
	/** drop a calendar event onto the calendar */
	createEvent(event: ICoreCalendarEvent): void
	/** update an event on the calendar */
	updateEvent(event: ICoreCalendarEvent): void
	/** removes a calendar event from the calendar */
	deleteEvent(id: string): void
	/** set a callback for when an event is updated */
	onCreateEvent(callback: (data: { event: ICoreCalendarEvent }) => void): void
	/** a callback to invoke when a calendar event is updated */
	onUpdateEvent(callback: (data: { event: ICoreCalendarEvent }) => void): void
	/** a callback for when a calendar event is deleted */
	onDeleteEvent(callback: (data: { id: string }) => void): void
}

export interface IConfirmationDialog {
	show(options: {
		title?: string
		text?: string
		context?: Record<string, any>
		kind: 'textOnly' | 'confirmInput'
		id?: string
		confirmInputLabel?: string
		confirmInputValidString?: string
		confirmInputIgnoreCase?: boolean
		cancelButtonText?: string
		confirmButtonText?: string
		isConfirmButtonDisabled?: boolean
		isConfirmButtonLoading?: boolean
		isCancelButtonDisabled?: boolean
		isCancelButtonLoading?: boolean
		isDestructive?: boolean
		closeOnConfirm?: boolean
		onConfirm?: () => void
		onCancel?: () => void
	}): void
	setIsConfirming(isConfirming: boolean): void
	setIsCanceling(isCanceling: boolean): void
	setConfirmButtonIsLoading(isLoading: boolean): void
	setCancelButtonIsLoading(isLoading: boolean): void
	setConfirmButtonIsDisabled(isDisabled: boolean): void
	setCancelButtonIsDisabled(isDisabled: boolean): void
}

export interface IModal {
	/** open a modal dialog */
	open(options: {
		title?: string
		src?: string
		footerPrimaryActionText?: string
		footerSecondaryActionText?: string
		isPaged?: boolean
		isDialogFooterPrimaryActionDisabled?: boolean
		isDialogFooterSecondaryActionDisabled?: boolean
		size: 'small' | 'medium' | 'full-width'
		contentHeight: string
	}): void
	/** close modal dialog , data is passed through to onClosed */
	close(data?: Record<string, any>): void
	/** invoked when the "back" error is clicked */
	onGoBack(callback: () => void): void
	/** invoked when the primary action is clicked/tapped */
	onClickFooterPrimaryAction(callback: () => void): void
	/** invoked when secondary action is clicked/tapped */
	onClickFooterSecondaryAction(callback: () => void): void
	/** invoked on close of dialog with any data passed from closer */
	onClosed(callback: (data?: Record<string, any>) => void): void
	/** pass anything truthy to make fullHeight TODO rename setIsFullHeight(boolean)  */
	setContentHeight(height: string): void
	/** Set whether the primary action show loading */
	setFooterPrimaryActionIsLoading(isLoading: boolean): void
	/** Set whether the secondary action show loading */
	setFooterSecondaryActionIsLoading(isLoading: boolean): void
	/** disable primary action */
	setFooterPrimaryActionIsDisabled(isDisabled: boolean): void
	/** disable secondary action */
	setFooterSecondaryActionIsDisabled(isDisabled: boolean): void
	/** set the text on the primary action */
	setFooterPrimaryActionText(text: string): void
	/** set the text on the secondary action */
	setFooterSecondaryActionText(text: string): void
	/** override title of the modal dialog */
	setTitle(text: string): void
	/** is the back button visible? */
	setBackButtonIsVisible(isVisible: boolean): void
}

export interface ISupportingMessage {
	add(options: {
		headline?: string
		text?: string
		followupText?: string
		timeout?: number
		kind: 'positive' | 'negative' | 'neutral'
		callback: () => void
	}): void
}

export interface IBlockingMessage {
	add(options: {
		headline?: string
		text?: string
		followupText?: string
		timeout?: number
		kind: 'positive' | 'negative' | 'neutral'
		callback: () => void
	}): void
}

export interface ISkill {
	/**
	 * Local State
	 */
	_onCancelSearchCallback?: any
	_onSelecUserFormSearchCallback?: any
	_onSaveListener?: any
	_onDiscardListener?: any
	_onClosedListener?: any
	_onGoBackListener?: any
	_onClickFooterPrimaryActionListener?: any
	_onClickFooterSecondaryActionListener?: any
	_onConfirmListener?: any
	_onCancelListener?: any

	/**
	 * Actions
	 */
	/** Pop up a dialog to let the user edit their profile */
	editUserProfile(options: {
		userId: string
		organizationId: string
		locationId: string
	}): void

	/** Redirect to a route with any params */
	redirect(options: { route: string; params: Record<string, any> }): void

	/** When cooking setting fails, this is invoked to do out of iframe redirect */
	forceAuth(): void

	/** put in your page's componentDidMount to hide loading overlay */
	ready(options?: { showHeader?: boolean }): void

	/** LEGACY BIG SEARCH; Deprecated, use bigsearch() */
	searchForUser(options: Record<string, any>): void

	/** Big search controls */
	bigSearch(): IBigSearch

	/** Control the save bar */
	saveBar(): ISaveBar

	/** Modal dialog controls */
	modal(): IModal

	/** all the calendar controls */
	calendar(): ICalendar

	/** show a confirmation dialog */
	confirm(): IConfirmationDialog

	/** Show a message or hint in a non blocking way */
	supportingMessage(): ISupportingMessage

	/** Show a message or hint in blocking way */
	blockingMessage(): IBlockingMessage

	/** invoked anytime a route change has started */
	notifyOfRouteChangeStart(): void
}

const skill: ISkill = {
	editUserProfile({ userId, organizationId, locationId }) {
		postMessage({
			name: 'Skill:EditUserProfile',
			userId,
			locationId,
			organizationId
		})
	},

	redirect({ route, params = {} }) {
		Iframes.sendMessage({
			to: window.parent,
			eventName: 'Router:Push',
			data: {
				route,
				params
			}
		})
	},

	forceAuth() {
		Iframes.sendMessage({
			to: window.parent,
			eventName: 'Skill:ForceAuth',
			data: {}
		})
	},

	ready(options = {}) {
		Iframes.sendMessage({
			to: window.parent,
			eventName: 'Skill:Loaded',
			data: {
				url: window.location.href,
				showHeader: options.showHeader
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

	/** LEGACY BIG SEARCH */
	searchForUser({
		onCancel = () => {},
		onSelectUser = () => {},
		roles = ['guest'],
		locationId
	}: ISearchForUserLegacy = {}) {
		postMessage({ name: 'Skill:SearchForUser', roles, locationId })

		this._onCancelSearchCallback = onCancel
		this._onSelecUserFormSearchCallback = onSelectUser
	},

	// TODO: Use Iframes built in callback functionality
	bigSearch() {
		// TODO: Is this alias necessary?
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const _this = this

		const bigSearch: IBigSearch = {
			search: options => {
				postMessage({
					name: 'Skill:SearchForUser',
					locationId: options.locationId
				})
			},
			onCancel: onCancel => {
				_this._onCancelSearchCallback = onCancel
			},
			onSelect: onSelect => {
				_this._onSelecUserFormSearchCallback = onSelect
			}
		}

		return bigSearch
	},

	saveBar() {
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

	modal() {
		const modal: IModal = {
			open: (data: Record<string, any>) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:Open',
					data
				})
			},
			close: (data: Record<string, any>) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:Close',
					data
				})
			},
			onGoBack: (callback: () => void) => {
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
			setContentHeight: (height: string) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'SkillViewDialog:SetContentHeight',
					data: { value: height }
				})
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

	calendar() {
		const calendar: ICalendar = {
			createEvent: event => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Calendar:CreateEvent',
					data: { event }
				})
			},
			updateEvent: event => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Calendar:UpdateEvent',
					data: { event }
				})
			},
			deleteEvent: id => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Calendar:DeleteEvent',
					data: { event: { id } }
				})
			},
			onCreateEvent: cb => {
				Iframes.onMessage('Calendar:CreateEvent', cb)
			},
			onUpdateEvent: cb => {
				Iframes.onMessage('Calendar:UpdateEvent', cb)
			},
			onDeleteEvent: cb => {
				Iframes.onMessage('Calendar:DeleteEvent', cb)
			}
		}

		return calendar
	},

	confirm() {
		const confirm: IConfirmationDialog = {
			show: data => {
				const { onConfirm, onCancel, ...rest } = data

				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:Show',
					data: { ...rest }
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
			},
			setIsConfirming: (isConfirming: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:SetIsConfirming',
					data: { value: isConfirming }
				})
			},
			setIsCanceling: (isCanceling: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:setIsCanceling',
					data: { value: isCanceling }
				})
			},
			setConfirmButtonIsLoading: (isLoading: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:SetConfirmButtonIsLoading',
					data: { value: isLoading }
				})
			},
			setCancelButtonIsLoading: (isLoading: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:SetCancelButtonIsLoading',
					data: { value: isLoading }
				})
			},
			setConfirmButtonIsDisabled: (isDisabled: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:SetConfirmButtonIsDisabled',
					data: { value: isDisabled }
				})
			},
			setCancelButtonIsDisabled: (isDisabled: boolean) => {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Confirm:SetCancelButtonIsDisabled',
					data: { value: isDisabled }
				})
			}
		}

		return confirm
	},

	supportingMessage() {
		const message: ISupportingMessage = {
			add({
				headline,
				text,
				followupText,
				timeout,
				kind = 'positive',
				callback
			}) {
				Iframes.sendMessage({
					to: window.parent,
					eventName: 'Toast:Add',
					data: {
						headline,
						text,
						followupText,
						timeout,
						kind
					},
					onResponse: () => {
						callback && callback()
					}
				})
			}
		}

		return message
	},
	blockingMessage() {
		const message: IBlockingMessage = {
			add({
				headline
				// text,
				// followupText,
				// timeout,
				// kind = 'positive',
				// callback
			}) {
				window.alert(headline)
			}
		}

		return message
	},

	notifyOfRouteChangeStart() {
		Iframes.sendMessage({
			to: window.parent,
			eventName: 'Skill:RouteChangeStart'
		})
	}
}

export default skill
