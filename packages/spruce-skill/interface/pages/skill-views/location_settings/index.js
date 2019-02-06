import React from 'react'
import Router from 'next/router'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	Text
} from '@sprucelabs/react-heartwood-components'

class LocationSettingsPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="location-settings-page"
				header={{
					title: 'Location Settings Page'
				}}
			>
				<PageContent>
					<Layout>
						<LayoutSection>
							<Text>{`Welcome to the Example location settings view!`}</Text>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(LocationSettingsPage)
