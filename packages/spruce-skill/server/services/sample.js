// This service can be accessed by ctx.services.sample() from the controllers
module.exports = {
	getSomeMetas() {
		return this.sb.metas('sampleKey')
	},
	getSomeDatabaseCount() {
		return this.db.models.Sample.count()
	}
}
