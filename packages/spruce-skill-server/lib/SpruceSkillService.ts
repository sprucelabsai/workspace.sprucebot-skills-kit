export default class SpruceSkillService<
	SpruceSkillContext,
	SpruceSkillConfig = Record<string, any>
> {
	/**
	 * DO NOT MODIFY.
	 *
	 * This version is set in the base class SpruceSkillService and
	 * is used behind the scenes in skills kit.
	 */
	public readonly serviceVersion = 2
	protected ctx: SpruceSkillContext
	protected config?: SpruceSkillConfig

	public constructor(options: {
		ctx: SpruceSkillContext
		config?: SpruceSkillConfig
	}) {
		const { ctx, config } = options
		this.ctx = ctx
		this.config = config
	}
}
