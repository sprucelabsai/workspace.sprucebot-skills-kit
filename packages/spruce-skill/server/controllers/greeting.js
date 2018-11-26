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
	router.get('/api/1.0/greeting.json', async (ctx, next) => {
		ctx.body = {
			'🌲🤖': 'Hey there! 👋'
		}
		await next()
	})
}
