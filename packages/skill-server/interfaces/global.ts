/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-namespace */
import { Log } from '@sprucelabs/log'

export interface IEmitResponseCallback {
	callback?: (options: {
		data: Record<string, any>
		method: string
		path: string
		query?: Record<string, any>
	}) => void
	data?: Record<string, any>
}

export interface IEmitResponse {
	skill: { name: string; slug: string }
	error?: any
	payload: Record<string, any>
}

declare global {
	const log: Log
	namespace NodeJS {
		interface Global {
			log: Log
			logger: Log
			testEmitResponse: {
				[eventName: string]: IEmitResponseCallback | IEmitResponse[]
			}
		}
	}
}

export {}
