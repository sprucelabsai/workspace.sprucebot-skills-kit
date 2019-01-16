/// @flow
import React from 'react'
import PageWrapper from '../containers/PageWrapper'
import {
	Page,
	PageContent,
	Text,
	Layout,
	LayoutSection,
	CardBuilder
} from '@sprucelabs/react-heartwood-components'

import type { WrappedInitialProps } from '../containers/PageWrapper'

type Props = {
	skill: Object
}

type State = {}

class UnauthorizedPage extends React.Component<Props, State> {
	static getInitialProps(props: WrappedInitialProps) {
		return {
			public: true // does not require the user to be auth'ed
		}
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="unauthorized">
				<PageContent>
					<Layout>
						<LayoutSection>
							<CardBuilder
								header={{ title: 'Permission Denied' }}
								body={{
									children:
										"Well, this is kinda awkward, but you can't be wherever it was you were trying to be."
								}}
							/>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(UnauthorizedPage)
