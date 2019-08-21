import { ISpruceSkillContext } from 'server/types/ctx'
import { User } from 'server/models/User'

module.exports = router => {
	/**
	 * @swagger
	 * /api/1.0/greeting.json:
	 *   get:
	 *     tags: ['Public']
	 *     summary: Public - Shows a greeting
	 *     description: Public - Shows a greeting
	 *     consumes:
	 *       - application/x-www-form-urlencoded
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: success
	 *       500:
	 *         description: server error
	 */
	router.get(
		'/api/1.0/greeting.json',
		async (ctx: ISpruceSkillContext, next) => {
			const u = await ctx.db.models.User.findOne()

			ctx.body = {
				u,
				'🌲🤖': 'Hey there! 👋'
			}
			await next()
		}
	)
}
