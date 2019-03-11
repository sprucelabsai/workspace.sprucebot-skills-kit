// @flow
import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Dropzone,
	ListItem,
	Layout,
	LayoutSection,
	Text,
	Button
} from '@sprucelabs/react-heartwood-components'
import request from 'superagent'
import { gqlClient, settings } from '@sprucelabs/spruce-next-helpers'
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
class DashboardLocationPage extends React.Component {
	_modal = this.props.skill.modal()

	static async getInitialProps(props) {
		try {
			settings.configure(props.auth && props.auth.jwt)

			const result = await settings.get([
				'org_example',
				'receive_notifications'
			])
			log.debug('Got settings for location_dashboard', result)
		} catch (e) {
			log.error(e)
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
		this.props.skill.ready() // Show the skill

		try {
			const result = await gqlClient.query({
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
	}

	handleShowModal = () => {
		this._modal.open({
			title: 'Modal at your service!',
			src: `${window.location.protocol}//${
				window.location.hostname
			}/skill-views/example_skill_view_dialog`,
			footerPrimaryActionText: 'Submit',
			footerSecondaryActionText: 'Cancel'
		})
	}

	onDrop = async (acceptedFiles, rejectedFiles) => {
		log.debug('onDrop!')
		log.debug({ acceptedFiles, rejectedFiles })
		const req = request.put(`/api/1.0/upload.json`)
		// .field('imageSizes', '320, 320@2x, 414, 414@2x, 700, 700@2x') // Additional information can be sent by using .field(key, val)
		acceptedFiles.forEach(file => {
			req.attach('files', file) // Attach each file that was uploaded to the request
		})
		const res = await req
		log.debug({ ...res.body })
	}

	render() {
		return (
			<Page>
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
							<Text>{"Here's an example of uploading files"}</Text>
							<Dropzone onDrop={this.onDrop} />
						</LayoutSection>
						<LayoutSection>
							<Button
								kind="primary"
								onClick={this.handleShowModal}
								text="Show a modal"
							/>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(DashboardLocationPage)
