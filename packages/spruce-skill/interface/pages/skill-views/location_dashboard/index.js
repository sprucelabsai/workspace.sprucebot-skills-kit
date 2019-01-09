import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent,
	Dropzone
} from '@sprucelabs/react-heartwood-components'
import request from 'superagent'
import { gqlClient, settings } from '@sprucelabs/spruce-next-helpers'

class DashboardLocationPage extends React.Component {
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

	async componentDidMount() {
		this.props.skill.ready() // Show the skill

		try {
			const result = await gqlClient.query({
				token: this.props.auth && this.props.auth.jwt,
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
		// log.debug({ props: this.props })
		return (
			<Page className="dashboard-location-page">
				<PageHeader
					title="Dashboard Location Page"
					onClickBack={() => Router.back()}
					backLinkText="Previous Page"
				/>
				<PageContent>
					<p>Welcome to the location dashboard example skill view!</p>
					<p>{"Here's an example of uploading files"}</p>
					<Dropzone onDrop={this.onDrop} />
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(DashboardLocationPage)
