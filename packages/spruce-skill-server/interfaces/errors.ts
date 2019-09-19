export interface ISpruceErrors {
	[errorCode: string]: {
		/** 🌲🤖 The HTTP error code */
		code: number
		/** 🌲🤖 Whether the operation succeeded or failed */
		status: 'success' | 'failure'
		/** 🌲🤖 A message that would help a developer understand what happened */
		reason: string
		/** 🌲🤖 A message that can be displayed to the user who encounters this error */
		friendlyReason: string
	}
}
