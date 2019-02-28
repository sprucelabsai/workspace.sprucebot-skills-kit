// @flow
import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	Button
} from '@sprucelabs/react-heartwood-components'
import Iframes from '@sprucelabs/spruce-utils/iframes'

import type { WrappedInitialProps } from '../../containers/PageWrapper'

type Props = {
	auth: WrappedInitialProps.auth,
	skill: Object
}

class TestSkillView extends React.Component<Props> {
	static async getInitialProps(props: WrappedInitialProps) {
		if (props.auth && props.auth.User) {
			console.log('a user is logged in!')
		}
		return {}
	}

	async componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="example pages">
				<PageContent>
					<Layout>
						<LayoutSection>
							<div>Hooray from inside your skill!</div>
							<Button
								text="I'm done please close this modal!"
								kind="primary"
								disabled={false}
								icon={{ name: 'remove', isLineIcon: true }}
								onClick={() => {
									Iframes.sendMessage({
										to: window.parent,
										eventName: 'SkillViewDialog:Close'
									})
								}}
							/>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(TestSkillView)
