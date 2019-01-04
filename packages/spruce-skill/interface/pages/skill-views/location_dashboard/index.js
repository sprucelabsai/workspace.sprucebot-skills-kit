import React from 'react'
import PageWrapper from '../../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent,
	Dropzone
} from '@sprucelabs/react-heartwood-components'
import request from 'superagent'

class DashboardLocationPage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	onDrop = async (acceptedFiles, rejectedFiles) => {
		log.debug('onDrop!')
		log.debug({ acceptedFiles, rejectedFiles })
		const req = request.put(`/api/1.0/upload.json`)
		// .field('imageSizes', '320, 320@2x, 414, 414@2x, 700, 700@2x')
		// .field('refId', refId)
		// .field('organizationId', organizationId)
		// .field('locationId', locationId)
		// .field('teammateId', teammateId)
		// .field('guestId', guestId)
		acceptedFiles.forEach(file => {
			req.attach('files', file)
		})
		const res = await req
		console.log({ ...res.body })
	}

	render() {
		return (
			<Page className="dashboard-location-page">
				<PageHeader
					title="Dashboard Location Page"
					onClickBack={() => Router.back()}
					backLinkText="Previous Page"
				/>
				<PageContent>
					<p>Welcome to the location dashboard example skill view!</p>
					<Dropzone onDrop={this.onDrop} />
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(DashboardLocationPage)
