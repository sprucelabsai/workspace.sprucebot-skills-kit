import { ClientRequest, IncomingMessage } from 'http'

export default class HttpsError extends Error {
	public request!: ClientRequest
	public response!: IncomingMessage & {
		body?: string
		json?: Record<string, any>
	}
}
