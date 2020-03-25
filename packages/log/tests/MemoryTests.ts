import { assert } from 'chai'
import Base from './Base'
import faker from 'faker'
import { Log, LogLevel } from '../src/Log'

class LoggingTests extends Base {
	public setup() {
		it.skip('Does not grow memory', () => this.lotsOfLogs())
	}

	public async lotsOfLogs() {
		const log = new Log({ level: LogLevel.Debug })
		const loopCount = 100
		const logCount = 10000
		const wordCount = 1000

		console.log('starting heap usage', `${this.heapUsedMB()}MB`)

		for (let i = 0; i < logCount; i += 1) {
			log.debug(faker.lorem.words(wordCount))

			if (i % loopCount === 0) {
				const heapUsed = this.heapUsedMB()
				console.log(`heap usage at ${i}`, `${heapUsed}MB`)
				assert.isBelow(heapUsed, 100)
			}
		}
	}

	private heapUsedMB() {
		return process.memoryUsage().heapUsed / 1024 / 1024
	}
}

describe('MemoryTests', function Tests() {
	this.timeout(3000000)
	new LoggingTests()
})
