const dashboardUserCards = require('./dashboardUserCards')

const pages = {
	dashboard_user: dashboardUserCards,
	dashboard_location: dashboardUserCards,
	dashboard_org: dashboardUserCards
}

const getCards = page => {
	return pages[page]
}

module.exports = {
	getCards
}
