import SpruceSkillService from './base/SpruceSkillService'
import { ISpruceSkillContext } from '../interfaces/ctx'
import { User } from '../models/User'

export default class Onboarding extends SpruceSkillService<
	ISpruceSkillContext
> {
	public async didOnboarding(user: User): Record<string, any> {
		const meta = await this.ctx.sb.meta('onboarding', {
			locationId: user.LocationId,
			userId: user.UserId
		})

		if (!meta) {
			return false
		}

		return { ...meta.value }
	}

	public async finishOnboarding(user: User): Record<string, any> {
		const meta = await this.ctx.sb.upsertMeta(
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
