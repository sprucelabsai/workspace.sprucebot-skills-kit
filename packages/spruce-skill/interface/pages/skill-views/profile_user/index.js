import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import { Page, PageContent } from '@sprucelabs/react-heartwood-components'

class UserProfilePage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="user-profile-page"
				header={{
					title: 'User Profile Page',
					onClickBack: () => Router.back(),
					backLinkText: 'Previous Page'
				}}
			>
				<PageContent>
					<p>Welcome to the Example user profile view!</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(UserProfilePage)
