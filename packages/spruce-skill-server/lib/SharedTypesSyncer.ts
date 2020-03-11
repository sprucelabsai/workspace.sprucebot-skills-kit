import config from 'config'
import fs from 'fs'
import request from 'superagent'

export default class SharedTypesSyncer {
	public static async syncEventTypes(): Promise<void> {
		const response = await request
			.get(`${config.API_HOST}/api/2.0/skills/${config.ID}/types/events`)
			.set({
				'x-skill-api-key': config.API_KEY
			})

		if (response && response.text) {
			await this.writeFile(
				`${process.cwd()}/.spruce/interfaces/events-generated.ts`,
				response.text
			)
		}
	}

	private static writeFile(path: string, data: string): Promise<void> {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, err => {
				if (err) {
					return reject(err)
				} else {
					return resolve()
				}
			})
		})
	}
}
