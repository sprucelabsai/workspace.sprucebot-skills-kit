export default (router: any, options: any) => {
	router.post(
		'/api/1.0/guest/sharable/emit.json',
		async (ctx: any, next: any) => {
			try {
				const { name, payload } = ctx.request.body
				if (!name) {
					ctx.throw('You need a name for your event.')
				}

				const namespace = name.split(':')[0]

				if (!namespace) {
					ctx.throw('Event name must be namespaced :')
				}

				const results: IEmitResponse[] = await ctx.sb.emit(
					ctx.auth.LocationId,
					name,
					{
						userId: ctx.auth.UserId,
						sharable: payload
					}
				)

				const lbbResult = results.filter(
					result => result.skill && result.skill.slug === namespace
				)[0]

				if (!lbbResult || !lbbResult.payload) {
					ctx.throw('Improper response to sharable event ' + name)
				}

				ctx.body = {
					results: lbbResult.payload
				}
				next()
			} catch (err) {
				console.error('emitting sharable event failed')
				console.error(err.stack || err)
				ctx.throw(err)
			}
		}
	)
}
