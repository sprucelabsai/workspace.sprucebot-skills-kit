import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent
} from '@sprucelabs/react-heartwood-components'

class DashboardLocationPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="dashboard-location-page">
				<PageHeader
					title="Dashboard Location Page"
					onClickBack={() => Router.back()}
					backLinkText="Previous Page"
				/>
				<PageContent>
					<p>Welcome to the location dashboard example skill view!</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(DashboardLocationPage)
