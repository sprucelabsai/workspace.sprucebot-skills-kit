import config from 'config'
import Cookies from 'cookies'
import * as Router from 'koa-router'

module.exports = (router: Router) => {
	router.get('/api/1.0/auth/:jwt.json', async (ctx: any, next: any) => {
		ctx.body = ctx.auth
		await next()
	})

	router.post('/api/2.0/auth.json', async (ctx, next) => {
		ctx.body = ctx.auth
		if (!ctx.auth) {
			throw new Error('INVALID_AUTHENTICATION')
		}
		await next()
	})

	// if in dev mode, we'll allow role overrides
	if (config.get<boolean>('DEV_MODE')) {
		router.get('/dev/:role/redirect', async (ctx, next) => {
			const role = ctx.params.role
			const cookies = new Cookies(ctx.req, ctx.res)
			cookies.set('devRole', role)
			ctx.redirect(`/${role}`)
			await next()
		})
	}
}
