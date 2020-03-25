const config = require('config')

module.exports = router => {
	/**
	 * @swagger
	 * /api/1.0/upload.json:
	 *   put:
	 *     tags: ['Public']
	 *     summary: Uploads a file
	 *     description: Uploads a file
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
	router.put('/api/1.0/upload.json', async (ctx, next) => {
		if (config.DEV_MODE) {
			log.warn(
				'server/controllers/upload.js : This endpoint should be locked down'
			)
		} else {
			log.warn(
				'Your upload method requires attention. The default upload method is only meant as an example and is only available when DEV_MODE=true.'
			)
			throw new Error('NOT_IMPLEMENTED')
		}

		// TODO: You should implement auth validation here and ensure the user has permission to upload

		let files = []

		// This normalizes files and ignores the multipart key, just putting all files into an array
		Object.keys(ctx.request.files).forEach(x => {
			files = files.concat(ctx.request.files[x])
		})

		// Validate files (only allow images)
		files.forEach(file => {
			// Each file consists of:
			// file.type - The mime type of the file being uploaded
			// file.name - The name that was sent by the client for this file
			// file.path - The path to the temporary file
			// file.size - The size of the file in bytes

			if (!/^image/.test(file.type)) {
				throw new Error('INVALID_FILE_FORMAT')
			}
		})

		// Use core service to upload images. Returns an array of FileItems
		const fileItems = await ctx.services.uploads.uploadImages({
			files
			// acl: 'private', // Optional. Valid options are: "private" and "public-read". Default is "private" meaning you must make a request (see below) to get a temporary download URL when accessing this file.
			// imageSizes: [50, '50@2x', 300, '300@2x], // Optional. This is an array of additional image sizes that should be created
			// refId: '67fbafe1-15c4-4b60-9520-c0c80644081b', // Optional. If you'd like to associate this file with a model within this skill you can add the refId and then create an association to the FileItem
			// organizationId: '297a4375-f84d-4729-9e86-9335c187dcc5', // Optional. You can associate this file to an organization
			// locationId: 'ef19602e-8bac-4465-8fa2-d4c301a971ed', // Optional. You can associate this file to a location
			// teammateId: 'e32c9287-0a45-46bd-a858-22059a0192b2', // Optional. You can associate this file to a teammate
			// guestId: '720c9dd7-e950-4d87-878b-210dadef8a08', // Optional. You can associate this file to a guest
		})

		const fileItemIds = fileItems.map(fileItem => `"${fileItem.id}"`)
		const query = `
		{
			FileItems (fileItemIds: [${fileItemIds.join(',')}]) {
				id
				width
				height
				urls {
					type
					width
					height
					signedUrl
					sizeBytes
				}
			}
		}
		`
		const queryResult = await ctx.sb.query(query)

		ctx.body = {
			fileItems,
			queryResult
		}
		await next()
	})
}
