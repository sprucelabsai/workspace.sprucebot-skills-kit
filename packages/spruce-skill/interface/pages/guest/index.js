import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import Router from 'next/router'
import { Page, PageContent } from '@sprucelabs/react-heartwood-components'

class GuestPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="guest-page"
				header={{
					title: 'Guest Page',
					onClickBack: () => Router.back(),
					backLinkText: 'Previous Page'
				}}
			>
				<PageContent>
					<p>Hello, Guest</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(GuestPage)
