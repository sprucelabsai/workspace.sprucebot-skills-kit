// @flow
const globby = require('globby')
const fs = require('fs')

module.exports = function generateSwaggerDocs() {
	return new Promise(async (resolve, reject) => {
		const currentPath = `${__dirname}/../`
		log.debug('Generating Swagger Documentation')

		try {
			// Generate the docs
			const files = await globby(currentPath + '**/*.js')

			const swaggerJSDoc = require('swagger-jsdoc') // eslint-disable-line
			const title = process.env.SWAGGER_TITLE || ''
			const version = process.env.SWAGGER_VERSION || '1.0.0'
			const options = {
				swaggerDefinition: {
					info: {
						title,
						version
					},
					securityDefinitions: {
						JWT: {
							// description: '',
							type: 'apiKey',
							name: 'Authorization',
							in: 'header'
						}
					},
					security: [
						{
							JWT: []
						}
					]
				},
				apis: files // Path to the API docs
			}

			// Initialize swagger-jsdoc -> returns validated swagger spec in json format
			const swaggerSpec = swaggerJSDoc(options)
			fs.writeFile(
				currentPath + 'static/api-docs.json',
				JSON.stringify(swaggerSpec),
				() => {
					log.info(
						'Created swagger spec doc at: ' +
							currentPath +
							'swagger/api-docs.json'
					)
					return resolve()
				}
			)
		} catch (e) {
			return reject(e)
		}
	})
}
