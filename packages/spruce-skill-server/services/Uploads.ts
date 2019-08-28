import request from 'superagent'
import { ISpruceContext } from '../interfaces/ctx'
import SpruceSkillService from '../lib/SpruceSkillService'

export abstract class AbstractSpruceSkillUploadAdapter {
	public abstract init(options: {
		bucket: string
		accessKeyId: string
		secretAccessKey: string
	}): void
	public abstract async upload(
		data: any,
		options?: Record<string, any>
	): Promise<string>
}

interface ICacheConfig {
	adapter?: string
	options?: {
		bucket: string
		accessKeyId: string
		secretAccessKey: string
	}
}

interface IFile {
	path: string
	name: string
	type: string
}

export default class Uploads extends SpruceSkillService<ISpruceContext> {
	private uploader!: AbstractSpruceSkillUploadAdapter

	public constructor(options: { ctx: ISpruceContext; config?: ICacheConfig }) {
		super(options)
		this.init(options.config)
	}

	public init(config?: ICacheConfig): void {
		if (!config || !config.adapter) {
			log.info('Uploads: DISABLED. Configuration for uploads is invalid', {
				options: config
			})
			return
		}

		if (
			!config.options ||
			!config.options.bucket ||
			!config.options.accessKeyId ||
			!config.options.secretAccessKey
		) {
			log.info('Uploads: DISABLED. Missing required config options.', {
				options: config
			})
			return
		}

		this.setAdapter({
			adapter: config.adapter,
			bucket: config.options.bucket,
			accessKeyId: config.options.accessKeyId,
			secretAccessKey: config.options.secretAccessKey
		})
	}

	public async deleteFileItems(options: {
		fileItemIds: string[]
	}): Promise<void> {
		const { fileItemIds } = options
		if (!fileItemIds) {
			log.warn('Missing "fileItemIds"')
			throw new Error('MISSING_PARAMETERS')
		}

		const fileItemIdsStr = fileItemIds.map(fid => `"${fid}"`)

		const query = `mutation {
			deleteFileItems (
				input: {
					fileItemIds: [${fileItemIdsStr.join(',')}]
				}
			) {
				status
			}
		}`

		const result = await this.ctx.sb.query(query)

		return result
	}

	public async uploadImages(options: {
		files: IFile[]
		acl: string
		imageSizes: string[]
		refId?: string
		organizationId?: string
		locationId?: string
		teammateId?: string
		guestId?: string
	}): Promise<void> {
		try {
			if (process.env.API_SSL_ALLOW_SELF_SIGNED === 'true') {
				process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
			}

			const {
				files,
				acl,
				imageSizes,
				refId,
				organizationId,
				locationId,
				teammateId,
				guestId
			} = options

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
	}

	public async upload(
		data: any,
		options: Record<string, any> = {}
	): Promise<string> {
		if (!this.uploader) {
			throw new Error(
				'No uploader configured. see https://github.com/sprucelabsai/sprucebot-skills-kit/blob/dev/docs/uploads.md instructions'
			)
		}

		return this.uploader.upload(data, options)
	}

	private setAdapter(options: {
		adapter: string
		bucket: string
		accessKeyId: string
		secretAccessKey: string
	}): void {
		const { adapter, bucket, accessKeyId, secretAccessKey } = options
		if (adapter) {
			const filename = `${adapter.charAt(0).toUpperCase()}${adapter.slice(1)}`
			try {
				const adapter = require(`./uploads/${filename}`).default
				this.uploader = new adapter({
					bucket,
					accessKeyId,
					secretAccessKey
				})
			} catch (e) {
				log.crit(`UploadService: Unable to load adapter: ${filename}`)
			}
		}
	}
}
