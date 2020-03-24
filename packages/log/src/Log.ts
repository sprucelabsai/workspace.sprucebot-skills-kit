/* eslint-disable prefer-rest-params */
import { SpruceError } from '@sprucelabs/errors'
import Debug from 'debug'
const debug = Debug('@sprucelabs/log')

/**
 * Setting a log level causes all logs of that level and higher to be output. The ones below it are ignored / dropped.
 *
 * The log levels in order from lowest to highest:
 * - Trace
 * - Debug
 * - Log
 * - Info
 * - Warn
 * - Error
 * - Crit
 * - Fatal
 * - SuperInfo
 */
export enum LogLevel {
	/** Trace level logs the go beyond just normal debug messages. A silly log level. */
	Trace = 'trace',
	/** Debug messages used during development. */
	Debug = 'debug',
	/** Informational messages */
	Info = 'info',
	/** Something bad might have happened and it should be invesigated, but we can continue. */
	Warn = 'warn',
	/** Something bad happened, but we can continue or recover. */
	Error = 'error',
	/** Something critical happend that likely had unintended or fatal consequences */
	Crit = 'crit',
	/** Something happened and we must immediately stop */
	Fatal = 'fatal',
	/** Really important information that is ALWAYS logged */
	SuperInfo = 'superInfo'
}

interface ILogOptions {
	level?: LogLevel
	useColors?: boolean
	asJSON?: boolean
}

export class Log {
	// @ts-ignore WIP
	private useColors = true
	// @ts-ignore WIP
	private asJSON = false
	private level: LogLevel = LogLevel.Info

	private levels = {
		[LogLevel.Trace]: {
			i: 0,
			hex: '#404040',
			hexFallBack: 'gray',
			bgHex: null,
			bgHexFallBack: null
		},
		[LogLevel.Debug]: {
			i: 1,
			hex: '#009933',
			hexFallBack: 'green',
			bgHex: null,
			bgHexFallBack: null
		},
		[LogLevel.Info]: {
			i: 2,
			hex: '#0033cc',
			hexFallBack: 'cyan',
			bgHex: null,
			bgHexFallBack: null
		},
		[LogLevel.Warn]: {
			i: 3,
			hex: '#ff6600',
			hexFallBack: 'red',
			bgHex: null,
			bgHexFallBack: null
		},
		[LogLevel.Error]: {
			i: 4,
			hex: '#cc3300',
			hexFallBack: 'red',
			bgHex: null,
			bgHexFallBack: null
		},
		[LogLevel.Crit]: {
			i: 5,
			hex: '#cc3300',
			hexFallBack: 'red',
			bgHex: null,
			bgHexFallBack: null
		},
		[LogLevel.Fatal]: {
			i: 6,
			hex: '#cc3300',
			hexFallBack: 'red',
			bgHex: null,
			bgHexFallBack: null
		},
		[LogLevel.SuperInfo]: {
			i: 7,
			hex: '#0033cc',
			hexFallBack: 'cyan',
			bgHex: null,
			bgHexFallBack: null
		}
	}

	public constructor(options?: ILogOptions) {
		this.setOptions(options)
	}

	public trace(...args: any) {
		return this.handleLog({
			level: LogLevel.Trace,
			args
		})
	}
	public debug(...args: any) {
		return this.handleLog({
			level: LogLevel.Debug,
			args
		})
	}
	public info(...args: any) {
		return this.handleLog({
			level: LogLevel.Info,
			args
		})
	}
	public warn(...args: any) {
		return this.handleLog({
			level: LogLevel.Warn,
			args
		})
	}
	public error(...args: any) {
		return this.handleLog({
			level: LogLevel.Error,
			args
		})
	}
	public crit(...args: any) {
		return this.handleLog({
			level: LogLevel.Crit,
			args
		})
	}
	public fatal(...args: any) {
		return this.handleLog({
			level: LogLevel.Fatal,
			args
		})
	}
	public superInfo(...args: any) {
		return this.handleLog({
			level: LogLevel.SuperInfo,
			args
		})
	}

	public setOptions(options?: ILogOptions) {
		if (!options) {
			// Nothing to set
			return
		}

		if (typeof options.asJSON === 'boolean') {
			this.asJSON = options.asJSON
		}

		if (typeof options.useColors === 'boolean') {
			this.useColors = options.useColors
		}

		if (options.level) {
			this.setLevel(options.level)
		}
	}

	private setLevel(level: LogLevel) {
		switch (level) {
			case LogLevel.Trace:
			case LogLevel.Debug:
			case LogLevel.Info:
			case LogLevel.Warn:
			case LogLevel.Error:
			case LogLevel.Crit:
			case LogLevel.Fatal:
			case LogLevel.SuperInfo:
				this.level = level
				break
			default:
				// An invalid level was passed
				throw new SpruceError()
		}
	}

	private handleLog(options: { level: LogLevel; args: any }) {
		const { level, args } = options
		if (
			this.levels[level] &&
			this.levels[level].i >= this.levels[this.level].i
		) {
			console.log(level)
			console.log(args)
		} else {
			debug('Log suppressed because log level was not met', {
				level,
				args
			})
		}
	}
}
