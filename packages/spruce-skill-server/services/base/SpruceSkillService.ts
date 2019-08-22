export default class SpruceSkillService<SpruceSkillContext> {
	/**
	 * Ignore this.
	 *
	 * This version is set in the base class SpruceSkillService and
	 * is used behind the scenes in skills kit.
	 */
	public readonly serviceVersion = 2
	protected ctx: SpruceSkillContext

	public constructor(options: { ctx: SpruceSkillContext }) {
		const { ctx } = options
		this.ctx = ctx
	}
}
