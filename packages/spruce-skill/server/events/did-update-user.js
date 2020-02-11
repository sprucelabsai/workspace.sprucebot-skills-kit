const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		console.log(
			'****did-update-user',
			ctx.auth.Location.name,
			ctx.auth.User.name
		)

		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
