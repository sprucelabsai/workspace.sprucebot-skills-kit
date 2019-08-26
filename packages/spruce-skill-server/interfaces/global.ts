/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-namespace */
type timer = any

// @ts-ignore
interface ISetOptionsType {
	appEnv?: string
	appKey?: string
	appName?: string
	level?: string
	metricsEnabled?: boolean
	metricsUrls?: string
	packageName?: string
	packageVersion?: string
	useSourcemaps?: boolean
}

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
	error: any
	payload: Record<string, any>
}

declare global {
	namespace NodeJS {
		// @ts-ignore
		interface Global {
			log: any
			logger: any
			testEmitResponse: {
				[eventName: string]: IEmitResponseCallback | IEmitResponse[]
			}
		}
	}

	namespace log {
		const crit: (...any: any[]) => any
		const debug: (...any: any[]) => any
		const error: (...any: any[]) => any
		const fatal: (...any: any[]) => any
		const info: (...any: any[]) => any
		const metric: (...any: any[]) => any
		const setOptions: (options: ISetOptionsType) => any
		const superInfo: (...any: any[]) => any
		const timerEnd: (timer: timer) => number
		const timerStart: (key: string) => timer
		const trace: (...any: any[]) => any
		const warn: (...any: any[]) => any
	}
}

export {}
