const jwt = require('jsonwebtoken')
const config = require('config')
const Cookies = require('cookies')

module.exports = router => {
	router.get('/api/1.0/auth/:jwt.json', async (ctx, next) => {
		ctx.body = ctx.auth
		await next()
	})

	router.post('/api/2.0/auth.json', async (ctx, next) => {
		ctx.body = ctx.auth
		await next()
	})

	// if in dev mode, we'll allow role overrides
	if (config.DEV_MODE) {
		router.get('/dev/:role/redirect', async (ctx, next) => {
			const role = ctx.params.role
			const cookies = new Cookies(ctx.req, ctx.res)
			cookies.set('devRole', role)
			ctx.redirect(`/${role}`)
			await next()
		})
	}
}
