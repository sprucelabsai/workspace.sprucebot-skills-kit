import { assert } from 'chai'
import Base from './Base'
import faker from 'faker'
import log from '../index'
import { LogLevel } from '../src/Log'

class LoggingTests extends Base {
	public setup() {
		it('Uses colors', () => this.useColors())
		it('Can have colors turned off', () => this.noColors())
	}

	public async before() {
		await super.before()
		log.setOptions({
			level: LogLevel.Debug
		})
	}

	public async useColors() {
		let wasLogged = false
		log.setOptions({
			useColors: true
		})
		log.setOptions({
			customAdapter: logMessage => {
				assert.isTrue(/\[32/.test(logMessage))
				wasLogged = true
			}
		})
		const message = faker.lorem.words()

		log.debug(message)
		assert.isTrue(wasLogged)
	}

	public async noColors() {
		log.setOptions({
			useColors: false
		})

		let wasLogged = false
		log.setOptions({
			customAdapter: logMessage => {
				assert.isFalse(/\[32/.test(logMessage))
				wasLogged = true
			}
		})
		const message = faker.lorem.words()

		log.debug(message)
		assert.isTrue(wasLogged)
	}
}

describe('LoggingTests', function Tests() {
	new LoggingTests()
})
