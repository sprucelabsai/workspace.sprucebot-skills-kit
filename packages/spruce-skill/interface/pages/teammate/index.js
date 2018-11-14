import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent
} from '@sprucelabs/react-heartwood-components'

class TeammatePage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="owner-dashboard">
				<PageHeader title="Teammate Page" />
				<PageContent>
					<p>Hello, Teammate</p>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(TeammatePage)
