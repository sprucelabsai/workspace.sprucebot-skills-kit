import { SpruceSkillService } from '@sprucelabs/spruce-skill-server'
import { ISpruceSkillContext } from '../types/ctx'

export default class Example extends SpruceSkillService<ISpruceSkillContext> {
	public getRandomTeammateNameFromLocation(location) {}
}
