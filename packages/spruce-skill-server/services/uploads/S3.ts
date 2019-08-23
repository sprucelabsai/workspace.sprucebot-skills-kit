import aws from 'aws-sdk'
import { AbstractSpruceSkillUploadAdapter } from '../Uploads'

export default class S3 implements AbstractSpruceSkillUploadAdapter {
	private s3!: aws.S3
	private bucket!: string

	public constructor(options: {
		bucket: string
		accessKeyId: string
		secretAccessKey: string
	}) {
		this.init(options)
	}

	public init(options: {
		bucket: string
		accessKeyId: string
		secretAccessKey: string
	}): void {
		const { bucket, accessKeyId, secretAccessKey } = options
		this.s3 = new aws.S3({ accessKeyId, secretAccessKey })
		this.bucket = bucket
	}

	public upload(data: any, options: Record<string, any> = {}): Promise<string> {
		return new Promise((resolve, reject) => {
			const s3options: aws.S3.PutObjectRequest = {
				Body: data,
				Bucket: this.bucket,
				Key: options.Key,
				...options
			}

			this.s3.putObject(s3options, (err /*, data: aws.S3.PutObjectOutput*/) => {
				if (err) {
					reject(err)
					return
				}
				resolve(`https://s3.amazonaws.com/${this.bucket}/${s3options.Key}`)
				return
			})
		})
	}
}
