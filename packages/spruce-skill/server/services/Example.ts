import { Location, SpruceSkillService } from '@sprucelabs/spruce-skill-server'
import { ISkillContext } from '../interfaces/ctx'

export default class Example extends SpruceSkillService<ISkillContext> {
	public async getRandomTeammateNameFromLocation(
		location: Location
	): Promise<string> {
		const userLocation = await this.ctx.db.models.UserLocation.findOne({
			where: {
				LocationId: location.id
			},
			include: [this.ctx.db.models.User]
		})

		if (!userLocation || !userLocation.User) {
			throw new Error('USER_NOT_FOUND')
		}
		return userLocation.User.name
	}
}
