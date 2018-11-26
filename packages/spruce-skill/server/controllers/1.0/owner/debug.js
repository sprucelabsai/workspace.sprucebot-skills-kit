const config = require('config')

module.exports = router => {
	if (config.ENABLE_DEBUG_ROUTES) {
		/**
		 * @swagger
		 * definitions:
		 *   ExamplePostData:
		 *     type: object
		 *     properties:
		 *       name:
		 *         type: string
		 *       isHidden:
		 *         type: boolean
		 *       order:
		 *         type: number
		 */

		/**
		 * @swagger
		 * /api/1.0/owner/debug/example.json:
		 *   post:
		 *     tags: ['Debug']
		 *     summary: Debug - Example controller route
		 *     description: Debug - Example controller route with post body data
		 *     parameters:
		 *      - name: body
		 *        in: body
		 *        description: Debug route to trigger events
		 *        schema:
		 *          properties:
		 *            blahBlah:
		 *              type: string
		 *              description: The event name
		 *            someExampleStuff:
		 *              type: array
		 *              items:
		 *                $ref: '#/definitions/ExamplePostData'
		 *        required: true
		 *     consumes:
		 *       - application/json
		 *     produces:
		 *       - application/json
		 *     responses:
		 *       200:
		 *         description: success
		 *       500:
		 *         description: server error
		 */
		router.post('/api/1.0/owner/debug/example.json', async (ctx, next) => {
			log.debug('HIT')
			ctx.body = {
				status: 'success',
				dataSent: ctx.request.body
			}
			await next()
		})

		/**
		 * @swagger
		 * /api/1.0/owner/debug/triggerEvent.json:
		 *   post:
		 *     tags: ['Debug']
		 *     summary: Debug - Triggers an event
		 *     description: Debug - Triggers an event
		 *     parameters:
		 *      - name: body
		 *        in: body
		 *        description: Debug route to trigger events
		 *        schema:
		 *          properties:
		 *            event:
		 *              type: string
		 *              description: The event name
		 *            payload:
		 *              type: object
		 *              description: The event payload
		 *        required: true
		 *     consumes:
		 *       - application/json
		 *     produces:
		 *       - application/json
		 *     responses:
		 *       200:
		 *         description: success
		 *       500:
		 *         description: server error
		 */
		router.post('/api/1.0/owner/debug/triggerEvent.json', async (ctx, next) => {
			const locationId = ctx.auth.Location.id
			const event = ctx.request.body.event
			const payload = ctx.request.body.payload
			payload.sendToSelf = true
			const responses = await ctx.sb.emit(locationId, event, payload)

			ctx.body = { responses }
			await next()
		})
	}
}
