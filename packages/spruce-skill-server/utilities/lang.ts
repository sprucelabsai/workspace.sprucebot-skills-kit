import { SpruceSkillUtility } from '../index'
import { ISpruceContext } from '../interfaces/ctx'
import { lang } from '@sprucelabs/spruce-next-helpers'
import { ICoreLocation } from '@sprucelabs/spruce-types'

export default class Lang extends SpruceSkillUtility<ISpruceContext> {
	public constructor(options: any) {
		super(options)
		lang.configure(options.config.dir)
	}
	public getText(key: string, context: Record<string, any> = {}): string {
		return lang.getText(key, context)
	}
	public friendlyCurrency(cents: number, location: ICoreLocation): string {
		return lang.friendlyCurrency(cents, location)
	}
	public friendlyDuration(seconds: number, location: ICoreLocation): string {
		return lang.friendlyDuration(seconds, location)
	}
}
