import get from 'ts-get'
import uniq from 'lodash/uniq'

export default {
	/** pass an error from a try/catch after an api call (gql) and I'll pull out the good error messages */
	getFriendlyReasons(err: any, fallback?: string) {
		const errorMessages: string[] = get<any, string[]>(
			err,
			err => err.data.friendlyReasons,
			[]
		).filter(message => !!message)

		if (errorMessages.length === 0 && fallback) {
			errorMessages.push(fallback)
		}

		return uniq(errorMessages.filter(message => !!message))
	}
}
