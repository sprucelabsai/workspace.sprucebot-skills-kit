import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	Text
} from '@sprucelabs/react-heartwood-components'

class UserProfilePage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="user-profile-page"
				header={{
					title: 'User Profile Page'
				}}
			>
				<PageContent>
					<Layout>
						<LayoutSection>
							<Text>{`Welcome to the Example user profile view!`}</Text>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(UserProfilePage)
