import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	Text
} from '@sprucelabs/react-heartwood-components'

class PublicLocationPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				className="public-location-page"
				header={{
					title: 'Public Location Page'
				}}
			>
				<PageContent>
					<Layout>
						<LayoutSection />
					</Layout>
					<Text>{`Welcome to the Example public location view!`}</Text>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(PublicLocationPage)
