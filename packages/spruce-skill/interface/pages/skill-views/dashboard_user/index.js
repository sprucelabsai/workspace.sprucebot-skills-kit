import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import { Page, PageContent } from '@sprucelabs/react-heartwood-components'

class DashboardUserPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="dashboard-user-page"
				header={{
					title: 'Dashboard User Page',
					onClickBack: () => Router.back(),
					backLinkText: 'Previous Page'
				}}
			>
				<PageContent>
					<p>Welcome to the user dashboard example skill view!</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(DashboardUserPage)
