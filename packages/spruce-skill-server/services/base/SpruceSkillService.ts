export default class SpruceSkillService<SpruceSkillContext> {
	protected ctx: SpruceSkillContext

	public constructor(options: { ctx: SpruceSkillContext }) {
		const { ctx } = options
		this.ctx = ctx
	}
}
