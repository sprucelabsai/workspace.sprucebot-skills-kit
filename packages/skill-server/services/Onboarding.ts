import SpruceSkillService from '../lib/SpruceSkillService'
import { ISpruceContext } from '../interfaces/ctx'
import { UserLocation } from '../models/UserLocation'

export default class Onboarding extends SpruceSkillService<ISpruceContext> {
	public async didOnboarding(userLocation: UserLocation): Promise<boolean> {
		const meta = await this.ctx.sb.meta('onboarding', {
			locationId: userLocation.LocationId,
			userId: userLocation.id
		})

		if (!meta) {
			return false
		}

		return !!meta.value.onboardingComplete
	}

	public async finishOnboarding(userLocation: UserLocation): Promise<boolean> {
		await this.ctx.sb.upsertMeta(
			'onboarding',
			{ onboardingComplete: true },
			{
				locationId: userLocation.LocationId,
				userId: userLocation.UserId
			}
		)

		return true
	}
}
