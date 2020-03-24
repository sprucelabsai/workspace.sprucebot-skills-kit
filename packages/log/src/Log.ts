/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/camelcase */
import { SpruceError } from '@sprucelabs/errors'

const CLIENT =
	typeof window !== 'undefined' || typeof __webpack_require__ === 'function'

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

export enum TerminalColors {
	Reset = '\x1b[0m',
	Bright = '\x1b[1m',
	Dim = '\x1b[2m',
	Underscore = '\x1b[4m',
	Blink = '\x1b[5m',
	Reverse = '\x1b[7m',
	Hidden = '\x1b[8m',
	FontBlack = '\x1b[30m',
	FontRed = '\x1b[31m',
	FontGreen = '\x1b[32m',
	FontYellow = '\x1b[33m',
	FontBlue = '\x1b[34m',
	FontMagenta = '\x1b[35m',
	FontCyan = '\x1b[36m',
	FontWhite = '\x1b[37m',
	BackgroundBlack = '\x1b[40m',
	BackgroundRed = '\x1b[41m',
	BackgroundGreen = '\x1b[42m',
	BackgroundYellow = '\x1b[43m',
	BackgroundBlue = '\x1b[44m',
	BackgroundMagenta = '\x1b[45m',
	BackgroundCyan = '\x1b[46m',
	BackgroundWhite = '\x1b[47m'
}

interface ILogOptions {
	/** The log level */
	level?: LogLevel
	/** Whether to log using colors. Default true */
	useColors?: boolean
	/** Whether to log as JSON. Default false */
	asJSON?: boolean
	/** A custom adapter that will be called with log messages. If not set, console.log is used */
	customAdapter?: LogAdapter
	/** Whether to show file path / line numbers for all logs instead of just debug and trace. Enabling this will incur a slight performance penalty.*/
	showLineNumbersForAll?: boolean
}

interface ICaller {
	stack?: string
	fullFilePath?: string
	relativeFilePath?: string
}

export type LogAdapter = (message?: any, ...optionalParams: any[]) => void

export class Log {
	private useColors = true
	private asJSON = false
	private showLineNumbersForAll = false
	private level: LogLevel = LogLevel.Info
	private customAdapter?: LogAdapter
	private consoleAdapter!: LogAdapter

	private levels = {
		[LogLevel.Trace]: {
			i: 0,
			hex: '#404040',
			bgHex: null,
			terminalColor: TerminalColors.Dim
		},
		[LogLevel.Debug]: {
			i: 1,
			hex: '#009933',
			bgHex: null,
			terminalColor: TerminalColors.FontGreen
		},
		[LogLevel.Info]: {
			i: 2,
			hex: '#0033cc',
			bgHex: null,
			terminalColor: TerminalColors.FontCyan
		},
		[LogLevel.Warn]: {
			i: 3,
			hex: '#ff6600',
			bgHex: null,
			terminalColor: TerminalColors.FontRed
		},
		[LogLevel.Error]: {
			i: 4,
			hex: '#cc3300',
			bgHex: null,
			terminalColor: TerminalColors.FontRed
		},
		[LogLevel.Crit]: {
			i: 5,
			hex: '#cc3300',
			bgHex: null,
			terminalColor: TerminalColors.FontRed
		},
		[LogLevel.Fatal]: {
			i: 6,
			hex: '#cc3300',
			bgHex: null,
			terminalColor: TerminalColors.FontRed
		},
		[LogLevel.SuperInfo]: {
			i: 7,
			hex: '#0033cc',
			bgHex: null,
			terminalColor: TerminalColors.FontCyan
		}
	}

	public constructor(options?: ILogOptions) {
		this.setOptions(options)
		this.setConsoleAdapter()
	}

	/** Trace level logs the go beyond just normal debug messages. A silly log level. */
	public trace(...args: any) {
		return this.handleLog({
			level: LogLevel.Trace,
			args
		})
	}
	/** Debug messages used during development. */
	public debug(...args: any) {
		return this.handleLog({
			level: LogLevel.Debug,
			args
		})
	}
	/** Informational messages */
	public info(...args: any) {
		return this.handleLog({
			level: LogLevel.Info,
			args
		})
	}
	/** Something bad might have happened and it should be invesigated, but we can continue. */
	public warn(...args: any) {
		return this.handleLog({
			level: LogLevel.Warn,
			args
		})
	}
	/** Something bad happened, but we can continue or recover. */
	public error(...args: any) {
		return this.handleLog({
			level: LogLevel.Error,
			args
		})
	}
	/** Something critical happend that likely had unintended or fatal consequences */
	public crit(...args: any) {
		return this.handleLog({
			level: LogLevel.Crit,
			args
		})
	}
	/** Something happened and we must immediately stop */
	public fatal(...args: any) {
		return this.handleLog({
			level: LogLevel.Fatal,
			args
		})
	}
	/** Really important information that is ALWAYS logged */
	public superInfo(...args: any) {
		return this.handleLog({
			level: LogLevel.SuperInfo,
			args
		})
	}

	public timerStart() {
		return process.hrtime()
	}

	public timerEnd(timeStart: [number, number]) {
		const elapsedHrTime = process.hrtime(timeStart)
		const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6
		return elapsedTimeInMs
	}

	/** Set logger options */
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

		if (options.customAdapter) {
			this.customAdapter = options.customAdapter
		}

		if (typeof options.showLineNumbersForAll === 'boolean') {
			this.showLineNumbersForAll = options.showLineNumbersForAll
		}
	}

	private getCaller(): ICaller {
		const stack = new Error().stack
		const caller: ICaller = {
			stack
		}
		if (stack) {
			const lines = stack.split('\n')
			if (lines && lines[4]) {
				caller.fullFilePath = lines[4]
				const matches = lines[4].match(/\((.*)\)/)
				if (matches && matches[1]) {
					if (typeof process !== 'undefined') {
						// return matches[1].replace(process.cwd(), '')
						caller.relativeFilePath = matches[1].replace(process.cwd(), '')
					}

					caller.relativeFilePath = matches[1]
				}
			}
		}

		return caller
	}

	/** Set the log level */
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
				this.debugLog(`Log level not set. Invalid log level: ${level}`)
		}
	}

	private handleLog(options: { level: LogLevel; args: any }) {
		const { level, args } = options
		if (
			this.levels[level] &&
			this.levels[level].i >= this.levels[this.level].i
		) {
			const now = this.getDatetimeString()
			let callerStr = ''
			if (
				this.showLineNumbersForAll ||
				this.levels[level].i <= this.levels[LogLevel.Debug].i
			) {
				// Show the caller function
				const caller = this.getCaller()
				callerStr = caller.relativeFilePath
					? ` | ${caller.relativeFilePath}`
					: ''
			}
			const rawAboutStr = `(${level.toUpperCase()} | ${now}${callerStr}): `

			this.writeLog(rawAboutStr)
			args.forEach(arg => {
				if (typeof arg === 'string') {
					this.writeLog(this.colorize({ str: arg, level }))
				} else {
					const str = JSON.stringify(arg, this.replaceErrors)
					this.writeLog(this.colorize({ str, level }))
				}
			})
		}
	}

	private colorize(options: { level: LogLevel; str: string }) {
		const { level, str } = options
		if (!this.useColors) {
			return str
		}
		let colorizedStr: string | string[] = str
		if (CLIENT) {
			let style = ''
			if (this.levels[level].bgHex) {
				style += `background: ${this.levels[level].bgHex};`
			}
			if (this.levels[level].hex) {
				style += `color: ${this.levels[level].hex};`
			}

			colorizedStr = [`%c${str}`, style]
		} else {
			colorizedStr = `${this.levels[level].terminalColor}${str}${TerminalColors.Reset}`
		}
		return colorizedStr
	}

	private writeLog(thingToWrite: any) {
		const adapter = this.getAdapter()
		adapter(thingToWrite)
	}

	private getDatetimeString() {
		const now = new Date()
		const year = now.getFullYear()
		const month = now.getMonth() + 1
		const day = now.getDate()
		const hour = now.getHours()
		const minute = now.getMinutes()
		const second = now.getSeconds()
		let dayStr = day.toString()
		let hourStr = hour.toString()
		let minuteStr = minute.toString()
		let secondStr = second.toString()
		let monthStr = month.toString()

		if (month < 10) {
			monthStr = '0' + month
		}
		if (day < 10) {
			dayStr = '0' + day
		}
		if (hour < 10) {
			hourStr = '0' + hour
		}
		if (minute < 10) {
			minuteStr = '0' + minute
		}
		if (second < 10) {
			secondStr = '0' + second
		}
		const millisecond = now.getMilliseconds()
		const nowStr = `${year}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}:${secondStr}:${millisecond}`

		return nowStr
	}

	private getAdapter(): LogAdapter {
		if (this.customAdapter) {
			return this.customAdapter
		}

		return this.consoleAdapter
	}

	private setConsoleAdapter() {
		let adapter = () => {}
		if (typeof console !== 'undefined') {
			if (CLIENT) {
				adapter = console.log.bind(window.console)
			} else {
				adapter = console.log
			}
		}

		this.consoleAdapter = adapter
	}

	private replaceErrors(key: string, value: any) {
		if (value instanceof Error) {
			const error: Record<string, any> = {}

			Object.getOwnPropertyNames(value).forEach(function(key) {
				if (key === 'stack') {
					error[key] = value.stack && value.stack.split('\n')
				} else {
					// @ts-ignore
					error[key] = value[key]
				}
			})

			return error
		}

		return value
	}

	private debugLog(msg: string) {
		const namespace = '@sprucelabs/log'
		const adapter = this.getAdapter()
		const fullMsg = `${namespace} | ${msg}`

		if (CLIENT && typeof localStorage !== 'undefined') {
			// eslint-disable-next-line no-undef
			const lsDebug = localStorage.getItem('debug')
			if (lsDebug && lsDebug.indexOf(namespace)) {
				adapter(fullMsg)
			}
		} else if (
			typeof process !== 'undefined' &&
			process.env.DEBUG &&
			process.env.DEBUG.indexOf(namespace) > -1
		) {
			adapter(fullMsg)
		}
	}
}
