import {
	BotText,
	Container,
	H1,
	Paragraph as P
} from '@sprucelabs/react-heartwood-components'

import Page from '../../containers/Page'
import React from 'react'

class GuestPage extends React.Component {
	static getInitialProps({ store }) {
		const auth = store.getState().auth || {}
		return {
			user: auth.User,
			location: auth.Location,
			status: auth.status
		}
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Container>
				<div className="guest">
					<H1>Welcome {this.props.user.casualName}!</H1>
					{this.props.status === 'online' && (
						<BotText>
							You are at {this.props.location.name} as we speak!
						</BotText>
					)}
					{this.props.status !== 'online' && (
						<BotText>
							Next time you get to {this.props.location.name}, you should join
							the wifi!
						</BotText>
					)}
				</div>
			</Container>
		)
	}
}

export default PageWrapper(GuestPage)
