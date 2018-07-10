const debug = require('debug')('sprucebot-skills-kit-server')

module.exports = (router, options) => {
	router.post('/api/1.0/guest/sharable/emit.json', async (ctx, next) => {
		try {

			const {name, payload} = ctx.request.body
			if (!name) {
				ctx.throw('You need a name for your event.')
			}

			const namespace = name.split(':')[0]

			if (!namespace) {
				ctx.throw('Event name must be namespaced :')
			}
			
			const results = await ctx.sb.emit(ctx.auth.LocationId, name, {
				userId: ctx.auth.userId,
				sharable: payload
			})

			const lbbResult = results.filter(result => result.skill && result.skill.slug === 'little-black-book')[0]

			if (!lbbResult || !lbbResult.payload) {
				ctx.throw('Improper respons for')
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
	})
}
