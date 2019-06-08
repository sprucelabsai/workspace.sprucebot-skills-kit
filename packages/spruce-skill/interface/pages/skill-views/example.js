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

import type { WrappedInitialProps } from '../../containers/PageWrapper'

type Props = {
	auth: WrappedInitialProps.auth,
	skill: Object
}

class TestSkillView extends React.Component<Props> {
	supportingMessage = this.props.skill.supportingMessage()
	modal = this.props.skill.modal()

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
											this.model.apen({
												title: 'A Cool Skill View Dialog',
												src: `${window.location.protocol}//${
													window.location.hostname
												}/skill-views/example_skill_view_dialog`
											})
										}
									},
									{
										text: 'Add a toast',
										kind: 'primary',
										icon: { name: 'new_tab' },
										onClick: () => {
											this.supportingMessage.add({
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
