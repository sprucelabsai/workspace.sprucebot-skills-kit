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
		guestId
	}) {
		try {
			if (process.env.API_SSL_ALLOW_SELF_SIGNED === 'true') {
				process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
			}
			const strImageSizes = imageSizes ? imageSizes.join(',') : []
			const req = request
				.put(`${process.env.API_HOST}/api/2.0/skills/${process.env.ID}/files`)
				.set({
					'x-skill-api-key': process.env.API_KEY
				})
				.type('form')
				.field('imageSizes', strImageSizes)

			req.field('acl', acl || 'private')

			if (refId) {
				req.field('refId', refId)
			}

			if (organizationId) {
				req.field('organizationId', organizationId)
			}
			if (locationId) {
				req.field('locationId', locationId)
			}
			if (teammateId) {
				req.field('teammateId', teammateId)
			}
			if (guestId) {
				req.field('guestId', guestId)
			}

			files.forEach(file => {
				req.attach('image', file.path, {
					filename: file.name,
					contentType: file.type
				})
			})

			const saveResult = await req

			return saveResult.body
		} catch (e) {
			log.crit(e)
			throw e
		}
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
