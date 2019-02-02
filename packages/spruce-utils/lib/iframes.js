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
			// TODO George skills will be hosted on external domains, so we may need to pass
			// the skill's domain
			// const RootDomainRegex = new RegExp(/[\w\d-]+\.[\w\d-]+$/)
			// const thisRootDomain = window.location.hostname.match(RootDomainRegex)
			// const sourceRootDomain = event.source.location.hostname.match(
			// 	RootDomainRegex
			// )

			//legacy support
			const eventData =
				typeof event.data === 'string' ? JSON.parse(event.data) : event.data

			// For security, only allow messages that came from our domain.
			// if (thisRootDomain === sourceRootDomain) {
			if (eventData.eventName === eventName || eventData.name === eventName) {
				// If the event has a response event name, create a callback
				// allowing the subscriber to respond back.
				const responder = eventData.responseEventName
					? dataFromUser => {
							event.source.postMessage(
								{
									eventName: eventData.responseEventName,
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

				// legacy support
				const data =
					typeof event.data === 'string' ? eventData : event.data.dataFromUser

				callback(data, responder)
			}
		}

		responseHandler.destroy = () => {
			window.removeEventListener('message', responseHandler)
		}

		window.addEventListener('message', responseHandler, false)

		return responseHandler
	}
}
