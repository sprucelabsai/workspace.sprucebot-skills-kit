import { assert } from 'chai'
import Base from './Base'
import faker from 'faker'
import log from '../index'
import { LogLevel } from '../src/Log'

class LogLevelTests extends Base {
	private customLevels = {
		levels: {
			trace: 7,
			debug: 6,
			info: 5,
			warn: 4,
			error: 3,
			crit: 2,
			fatal: 1,
			superInfo: 0
		},
		colors: {
			trace: 'gray',
			debug: 'green',
			info: 'cyan',
			warn: 'yellow',
			error: 'red',
			crit: 'red',
			fatal: 'red',
			superInfo: 'cyan'
		}
	}

	public setup() {
		it('Handle log=trace, level=trace', () =>
			this.handleLog(LogLevel.Trace, LogLevel.Trace))
		it('Handle log=trace, level=debug', () =>
			this.handleLog(LogLevel.Trace, LogLevel.Debug))
		it('Handle log=trace, level=info', () =>
			this.handleLog(LogLevel.Trace, LogLevel.Info))
		it('Handle log=trace, level=warn', () =>
			this.handleLog(LogLevel.Trace, LogLevel.Warn))
		it('Handle log=trace, level=error', () =>
			this.handleLog(LogLevel.Trace, LogLevel.Error))
		it('Handle log=trace, level=crit', () =>
			this.handleLog(LogLevel.Trace, LogLevel.Crit))
		it('Handle log=trace, level=fatal', () =>
			this.handleLog(LogLevel.Trace, LogLevel.Fatal))
		it('Handle log=trace, level=superInfo', () =>
			this.handleLog(LogLevel.Trace, LogLevel.SuperInfo))

		it('Handle log=debug, level=trace', () =>
			this.handleLog(LogLevel.Debug, LogLevel.Trace))
		it('Handle log=debug, level=debug', () =>
			this.handleLog(LogLevel.Debug, LogLevel.Debug))
		it('Handle log=debug, level=info', () =>
			this.handleLog(LogLevel.Debug, LogLevel.Info))
		it('Handle log=debug, level=warn', () =>
			this.handleLog(LogLevel.Debug, LogLevel.Warn))
		it('Handle log=debug, level=error', () =>
			this.handleLog(LogLevel.Debug, LogLevel.Error))
		it('Handle log=debug, level=crit', () =>
			this.handleLog(LogLevel.Debug, LogLevel.Crit))
		it('Handle log=debug, level=fatal', () =>
			this.handleLog(LogLevel.Debug, LogLevel.Fatal))
		it('Handle log=debug, level=superInfo', () =>
			this.handleLog(LogLevel.Debug, LogLevel.SuperInfo))

		it('Handle log=info, level=trace', () =>
			this.handleLog(LogLevel.Info, LogLevel.Trace))
		it('Handle log=info, level=debug', () =>
			this.handleLog(LogLevel.Info, LogLevel.Debug))
		it('Handle log=info, level=info', () =>
			this.handleLog(LogLevel.Info, LogLevel.Info))
		it('Handle log=info, level=warn', () =>
			this.handleLog(LogLevel.Info, LogLevel.Warn))
		it('Handle log=info, level=error', () =>
			this.handleLog(LogLevel.Info, LogLevel.Error))
		it('Handle log=info, level=crit', () =>
			this.handleLog(LogLevel.Info, LogLevel.Crit))
		it('Handle log=info, level=fatal', () =>
			this.handleLog(LogLevel.Info, LogLevel.Fatal))
		it('Handle log=info, level=superInfo', () =>
			this.handleLog(LogLevel.Info, LogLevel.SuperInfo))

		it('Handle log=warn, level=trace', () =>
			this.handleLog(LogLevel.Warn, LogLevel.Trace))
		it('Handle log=warn, level=debug', () =>
			this.handleLog(LogLevel.Warn, LogLevel.Debug))
		it('Handle log=warn, level=info', () =>
			this.handleLog(LogLevel.Warn, LogLevel.Info))
		it('Handle log=warn, level=warn', () =>
			this.handleLog(LogLevel.Warn, LogLevel.Warn))
		it('Handle log=warn, level=error', () =>
			this.handleLog(LogLevel.Warn, LogLevel.Error))
		it('Handle log=warn, level=crit', () =>
			this.handleLog(LogLevel.Warn, LogLevel.Crit))
		it('Handle log=warn, level=fatal', () =>
			this.handleLog(LogLevel.Warn, LogLevel.Fatal))
		it('Handle log=warn, level=superInfo', () =>
			this.handleLog(LogLevel.Warn, LogLevel.SuperInfo))

		it('Handle log=error, level=trace', () =>
			this.handleLog(LogLevel.Error, LogLevel.Trace))
		it('Handle log=error, level=debug', () =>
			this.handleLog(LogLevel.Error, LogLevel.Debug))
		it('Handle log=error, level=info', () =>
			this.handleLog(LogLevel.Error, LogLevel.Info))
		it('Handle log=error, level=warn', () =>
			this.handleLog(LogLevel.Error, LogLevel.Warn))
		it('Handle log=error, level=error', () =>
			this.handleLog(LogLevel.Error, LogLevel.Error))
		it('Handle log=error, level=crit', () =>
			this.handleLog(LogLevel.Error, LogLevel.Crit))
		it('Handle log=error, level=fatal', () =>
			this.handleLog(LogLevel.Error, LogLevel.Fatal))
		it('Handle log=error, level=superInfo', () =>
			this.handleLog(LogLevel.Error, LogLevel.SuperInfo))

		it('Handle log=crit, level=trace', () =>
			this.handleLog(LogLevel.Crit, LogLevel.Trace))
		it('Handle log=crit, level=debug', () =>
			this.handleLog(LogLevel.Crit, LogLevel.Debug))
		it('Handle log=crit, level=info', () =>
			this.handleLog(LogLevel.Crit, LogLevel.Info))
		it('Handle log=crit, level=warn', () =>
			this.handleLog(LogLevel.Crit, LogLevel.Warn))
		it('Handle log=crit, level=error', () =>
			this.handleLog(LogLevel.Crit, LogLevel.Error))
		it('Handle log=crit, level=crit', () =>
			this.handleLog(LogLevel.Crit, LogLevel.Crit))
		it('Handle log=crit, level=fatal', () =>
			this.handleLog(LogLevel.Crit, LogLevel.Fatal))
		it('Handle log=crit, level=superInfo', () =>
			this.handleLog(LogLevel.Crit, LogLevel.SuperInfo))

		it('Handle log=fatal, level=trace', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.Trace))
		it('Handle log=fatal, level=debug', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.Debug))
		it('Handle log=fatal, level=info', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.Info))
		it('Handle log=fatal, level=warn', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.Warn))
		it('Handle log=fatal, level=error', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.Error))
		it('Handle log=fatal, level=crit', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.Crit))
		it('Handle log=fatal, level=fatal', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.Fatal))
		it('Handle log=fatal, level=superInfo', () =>
			this.handleLog(LogLevel.Fatal, LogLevel.SuperInfo))

		it('Handle log=superInfo, level=trace', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.Trace))
		it('Handle log=superInfo, level=debug', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.Debug))
		it('Handle log=superInfo, level=info', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.Info))
		it('Handle log=superInfo, level=warn', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.Warn))
		it('Handle log=superInfo, level=error', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.Error))
		it('Handle log=superInfo, level=crit', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.Crit))
		it('Handle log=superInfo, level=fatal', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.Fatal))
		it('Handle log=superInfo, level=superInfo', () =>
			this.handleLog(LogLevel.SuperInfo, LogLevel.SuperInfo))
	}

	public async before() {
		await super.before()
		log.setOptions({
			level: LogLevel.Trace,
			useColors: false
		})
	}

	public async handleLog(level: LogLevel, logLevel: LogLevel) {
		const message = faker.lorem.words()
		const shouldLog =
			this.customLevels.levels[logLevel] >= this.customLevels.levels[level]
		let wasLogged = false

		log.setOptions({
			level: logLevel,
			useColors: false
		})

		log.setOptions({
			customAdapter: logMessage => {
				wasLogged = true
				if (!shouldLog) {
					throw new Error(
						`Level ${level} should not log for log level ${logLevel}`
					)
				}
				const levelRegexp = new RegExp(level, 'i')
				assert.isTrue(levelRegexp.test(logMessage))
				const messageRegexp = new RegExp(message, 'i')
				assert.isTrue(messageRegexp.test(message))
			}
		})

		log[level](message)
		assert.equal(wasLogged, shouldLog)
	}
}

describe('LogLevelTests', function Tests() {
	new LogLevelTests()
})
