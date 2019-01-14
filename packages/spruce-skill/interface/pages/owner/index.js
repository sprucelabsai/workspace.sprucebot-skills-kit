import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import { Page, PageContent } from '@sprucelabs/react-heartwood-components'

class OwnerPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="owner-page"
				header={{
					title: 'Owner Page',
					onClickBack: () => Router.back(),
					backLinkText: 'Previous Page'
				}}
			>
				<PageContent>
					<p>Hello, Owner!</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(OwnerPage)
