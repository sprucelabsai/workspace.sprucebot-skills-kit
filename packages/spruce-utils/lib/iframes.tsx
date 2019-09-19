import { SpruceWebError } from './errors'

export interface IIFrameMessageOptions {
	to: any
	eventName: string
	data: any
	onResponse?: Function
	legacy?: boolean
}

interface IResponseHandler {
	destroy: () => void

	(event: Record<string, any>): void
}

export default class Iframes {
	// Method for sending a message to another window.
	public static sendMessage({
		to: destinationWindow,
		eventName,
		data,
		onResponse,
		legacy
	}: IIFrameMessageOptions): void {
		const responseEventName = `${eventName}__${Math.random()}`

		if (legacy) {
			destinationWindow.postMessage(
				JSON.stringify({
					name: eventName,
					...data
				}),
				'*'
			)
		} else {
			destinationWindow.postMessage(
				{
					eventName,
					responseEventName: onResponse && responseEventName,
					dataFromUser: data
				},
				'*'
			)
		}

		if (onResponse) {
			const responseHandler = (event): void => {
				if (event.data.eventName === responseEventName) {
					onResponse(event.data.dataFromUser, event)
					window.removeEventListener('message', responseHandler)
				}
			}

			window.addEventListener('message', responseHandler, false)
		}
	}

	public static onMessage(
		eventName: string,
		callback: Function
	): IResponseHandler {
		const responseHandler: IResponseHandler = (event): void => {
			// TODO George skills will be hosted on external domains, so we may need to pass
			// the skill's domain
			// const RootDomainRegex = new RegExp(/[\w\d-]+\.[\w\d-]+$/)
			// const thisRootDomain = window.location.hostname.match(RootDomainRegex)
			// const sourceRootDomain = event.source.location.hostname.match(
			// 	RootDomainRegex
			// )
			;``
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

				callback(data, responder, event)
			}
		}

		responseHandler.destroy = () => {
			window.removeEventListener('message', responseHandler)
		}

		window.addEventListener('message', responseHandler, false)

		return responseHandler
	}
}
