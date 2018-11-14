import React, { Fragment } from 'react'
import Link from 'next/link'
import PageWrapper from '../containers/PageWrapper'
import {
	Container,
	H1,
	H2,
	H3,
	Button,
	BotText,
	Pre,
	Card,
	Paragraph as P
} from '@sprucelabs/react-heartwood-components'

import '../styles/global.scss'

class DeveloperPage extends React.Component {
	static getInitialProps(props) {
		return {
			public: props.config.DEV_MODE
		}
	}

	componentDidMount() {
		this.props.skill.ready()
		console.warn(
			'YOUR DEVELOPER PAGE IS PUBLICLY AVAILABLE. WHEN YOU ARE READY MAKE SURE YOU SET DEV_MODE=FALSE'
		)
	}

	render() {
		const props = this.props
		return (
			<Container>
				<svg
					style={{
						height: '200px',
						margin: '0 auto',
						display: 'block'
					}}
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 98.2 124.6"
				>
					<g id="Sprucebot-Logo-Mark">
						<path
							id="Triangle"
							d="M50 16.9L75.5 76H60.2c-1.8 0-3.3 1.5-3.3 3.4s1.5 3.4 3.3 3.4h25.5L50 0 2.1 110.9 0 115.7H77.2c1.8 0 3.3-1.5 3.3-3.4s-1.5-3.4-3.3-3.4h-67l39.8-92z"
						/>
						<path
							id="Oval"
							fill="#020202"
							d="M63.1 79.3c0-6.8-5.4-12.4-12.1-12.4s-12.1 5.5-12.1 12.4c0 6.8 5.4 12.4 12.1 12.4 6.7 0 12.1-5.6 12.1-12.4zm-17.6 0c0-3.1 2.4-5.6 5.5-5.6s5.5 2.5 5.5 5.6-2.4 5.6-5.5 5.6-5.5-2.5-5.5-5.6z"
						/>
						<path
							id="Oval_1_"
							d="M98.2 112.2c0-6.8-5.4-12.4-12.1-12.4S74 105.3 74 112.2s5.4 12.4 12.1 12.4c6.6 0 12.1-5.5 12.1-12.4zm-17.6 0c0-3.1 2.4-5.6 5.5-5.6 3 0 5.5 2.5 5.5 5.6s-2.4 5.6-5.5 5.6c-3 0-5.5-2.5-5.5-5.6z"
						/>
					</g>
				</svg>
				<H1>Hello Sprucebot 🌲🤖 Developer!</H1>
				<BotText>
					Use "Jump to Role" above to get started. Also, check out the developer
					documentation for everything you'll need to get up and running!
				</BotText>
				<Button href="https://developer.sprucebot.com" target="_blank">
					Take me to the docs!
				</Button>
				<Button href="https://hello.sprucebot.com/styleguide" target="_blank">
					Take me to the style guide!
				</Button>
			</Container>
		)
	}
}

export default PageWrapper(DeveloperPage)
