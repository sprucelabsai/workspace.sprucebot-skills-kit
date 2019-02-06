const toJSON = function(error) {
	return {
		// Standard
		message: error.message,
		name: error.name,
		// Microsoft
		description: error.description,
		number: error.number,
		// Mozilla
		fileName: error.fileName,
		lineNumber: error.lineNumber,
		columnNumber: error.columnNumber,
		stack: error.stack,
		// Axios
		config: error.config,
		code: error.code
	}
}

export default function clientMiddleware(client) {
	return ({ dispatch, getState }) => {
		// eslint-disable-line
		return next => action => {
			const { auth } = getState()

			if (auth && auth.jwt) {
				client.setJwt(auth.jwt)
			}

			if (typeof action === 'function') {
				return action(dispatch, getState, next, client)
			}

			const { promise, types, ...rest } = action
			if (!promise) {
				return next(action)
			}

			const [REQUEST, SUCCESS, FAILURE] = types
			next({
				...rest,
				type: REQUEST
			})

			const actionPromise = promise(client, auth)

			actionPromise
				.then(
					result => {
						return next({
							...rest,
							result,
							type: SUCCESS
						})
					},
					error =>
						next({
							...rest,
							error: toJSON(error),
							type: FAILURE
						})
				)
				.catch(error => {
					console.log('MIDDLEWARE ERROR:', error)
					next({
						...rest,
						error,
						type: FAILURE
					})
				})

			return actionPromise
		}
	}
}
