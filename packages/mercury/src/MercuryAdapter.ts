import { IAuthStatus } from './Mercury'

export abstract class MercuryAdapter {
	public abstract isConnected: boolean

	public abstract init(options: Record<string, any>): void

	public abstract on(options: {
		eventName: string
		payload: Record<string, any>
	}): void
}
