import React from 'react'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	CardBuilder
} from '@sprucelabs/react-heartwood-components'

import { skill } from '@sprucelabs/spruce-next-helpers'

export default class Error extends React.Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null
		return { statusCode }
	}

	componentDidMount() {
		skill.ready() // Show the skill
	}

	render() {
		const { errorMessage } = this.props

		let message =
			this.props.statusCode && this.props.statusCode === 404
				? "I can't find the page you are looking for. I really apologize about that."
				: "I had one job; run the website. Apparently I can't even do that. I've let the humans know as they're probably better equipped to fix this than I am."

		if (errorMessage) {
			message = errorMessage
		}

		return (
			<Page header={{}}>
				<PageContent>
					<Layout>
						<LayoutSection>
							<CardBuilder
								header={{ title: "Oh dang! I'm so sorry!" }}
								body={{
									children: message
								}}
							/>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}
