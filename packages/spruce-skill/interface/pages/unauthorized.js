import React from 'react'
import PageWrapper from '../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent,
	BotText
} from '@sprucelabs/react-heartwood-components'

class UnauthorizedPage extends React.Component {
	static getInitialProps() {
		return {
			public: true // does not require the user to be of a certain role
		}
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="unauthorized">
				<PageHeader title="Permission Denied" />
				<PageContent>
					<BotText>
						Well, this is kinda awkward, but you can't be wherever it was you
						were trying to be.
					</BotText>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(UnauthorizedPage)
