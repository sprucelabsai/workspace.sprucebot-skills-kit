import config from 'config'
import nock from 'nock'

export default () => {
	nock.disableNetConnect()
	return nock(config.SERVER_HOST).defaultReplyHeaders({
		'Access-Control-Allow-Origin': '*'
	})
}
