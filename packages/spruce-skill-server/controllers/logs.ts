import { ISpruceRouter } from '../interfaces/ctx'

export default (router: ISpruceRouter) => {
	router.post('/api/1.0/logs.json', async ctx => {
		try {
			if (Array.isArray(ctx.request.body)) {
				ctx.request.body.forEach((logItem: Record<string, any>) => {
					try {
						const { item, level, ...rest } = logItem
						// @ts-ignore
						if (log[level]) {
							// @ts-ignore
							log[level]({ source: 'frontend', ...rest }, item)
						} else {
							log.warn('Invalid log level from FE')
							log.warn({ source: 'frontend', ...rest }, item)
						}
					} catch (err) {
						log.warn('Unable to log from frontend', err)
					}
				})
			}
			ctx.body = {
				status: 'success'
			}
		} catch (err) {
			log.warn('Log capture error', err)
		}
	})
}
