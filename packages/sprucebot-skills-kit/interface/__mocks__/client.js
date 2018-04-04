import config from 'config'
import nock from 'nock'

export default () => {
	nock.disableNetConnect()
	return nock(config.get('SERVER_HOST')).defaultReplyHeaders({
		'Access-Control-Allow-Origin': '*'
	})
}
