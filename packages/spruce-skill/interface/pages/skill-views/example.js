// @flow
import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	CardBuilder
} from '@sprucelabs/react-heartwood-components'

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
							<CardBuilder
								header={{
									title: 'An example view',
									subtitle: 'With an example card',
									contextMenu: {
										actions: [
											{
												text: 'First option'
											},
											{
												text: 'Second option'
											}
										]
									}
								}}
								body={{
									children: [
										{
											type: 'scores',
											scores: [
												{
													id: 'one',
													label: 'First Time',
													value: '$130'
												},
												{
													id: 'two',
													label: 'Second Time',
													value: '$160'
												},
												{
													id: 'three',
													label: 'Third Time',
													value: '$190'
												}
											]
										}
									]
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
