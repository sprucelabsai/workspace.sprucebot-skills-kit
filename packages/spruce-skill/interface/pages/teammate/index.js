import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageHeader,
	PageContent,
	Layout,
	LayoutSection,
	Card,
	CardHeader,
	CardBody
} from '@sprucelabs/react-heartwood-components'

class TeammatePage extends React.Component {
	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Page className="owner-page">
				<PageHeader
					title="Teammate Page"
					onClickBack={() => Router.back()}
					backLinkText="Previous Page"
				/>
				<PageContent>
					<Layout>
						<LayoutSection>
							<Card>
								<CardHeader title="Get the most out of Spruce" />
								<CardBody>
									Two roads diverged in a wood, and I took the one less traveled
									by, And that has made all the difference.
								</CardBody>
							</Card>
							<Card>
								<CardHeader title="Get the most out of Spruce" />
								<CardBody>
									Two roads diverged in a wood, and I took the one less traveled
									by, And that has made all the difference.
								</CardBody>
							</Card>
						</LayoutSection>
						<LayoutSection isSecondary>
							<Card>
								<CardHeader title="Here is some secondary content" />
								<CardBody>
									Two roads diverged in a wood, and I took the one less traveled
									by, And that has made all the difference.
								</CardBody>
							</Card>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(TeammatePage)
