import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import { Page, PageContent } from '@sprucelabs/react-heartwood-components'

class PublicOrganizationPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="public-organization-page"
				header={{
					title: 'Public Organization Page',
					onClickBack: () => Router.back(),
					backLinkText: 'Previous Page'
				}}
			>
				<PageContent>
					<p>Welcome to the Example public organization view!</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(PublicOrganizationPage)
