// @flow
import React, { Fragment } from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Text,
	ListItem,
	Layout,
	LayoutSection
} from '@sprucelabs/react-heartwood-components'
import request from 'superagent'
import { gqlClient, settings } from '@sprucelabs/spruce-next-helpers'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

import type { WrappedInitialProps } from '../../../containers/PageWrapper'

const EXAMPLE_SUBSCRIPTION = gql`
	subscription ExampleStream {
		ExampleStream {
			message
			sentAt
		}
	}
`

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
		try {
			const result = await gqlClient.query({
				token: this.props.auth.jwt,
				query: `{
                    Users {
                        id
					}
				}`
			})
			log.debug({ result })
		} catch (e) {
			log.error(e)
		}

		this.props.skill.ready() // Show the skill
	}

	render() {
		const { auth } = this.props
		return (
			<Page className="dashboard-location-page">
				<PageContent>
					<Layout>
						<LayoutSection>
							<Text>{`Welcome to the location dashboard example skill view!`}</Text>
							{typeof window !== 'undefined' && (
								<Subscription
									client={gqlClient.client}
									onSubscriptionData={options => {
										// You can process data here outside of rendering if necessary
									}}
									subscription={EXAMPLE_SUBSCRIPTION}
									variables={{}}
									fetchPolicy={'no-cache'}
									shouldResubscribe={true}
								>
									{({ data, loading, err }) => {
										if (err) {
											return (
												<Text>{`Error getting data from Subscription`}</Text>
											)
										}
										if (data && data.ExampleStream) {
											return (
												<ListItem
													title={data.ExampleStream.message}
													subtitle={data.ExampleStream.sentAt}
												/>
											)
										}
										return null
									}}
								</Subscription>
							)}
							<p>{"Here's an example of uploading files"}</p>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(TestSkillView)
