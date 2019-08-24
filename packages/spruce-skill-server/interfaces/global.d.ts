/* eslint-disable @typescript-eslint/interface-name-prefix */
export {}
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

declare global {
	namespace NodeJS {
		// @ts-ignore
		interface Global {
			log: any
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
