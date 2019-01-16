import React from 'react'
import {
	Page,
	PageContent,
	BotText
} from '@sprucelabs/react-heartwood-components'

export default class Error extends React.Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null
		return { statusCode }
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page
				header={{
					title: "Oh dang. I'm sorry"
				}}
			>
				<PageContent>
					<div className="error">
						{this.props.statusCode && this.props.statusCode === 404 && (
							<BotText>
								I can't find the page you are looking for. I really apologize
								about that.
							</BotText>
						)}
						{!this.props.statusCode ||
							(this.props.statusCode !== 404 && (
								<BotText>
									I had one job; run the website. Apparently I can't even do
									that. I've let the humans know as they're probably better
									equipped to fix this than I am.
								</BotText>
							))}
					</div>
				</PageContent>
			</Page>
		)
	}
}
