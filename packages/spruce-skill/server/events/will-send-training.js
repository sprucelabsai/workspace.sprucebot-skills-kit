const { eventError } = require('../lib/errorHandler')

module.exports = async (ctx, next) => {
	try {
		throw new Error(
			'Please implement a will-send-training event on your skill!'
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
