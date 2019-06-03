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
import Iframes from '@sprucelabs/spruce-utils/iframes'
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
	modal = this.props.skill.modal()
	confirm = this.props.skill.confirm()

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

	handleOpenModal = (isPaged: boolean) => {
		if (isPaged) {
			this.modal.open({
				title: 'Page 1 Heading',
				src: `${window.location.protocol}//${
					window.location.hostname
				}/skill-views/example_skill_view_dialog?isPaged=true`,
				footerPrimaryActionText: 'Go to Page 2',
				footerSecondaryActionText: 'Cancel',
				isPaged: true
			})
		} else {
			this.modal.open({
				title: 'Modal at your service!',
				src: `${window.location.protocol}//${
					window.location.hostname
				}/skill-views/example_skill_view_dialog`,
				footerPrimaryActionText: 'Submit',
				footerSecondaryActionText: 'Cancel'
			})
		}
	}

	handleShowConfirmationModal = () => {
		this.confirm.show(
			{
				title: 'Are you sure?',
				text: "Are you sure you want to do that thing you're trying to do?",
				isDestructive: true,
				id: Math.random()
			},
			eventData => {
				console.log('Confirmed!', eventData)
			},
			eventData => {
				console.log('Cancelled!', eventData)
			}
		)
	}

	handleShowConfirmationWithInputModal = () => {
		this.confirm.show(
			{
				title: 'Are you sure?',
				text:
					'Are you sure you want to do that thing? Please type "Beep Boop" (case-sensitive) to confirm.',
				kind: 'confirmInput',
				isDestructive: true,
				confirmInputValidString: 'Beep Boop',
				confirmInputIgnoreCase: false,
				confirmInputLabel: 'Name of Thing',
				confirmButtonText: 'Yes, Do the Thing!',
				id: Math.random()
			},
			eventData => {
				console.log('Confirmed!', eventData)
			},
			eventData => {
				console.log('Cancelled!', eventData)
			}
		)
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
								onClick={() => this.handleOpenModal(false)}
								text="Show a modal"
							/>{' '}
							<Button
								kind="primary"
								onClick={() => this.handleOpenModal(true)}
								text="Show a paged modal"
							/>
						</LayoutSection>
						<LayoutSection>
							<Button
								kind="primary"
								onClick={() => this.handleShowConfirmationModal()}
								text="Show a confirm modal"
							/>{' '}
							<Button
								kind="primary"
								onClick={() => this.handleShowConfirmationWithInputModal()}
								text="Show an input confirm modal"
							/>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(DashboardLocationPage)
