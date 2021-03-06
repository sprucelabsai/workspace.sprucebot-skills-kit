//
import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Text,
	ListItem,
	Layout,
	LayoutSection
} from '@sprucelabs/react-heartwood-components'
import { gqlClient } from '@sprucelabs/spruce-next-helpers'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const EXAMPLE_SUBSCRIPTION = gql`
	subscription ExampleStream {
		ExampleStream {
			message
			sentAt
		}
	}
`

class TestSkillView extends React.Component {
	static async getInitialProps(props) {
		if (props.auth && props.auth.User) {
			console.log('a user is logged in!')
		}
		return {}
	}

	constructor(props) {
		super(props)

		if (typeof window !== 'undefined') {
			gqlClient.setToken(props.auth && props.auth.jwt)
		}
	}

	async componentDidMount() {
		try {
			const result = await gqlClient.query({
				query: gql`
					{
						Users {
							id
						}
					}
				`
			})

			log.debug({ result })
		} catch (e) {
			log.error(e)
		}

		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="dashboard-location-page">
				<PageContent>
					<Layout>
						<LayoutSection>
							<Text>{`Welcome to the location dashboard example skill view!`}</Text>
							{typeof window !== 'undefined' && (
								<Subscription
									client={gqlClient.client}
									onSubscriptionData={
										(/* options */) => {
											// You can process data here outside of rendering if necessary
										}
									}
									subscription={EXAMPLE_SUBSCRIPTION}
									variables={{}}
									fetchPolicy={'no-cache'}
									shouldResubscribe={true}
								>
									{({ data, err }) => {
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
