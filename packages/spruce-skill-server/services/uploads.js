const request = require('superagent')
module.exports = {
	uploader: null,
	async init({ uploader, options = {} } = {}) {
		if (uploader) {
			this.uploader = require(uploader)
			this.uploader.init(options)
		}
	},

	async uploadImages({
		files,
		acl,
		imageSizes,
		refId,
		organizationId,
		locationId,
		teammateId,
		guestId,
		filename
	}) {
		const strImageSizes = imageSizes ? imageSizes.join(',') : []
		const req = request
			.put(`${process.env.API_HOST}/api/2.0/skills/${process.env.ID}/files`)
			.set({
				'x-skill-api-key': process.env.API_KEY
			})
			.field('imageSizes', strImageSizes)
			.field('refId', refId)
			.field('organizationId', organizationId)
			.field('locationId', locationId)
			.field('teammateId', teammateId)
			.field('guestId', guestId)

		files.forEach(file => {
			req.attach('image', file, { filename })
		})

		const saveResult = await req

		return saveResult
	},

	async upload(data, options = {}) {
		if (!this.uploader) {
			throw new Error(
				'No uploader configured. see https://github.com/sprucelabsai/sprucebot-skills-kit/blob/dev/docs/uploads.md instructions'
			)
		}

		return this.uploader.upload(data, options)
	}
}
