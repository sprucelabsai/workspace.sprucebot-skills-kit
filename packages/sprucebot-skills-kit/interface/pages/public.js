import React from 'react'
import Page from '../containers/Page'
import { Container, H1, BotText } from 'react-sprucebot'
import ReactDOM from 'react-dom'

class PublicPage extends React.Component {
	static getInitialProps() {
		return {
			public: true
		}
	}
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Container className="public">
				<H1>{this.props.config.NAME}</H1>
				<BotText>
					Hey Dev! This is your publicly facing page. You might not have user
					auth, but this is a great landing page into your skill!
				</BotText>
			</Container>
		)
	}
}

export default Page(PublicPage)
