import errors from '../../config/errors'
import { ISpruceContext } from '@sprucelabs/spruce-skill-server'

export default async function eventError(options: {
	ctx: ISpruceContext
	next: () => Promise<any>
	e: Error
}): Promise<void> {
	const { ctx, next, e } = options

	log.debug(e)

	const code = e.message
	let body
	let status = 500

	if (errors[code]) {
		status = errors[code].code
		body = {
			error: {
				name: code,
				status: 'failure',
				code: errors[code].code,
				reason: errors[code].reason,
				friendlyReason: errors[code].friendlyReason
			}
		}
	} else {
		body = {
			error: {
				name: 'UNKNOWN',
				status: 'failure',
				code: errors.UNKNOWN.code,
				reason: errors.UNKNOWN.reason,
				friendlyReason: errors.UNKNOWN.friendlyReason
			}
		}
	}

	ctx.status = status
	ctx.body = body

	await next()
}
