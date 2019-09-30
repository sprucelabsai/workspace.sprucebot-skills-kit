import { SpruceSkillUtility } from '../index'
import { ISpruceContext } from '../interfaces/ctx'
import { lang } from '@sprucelabs/spruce-next-helpers'

export default class Lang extends SpruceSkillUtility<ISpruceContext> {
	public constructor(options: any) {
		debugger
		super(options)
		lang.configure(options.config.dir)
	}
	public getText(key: string, context: Record<string, any> = {}): string {
		return lang.getText(key, context)
	}
}
