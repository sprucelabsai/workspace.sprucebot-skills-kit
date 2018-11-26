// TODO Populate from API
module.exports = {
	botName: 'Sprucebot',
	botNamePlural: 'Sprucebots',
	teamDashboardWelcome: ({ user }) => `Welcome back ${user.User.casualName}!`,
	teamDashboardBotText: ({ user }) =>
		user.status === 'online'
			? `You are at ${user.Location.name} as we speak! That's so cool! 🙌🏼`
			: `Next time you get into ${
					user.Location.name
			  }, don't forget to join the wifi! 👊🏼`,
	teammateDashboardHeading: `Who's Online`,
	errorLoadingGuests: `Oh no! I could not load guests!`,
	errorLoadingTeammates: `Oh no! I could not load teammates!`,
	guestsTabTitle: `Guests`,
	teammatesTabTitle: `Teammates`,
	noGuestsBotText: ({ auth }) =>
		`Nobody has visited ${
			auth.Location.name
		} yet! Have them join the wifi to get connected!`
}
