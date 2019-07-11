// eslint-disable-next-line
const { transports, format } = require('winston')

/*
 * OVERRIDE LOGGING
 * You can override where logs are sent as well as how they are formatted.
 *
 * Under the hood we use winstonjs logging (https://github.com/winstonjs/winston)
 * Examples: https://github.com/winstonjs/winston/tree/master/examples
 */

/*
 * See the formatting documentation here: https://github.com/winstonjs/winston#formats
 */
module.exports.customFormatters = function customFormatters() {
	// Return nothing to keep the default formatters
	return

	// Remove the previous "return" line to create your own custom formatters
	/*
	const customFormatters = [
		format.colorize({ all: true }),
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.splat(),
		format.printf(info => {
			// Available data passed through to custom formatter. Note that SOME OF THESE ITEMS MAY NOT BE DEFINED.
			// The only info items guarenteed to be set are "message" and "level"
			//
			// info.message - This is a string that has the log message(s). If an object was passed as any log argument it will all be stringified into info.message
			// info.level - The log level for the message. Levels are (lowest -> highest): trace, debug, info, warn, error, crit, fatal, superInfo
			// info.timestamp - The timestamp (see above for formatting)
			// info.thingType - The type of the item being logged
			// info.callerFunc - Detailed info on where this log was called from if useTrace=true. This combines the source path, filename, line number, and column. It will also take into account sourcemaps if enabled.
			// info.sourceRoot - The path to the source file where the log was called if useTrace=true
			// info.sourceFile - The source filename where the log was called if useTrace=true
			// info.mapFile - The filename of the sourcemap file
			// info.lineNumber - The line number this log was called on
			// info.position - The column / position of where the log was called
			// info.originalFile - The original filename where the log was called from if using sourcemaps
			// info.originalLine - The original line where the log was called from if using sourcemaps
			// info.originalColumn - The original column where the log was called from if using sourcemaps


			return `${info.timestamp} ${info.level}: ${info.message}`
		})
		// format.json() // This can be used instead of printf above to output as json
	]

	return customFormatters
	*/
}

/*
 * See the transports documentation here: https://github.com/winstonjs/winston#transports
 */
module.exports.customTransports = function customTransports() {
	// Return nothing to keep the default transports
	return

	// Remove the previous "return" line to create your own custom formatters
	/*
	const customTransports = [new transports.Console()]

	return customTransports
	*/
}
