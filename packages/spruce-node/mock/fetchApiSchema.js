process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const request = require('superagent')
const { introspectionQuery } = require('graphql')
const fs = require('fs')

request
	.post(process.env.API_HOST)
	.send({
		query: introspectionQuery
	})
	.then(result =>
		fs.writeFileSync(
			`${__dirname}/apiSchema.json`,
			JSON.stringify(result.body, null, 2)
		)
	)
	.catch(e => {
		console.log(e)
	})
