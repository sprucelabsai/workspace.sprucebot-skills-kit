import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent
} from '@sprucelabs/react-heartwood-components'

class GuestPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="owner-dashboard">
				<PageHeader title="Guest Page" />
				<PageContent>
					<p>Hello, Guest</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(GuestPage)
