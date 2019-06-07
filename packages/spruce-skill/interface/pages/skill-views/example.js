// @flow
import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	ButtonGroup
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
							<ButtonGroup
								kind=""
								actions={[
									{
										text: 'Open a skill view dialog',
										kind: 'primary',
										icon: { name: 'new_tab' },
										onClick: () => {
											Iframes.sendMessage({
												to: window.parent,
												eventName: 'SkillViewDialog:Open',
												data: {
													title: 'A Cool Skill View Dialog',
													src: `${window.location.protocol}//${
														window.location.hostname
													}/skill-views/example_skill_view_dialog`
												}
											})
										}
									},
									{
										text: 'Add a toast',
										kind: 'primary',
										icon: { name: 'new_tab' },
										onClick: () => {
											this.props.skill.alert({
												headline: 'A toast from my skill',
												text: 'Lorem ipsum body copy',
												kind: 'neutral',
												followupText: 'Undo',
												id: Math.random(),
												timeout: 4000,
												callback: () => {
													window.alert(
														'From the skill view: undo in toast was clicked!'
													)
												}
											})
										}
									}
								]}
							/>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(TestSkillView)
