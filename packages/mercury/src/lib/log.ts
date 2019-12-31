import Debug from 'debug'

const debug = Debug('@sprucelabs/mercury')
class Log {
	public static debug(...args: any) {
		// debug(args)
		console.log(args)
	}

	public static warn(...args: any) {
		console.log('⚠️ @sprucelabs/mercury ', args)
	}
}

export default Log
