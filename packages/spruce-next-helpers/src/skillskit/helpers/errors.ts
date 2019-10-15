import get from 'ts-get'

export default {
	/** pass an error from a try/catch atfer an api call (gql) and I'll pull out the good error messages */
	getFriendlyReasons(err: any, fallback?: string) {
		const errorMessages: string[] = get(
			err,
			err => err.data.friendlyReasons,
			[]
		)

		if (errorMessages.length === 0 && fallback) {
			errorMessages.push(fallback)
		}

		return errorMessages
	}
}
