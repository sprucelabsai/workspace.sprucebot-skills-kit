module.exports = (router, options) => {
	router.post('/api/1.0/logs.json', async (ctx, next) => {
		try {
			if (Array.isArray(ctx.request.body)) {
				ctx.request.body.forEach(logItem => {
					// console.log(
					// 	`[FRONTEND ${logItem.level}] [${logItem.userAgent}] [${
					// 		logItem.path
					// 	}] ${logItem.about}`,
					// 	logItem.item
					// )
					try {
						// log[logItem.level](
						// 	`[FRONTEND ${logItem.level}] [${logItem.userAgent}] [${
						// 		logItem.path
						// 	}] ${logItem.about}`,
						// 	logItem.item
						// )
						const { item, level, ...rest } = logItem
						log[level]({ source: 'frontend', ...rest }, item)
					} catch (e) {
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
