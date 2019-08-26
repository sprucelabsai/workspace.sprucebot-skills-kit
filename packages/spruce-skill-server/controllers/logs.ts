export default (router: any, options: any) => {
	router.post('/api/1.0/logs.json', async (ctx: any, next: any) => {
		try {
			if (Array.isArray(ctx.request.body)) {
				ctx.request.body.forEach((logItem: Record<string, any>) => {
					try {
						const { item, level, ...rest } = logItem
						log[level]({ source: 'frontend', ...rest }, item)
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
