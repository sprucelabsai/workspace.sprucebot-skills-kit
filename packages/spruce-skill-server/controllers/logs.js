module.exports = (router, options) => {
	router.post('/api/1.0/logs.json', async (ctx, next) => {
		try {
			if (Array.isArray(ctx.request.body)) {
				ctx.request.body.forEach(logItem => {
					console.log(
						`[FRONTEND ${logItem.level}] [${logItem.userAgent}] [${
							logItem.path
						}] ${logItem.about}`,
						logItem.item
					)
				})
			}
			ctx.body = {
				status: 'success'
			}
		} catch (err) {
			console.log('(WARN | Log capture error)', err)
		}
	})
}
