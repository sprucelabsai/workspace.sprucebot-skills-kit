import {
	IAuthStatus,
	TOnPromiseHandler,
	TOnConnectPromiseHandler
} from './Mercury'

interface IMercuryEventHandlerOptions {
	userId?: string
	skillId?: string
	payload?: Record<string, any>
}

type TMercuryEventHandler = (
	options: IMercuryEventHandlerOptions
) => Promise<Record<string, any>>

type TMercuryEventAuthorization = (
	options: IMercuryEventHandlerOptions
) => Promise<boolean>

export abstract class MercuryAdapter {
	public abstract isConnected: boolean

	public abstract init(
		options: Record<string, any>,
		eventHandler: TOnPromiseHandler,
		onConnect: TOnConnectPromiseHandler
	): void

	public abstract on(options: {
		eventName: string
		lorganizationId?: string | null
		locationId?: string | null
		userId?: string | null
	}): void

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
