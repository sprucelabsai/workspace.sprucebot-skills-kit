import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent
} from '@sprucelabs/react-heartwood-components'

class OwnerDashboard extends React.Component {
	// static async getInitialProps({ auth, store }) {
	// 	// load everything
	// 	if (auth) {
	// 		await Promise.all([
	// 			store.dispatch(users.guests()),
	// 			store.dispatch(users.teammates())
	// 		])
	// 	}

	// 	return {}
	// }

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		// let {
		// 	auth,
		// 	lang,
		// 	users: {
		// 		guestsLoading = true,
		// 		guestsError,
		// 		guests,
		// 		teammatesLoading = true,
		// 		teammatesError,
		// 		teammates
		// 	},
		// 	onboarding
		// } = this.props

		// const dashboardProps = {
		// 	lang,
		// 	guestsLoading,
		// 	guestsError,
		// 	guests,
		// 	teammatesLoading,
		// 	teammatesError,
		// 	teammates,
		// 	auth,
		// 	getText: this.props.lang.getText
		// }

		return (
			<Page className="owner-dashboard">
				<PageHeader title="Heartwood Foundation" />
				<PageContent>
					<p>Hello World</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(OwnerDashboard)
