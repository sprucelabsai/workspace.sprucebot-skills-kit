const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		console.log('****did-enter', ctx.event.Location.name, ctx.event.User.name)

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
