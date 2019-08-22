export default class SpruceSkillService<SpruceSkillContext> {
	public serviceVersion = 2
	protected ctx: SpruceSkillContext

	public constructor(options: { ctx: SpruceSkillContext }) {
		const { ctx } = options
		this.ctx = ctx
	}
}
