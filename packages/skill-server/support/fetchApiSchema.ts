process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import request from 'superagent'
import { introspectionQuery } from 'graphql'
import fs from 'fs'
import get from 'ts-get'

request
	.post(get(process, p => p.env.API_HOST, 'missing p.env.API_HOST'))
	.send({
		query: introspectionQuery
	})
	.then(result =>
		fs.writeFileSync(
			`${__dirname}/../../support/apiSchema.json`,
			JSON.stringify(result.body, null, 2)
		)
	)
	.catch(err => {
		console.log(err)
	})
