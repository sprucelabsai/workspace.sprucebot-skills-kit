import { Location, SpruceSkillUtility } from '@sprucelabs/skill-server'
import { ISkillContext } from '../interfaces/ctx'

export default class Example extends SpruceSkillUtility<ISkillContext> {
	public generateSlug(location: Location): string {
		return location.name.replace(/\s/g, '').toLowerCase()
	}
}
