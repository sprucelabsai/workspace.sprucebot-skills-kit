const dashboardUserCards = require('./dashboardUserCards')

const pages = {
	dashboard_user: dashboardUserCards
}

const getDummyCards = page => {
	return pages[page]
}

module.exports = {
	getDummyCards
}
