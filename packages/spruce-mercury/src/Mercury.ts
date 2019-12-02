export default class Mercury {
	public static on(eventName: string, handler: () => void): void {
		if (handler) {
			handler(eventName)
		}
	}
}
