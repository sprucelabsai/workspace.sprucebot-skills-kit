import { ISpruceRouter } from '../interfaces/ctx'

export default (router: ISpruceRouter) => {
	router.get('/api/1.0/guest/onboarding.json', async ctx => {
		try {
			const finishedOnboarding = await ctx.services.onboarding.didOnboarding(
				// @ts-ignore: Legacy support where ctx.auth is a UserLocation
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
		}
	})

	router.post('/api/1.0/guest/onboarding.json', async ctx => {
		if (!ctx.auth) {
			throw new Error('USER_NOT_FOUND')
		}
		// @ts-ignore: Legacy support where ctx.auth is a UserLocation
		const waitKey = `onboarding-${ctx.auth.LocationId}`
		try {
			await ctx.sb.wait(waitKey)
			const finishedOnboarding = await ctx.services.onboarding.finishOnboarding(
				// @ts-ignore: Legacy support where ctx.auth is a UserLocation
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
