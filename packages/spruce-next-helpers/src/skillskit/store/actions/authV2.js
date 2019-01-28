export const GO_AUTH_REQUEST_V2 = 'auth/GO_AUTH_REQUEST_V2'
export const GO_AUTH_SUCCESS_V2 = 'auth/GO_AUTH_SUCCESS_V2'
export const GO_AUTH_ERROR_V2 = 'auth/GO_AUTH_ERROR_V2'

export function go(jwtV2) {
	return {
		types: [GO_AUTH_REQUEST_V2, GO_AUTH_SUCCESS_V2, GO_AUTH_ERROR_V2],
		promise: client =>
			client.post(`/api/2.0/auth.json`, {
				body: {
					jwtV2
				}
			})
	}
}
