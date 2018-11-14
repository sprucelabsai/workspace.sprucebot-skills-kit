import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent
} from '@sprucelabs/react-heartwood-components'

class OwnerPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="owner-dashboard">
				<PageHeader title="Owner Page" />
				<PageContent>
					<p>Hello, Owner!</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(OwnerPage)
