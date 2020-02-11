import { execute, Observable, FetchResult } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import ws from 'ws'
import config from 'config'
import { ListenerFn } from 'eventemitter3'

export default class GraphQLSubscriptions {
	private clients: Observable<
		FetchResult<
			{
				[key: string]: any
			},
			Record<string, any>,
			Record<string, any>
		>
	>[]
	private consumers: ZenObservable.Subscription[]

	public constructor() {
		this.clients = []
		this.consumers = []
	}
	public subscribe(options: {
		uri: string
		subscription: string
		queryVars: Record<string, any>
		onEvent: ListenerFn
		onError: ListenerFn
		onConnected: ListenerFn
		onDisconnected: ListenerFn
		onReconnected: ListenerFn
	}): void {
		const {
			uri,
			subscription,
			queryVars,
			onEvent,
			onError,
			onConnected,
			onDisconnected,
			onReconnected
		} = options
		const subscriptionClient = this.createSubscriptionObservable({
			wsurl: uri,
			query: subscription,
			variables: queryVars || {},
			onConnected,
			onDisconnected,
			onReconnected
		})
		// TODO: Reuse clients if possible
		const consumer = subscriptionClient.subscribe(onEvent, onError)
		this.clients.push(subscriptionClient)
		this.consumers.push(consumer)
	}
	public getWsClient(options: {
		wsurl: string
		onConnected: ListenerFn
		onDisconnected: ListenerFn
		onReconnected: ListenerFn
	}): SubscriptionClient {
		const { wsurl, onConnected, onDisconnected, onReconnected } = options
		const client = new SubscriptionClient(
			wsurl,
			{
				reconnect: true,
				connectionParams: {
					'x-skill-id': config.ID,
					'x-skill-api-key': config.API_KEY
				}
			},
			ws
		)
		if (onConnected) {
			client.onConnected(onConnected)
		}
		if (onDisconnected) {
			client.onDisconnected(onDisconnected)
		}
		if (onReconnected) {
			client.onReconnected(onReconnected)
		}

		return client
	}

	public createSubscriptionObservable(options: {
		wsurl: string
		query: string
		variables: Record<string, any>
		onConnected: ListenerFn
		onDisconnected: ListenerFn
		onReconnected: ListenerFn
	}): Observable<
		FetchResult<
			{
				[key: string]: any
			},
			Record<string, any>,
			Record<string, any>
		>
	> {
		const {
			wsurl,
			query,
			variables,
			onConnected,
			onDisconnected,
			onReconnected
		} = options
		const client = this.getWsClient({
			wsurl,
			onConnected,
			onDisconnected,
			onReconnected
		})
		const link = new WebSocketLink(client)
		// @ts-ignore
		return execute(link, { query, variables })
	}
}
