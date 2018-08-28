import React from 'react'
import { Container } from '@sprucelabs/react-sprucebot'

import Page from '../../containers/Page'
import TeamDashboard from '../../components/TeamDashboard'
import * as users from '../../store/actions/users'

class OwnerDashboard extends React.Component {
	static async getInitialProps({ auth, store }) {
		// load everything
		if (auth) {
			await Promise.all([
				store.dispatch(users.guests()),
				store.dispatch(users.teammates())
			])
		}

		return {}
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		let {
			auth,
			lang,
			users: {
				guestsLoading = true,
				guestsError,
				guests,
				teammatesLoading = true,
				teammatesError,
				teammates
			},
			onboarding
		} = this.props

		const dashboardProps = {
			lang,
			guestsLoading,
			guestsError,
			guests,
			teammatesLoading,
			teammatesError,
			teammates,
			auth,
			getText: this.props.lang.getText
		}

		return (
			<Container className="owner-dashboard">
				<TeamDashboard {...dashboardProps} />
			</Container>
		)
	}
}

export default Page(OwnerDashboard)
