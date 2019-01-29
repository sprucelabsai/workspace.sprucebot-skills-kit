// @flow
import { SpruceWebError } from '@sprucelabs/spruce-utils/errors'

export type IframeMessageOptions = {|
	to: any,
	eventName: string,
	data: any,
	onResponse?: Function
|}

export default class Iframes {
	// Method for sending a message to another window.
	static sendMessage({
		to: destinationWindow,
		eventName,
		data,
		onResponse
	}: IframeMessageOptions) {
		const responseEventName = `${eventName}__${Math.random()}`

		destinationWindow.postMessage(
			{
				eventName,
				responseEventName: onResponse && responseEventName,
				dataFromUser: data
			},
			'*'
		)

		if (onResponse) {
			const responseHandler = event => {
				if (event.data.eventName === responseEventName) {
					onResponse(event.data.dataFromUser)
					window.removeEventListener('message', responseHandler)
				}
			}

			window.addEventListener('message', responseHandler, false)
		}
	}

	static onMessage(eventName: string, callback: Function) {
		const responseHandler = (event: Object) => {
			const RootDomainRegex = new RegExp(/[\w\d-]+\.[\w\d-]+$/)
			const thisRootDomain = window.location.hostname.match(RootDomainRegex)
			const sourceRootDomain = event.source.location.hostname.match(
				RootDomainRegex
			)

			// For security, only allow messages that came from our domain.
			if (thisRootDomain === sourceRootDomain) {
				if (event.data.eventName === eventName) {
					// If the event has a response event name, create a callback
					// allowing the subscriber to respond back.
					const responder = event.data.responseEventName
						? dataFromUser => {
								event.source.postMessage(
									{
										eventName: event.data.responseEventName,
										dataFromUser
									},
									'*'
								)
						  }
						: () => {
								throw new SpruceWebError(
									'Iframes: Attempted to respond to an event that did not provide a `responseEventName`',
									{
										type: 'warn'
									}
								)
						  }

					callback(event.data.dataFromUser, responder)
				}
			}
		}

		responseHandler.destroy = () => {
			window.removeEventListener('message', responseHandler)
		}

		window.addEventListener('message', responseHandler, false)

		return responseHandler
	}
}
