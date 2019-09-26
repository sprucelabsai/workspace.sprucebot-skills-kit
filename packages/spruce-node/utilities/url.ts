export default {
	/**
	 * Takes an object and turns it into a query string. Keys and values. No depth, can't handle arrays
	 */
	serialize(obj: Record<string, any>) {
		const str: string[] = []
		for (const p in obj) {
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
			}
		}
		return str.join('&')
	},

	/**
	 * Builds the path to the endpoint off all the crucial tidbits
	 */
	build(
		path: string,
		query: Record<string, any> | undefined,
		version: string,
		skillId: string
	) {
		// build url with query and make sure there are no double /
		let pathWithQuery = `/api/${version}/skills/${skillId}/${path}`
			.replace(/\/\//g, '/')
			.replace(/\/$/, '')

		// Construct URL using the query
		pathWithQuery += pathWithQuery.search(/\?/) === -1 ? '?' : '&'
		if (query) {
			pathWithQuery += this.serialize(query)
		}
		return pathWithQuery
	}
}
