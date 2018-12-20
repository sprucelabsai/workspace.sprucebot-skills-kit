import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent
} from '@sprucelabs/react-heartwood-components'

class LocationSettingsPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="location-settings-page">
				<PageHeader
					title="Location Settings Page"
					onClickBack={() => Router.back()}
					backLinkText="Previous Page"
				/>
				<PageContent>
					<p>Welcome to the Example location settings view!</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(LocationSettingsPage)
