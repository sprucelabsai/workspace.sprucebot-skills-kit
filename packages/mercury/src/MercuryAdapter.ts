import {
	TOnPromiseHandler,
	IMercuryAdapterOnOptions,
	IMercuryEmitOptions,
	TOnConnectFunctionHandler
} from './Mercury'

export abstract class MercuryAdapter {
	public abstract isConnected: boolean

	public abstract init(
		options: Record<string, any>,
		eventHandler: TOnPromiseHandler,
		onConnect: TOnConnectFunctionHandler
	): void

	public abstract on(options: IMercuryAdapterOnOptions): void

	public abstract emit(options: IMercuryEmitOptions): void

	/** Provides an event */
	// public abstract provide(options: {
	// 	eventName: string
	// 	handler: TMercuryEventHandler
	// 	authorize: TMercuryEventAuthorization
	// }): Promise<void>

	// public abstract emit(options: {
	// 	eventName: string
	// 	organizationId?: string | null
	// 	locationId?: string | null
	// 	userId?: string | null
	// 	payload?: Record<string, any>
	// }): void
}
