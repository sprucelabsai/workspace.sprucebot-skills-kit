module.exports = {
	async didOnboarding(user) {
		const meta = await this.sb.meta('onboarding', {
			locationId: user.LocationId,
			userId: user.UserId
		})

		if (!meta) {
			return false
		}

		return { ...meta.value }
	},

	async finishOnboarding(user) {
		const meta = await this.sb.upsertMeta(
			'onboarding',
			{ onboardingComplete: true },
			{
				locationId: user.LocationId,
				userId: user.UserId
			}
		)

		return { ...meta.value }
	}
}