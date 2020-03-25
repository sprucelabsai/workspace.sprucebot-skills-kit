import React, { Fragment } from 'react'
import { Mercury } from '@sprucelabs/mercury'
import {
	Page,
	PageContent,
	Heading,
	Subheading,
	TextContainer,
	Text,
	ButtonGroup,
	BotText,
	Layout,
	LayoutSection
} from '@sprucelabs/react-heartwood-components'

class DeveloperPage extends React.Component {
	componentDidMount() {
		const mercury = new Mercury({
			spruceApiUrl: 'https://local-api.sprucebot.com',
			credentials: {
				// Auth as a skill
				// id: '51EF8E3C-553E-4BEF-A44F-887A96461D53',
				// apiKey: 'A0AF17D4-0A6F-44BB-914D-C3B637836459'

				// Auth as a user
				token:
					'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjMTZiNzBjOC1jZmZjLTQ2OTQtYTU5My1lNWI3NDY3NzQ3ZWEiLCJpYXQiOjE1ODM5NTU1MzgsImV4cCI6MTU4NjU0NzUzOCwianRpIjoiZDI3ZTIwMWItMDBkYy00ZWJmLWIxYTAtNjQ5MWI5NDUyYTc3In0.AKxjl1ClwNM3YQQC3ZtPDMV_jfjmRrgLJKb4TpLBVYrbUIDyLH2pzG4hG5Da4J4edfZoTT1kFXQHAqGP9NX8TQ'
			}
		})

		if (typeof window !== 'undefined') {
			// window.mercury = mercury

			mercury
				.emit(
					{
						eventName: 'booking:get-providers',
						organizationId: '0a1a5e00-debc-410d-9e14-f7b7c16e8ec2',
						locationId: '3d9b29eb-ab0e-481a-834c-6c57315c32b4'
					},
					data => {
						console.log('Emit response!', { data })
					}
				)
				.then(allResponses => {
					console.log('ALL RESPONSES', allResponses)
				})
		}
		console.warn(
			'YOUR DEVELOPER PAGE IS PUBLICLY AVAILABLE. WHEN YOU ARE READY MAKE SURE YOU SET DEV_MODE=FALSE'
		)
	}

	render() {
		const props = this.props
		return (
			<Page>
				<link
					href={
						'https://cdn.spruce.ai/stylesheets/9.1.0/heartwood-components.min.css'
					}
					rel="stylesheet"
					type="text/css"
					charSet="UTF-8"
				/>
				<PageContent>
					<Layout>
						<LayoutSection>
							<svg
								style={{
									height: '200px',
									margin: '0 auto 1rem',
									display: 'block'
								}}
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 98.2 124.6"
							>
								<g id="Sprucebot-Logo-Mark">
									<path
										id="Triangle"
										d="M50 16.9L75.5 76H60.2c-1.8 0-3.3 1.5-3.3 3.4s1.5 3.4 3.3 3.4h25.5L50 0 2.1 110.9 0 115.7H77.2c1.8 0 3.3-1.5 3.3-3.4s-1.5-3.4-3.3-3.4h-67l39.8-92z"
									/>
									<path
										id="Oval"
										fill="#020202"
										d="M63.1 79.3c0-6.8-5.4-12.4-12.1-12.4s-12.1 5.5-12.1 12.4c0 6.8 5.4 12.4 12.1 12.4 6.7 0 12.1-5.6 12.1-12.4zm-17.6 0c0-3.1 2.4-5.6 5.5-5.6s5.5 2.5 5.5 5.6-2.4 5.6-5.5 5.6-5.5-2.5-5.5-5.6z"
									/>
									<path
										id="Oval_1_"
										d="M98.2 112.2c0-6.8-5.4-12.4-12.1-12.4S74 105.3 74 112.2s5.4 12.4 12.1 12.4c6.6 0 12.1-5.5 12.1-12.4zm-17.6 0c0-3.1 2.4-5.6 5.5-5.6 3 0 5.5 2.5 5.5 5.6s-2.4 5.6-5.5 5.6c-3 0-5.5-2.5-5.5-5.6z"
									/>
								</g>
							</svg>
							<TextContainer isCentered={true}>
								<Heading>{`Hello Sprucebot 🌲🤖 Developer!`}</Heading>
								<BotText>
									{`Use "Jump to Role" above to get started. Also, check out the
							developer documentation for everything you'll need to get up and
							running! We have added some great new features for you around the
							new cards and skill views.`}
								</BotText>

								<Subheading>{`Docs`}</Subheading>
								<Text>{`Cards: TODO: Link here`}</Text>
								<Text>{`Skill Views: TODO: Link here`}</Text>

								<ButtonGroup
									kind=""
									actions={[
										{
											text: 'Take me to the docs!',
											kind: 'primary',
											target: '_blank',
											href:
												'https://github.com/sprucelabsai/workspace.sprucebot-skills-kit/tree/dev/packages/spruce-skill/docs#-sprucebot-skills-kit-'
										},
										{
											text: 'Take me to the style guide!',
											kind: 'secondary',
											target: '_blank',
											href: 'https://canary-storybook.sprucelabs.ai'
										}
									]}
								/>
							</TextContainer>
							{props.auth &&
								props.auth.acl &&
								Object.keys(props.auth.acl).map(slug => (
									<Fragment key={`slug-${slug}`}>
										<Heading>{slug}</Heading>
										{Object.keys(props.auth.acl[slug]).map(perm => (
											<Text key={`slugPermission-${slug}-${perm}`}>{`${perm}: ${
												props.auth.acl[slug][perm]
											}`}</Text>
										))}
									</Fragment>
								))}
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default DeveloperPage
