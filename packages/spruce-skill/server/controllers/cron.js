const config = require('config')
module.exports = (/* ctx, cron */) => {
	if (config.RUN_CRONS) {
		// cron.schedule('0 8 * * *', () => {
		// 	console.log('running every day at 8am')
		// })
	}
}
