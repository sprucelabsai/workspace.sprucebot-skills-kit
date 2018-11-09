module.exports = (router, options) => {
	router.get('/api/1.0/guest/onboarding.json', async (ctx, next) => {
		try {
			const finishedOnboarding = await ctx.services.onboarding.didOnboarding(
				ctx.auth
			)
			ctx.body = {
				finishedOnboarding:
					finishedOnboarding && finishedOnboarding.onboardingComplete
			}
		} catch (err) {
			console.error('loading onboarding failed')
			console.error(err.stack || err)
			ctx.throw('LOAD_ONBOARDING_ERROR')
		} finally {
		}
	})

	router.post('/api/1.0/guest/onboarding.json', async (ctx, next) => {
		const waitKey = `onboarding-${ctx.auth.LocationId}`
		try {
			await ctx.sb.wait(waitKey)
			const finishedOnboarding = await ctx.services.onboarding.finishOnboarding(
				ctx.auth
			)
			ctx.body = {
				finishedOnboarding:
					finishedOnboarding && finishedOnboarding.onboardingComplete
			}
		} catch (err) {
			console.error('saving onboarding failed')
			console.error(err.stack || err)
			ctx.throw('SAVE_ONBOARDING_ERROR')
		} finally {
			ctx.sb.go(waitKey)
		}
	})
}
