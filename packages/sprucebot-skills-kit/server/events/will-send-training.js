module.exports = async (ctx, next) => {
	throw new Error('Please implement a will-send-training event on your skill!')

	// const payload = {
	// 	...ctx.event.payload
	// }

	// if (ctx.event.role === 'teammate') {
	// 	payload.message = ctx.utilities.lang.getText('teammateTrainingMessage', {
	// 		teammate: ctx.event,
	// 		body: String
	// 	})
	// } else if (ctx.event.role === 'owner') {
	// 	payload.message = ctx.utilities.lang.getText('ownerTrainingMessage', {
	// 		owner: ctx.event,
	// 		body: String
	// 	})
	// }
	// ctx.body = payload

	await next()
}
