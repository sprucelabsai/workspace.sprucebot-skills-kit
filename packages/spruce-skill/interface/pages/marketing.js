import React from 'react'
import PageWrapper from '../containers/PageWrapper'
import {
	Page,
	PageContent,
	BotText,
	Layout,
	LayoutSection
} from '@sprucelabs/react-heartwood-components'
import ReactDOM from 'react-dom'

class MarketingPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.containerDiv = React.createRef()
	}

	static getInitialProps(props) {
		return {
			name: props.config.NAME,
			description: props.config.DESCRIPTION,
			vimeoId: props.config.VIMEO_ID
		}
	}

	// track sizes for marketing video
	sizes() {
		const container = this.containerDiv.current
		const computed = window.getComputedStyle(container)
		const width =
			parseFloat(computed.width) -
			parseFloat(computed.paddingLeft) -
			parseFloat(computed.paddingRight)
		return {
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
			videoWidth: width,
			videoHeight: width * (360 / 640)
		}
	}

	// on window resize, set the sizes
	didResize() {
		this.size()
	}

	// set sizes for window and video
	size() {
		this.setState(this.sizes())
	}

	componentDidMount() {
		window.addEventListener('resize', this.didResize.bind(this))
		this.size()
		this.props.skill.ready() // Show the skill
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.didResize.bind(this))
	}

	render() {
		return (
			<Page className="marketing" header={{ title: this.props.name }}>
				<PageContent>
					<Layout>
						<LayoutSection>
							<div ref={this.containerDiv}>
								<BotText>{this.props.description}</BotText>
								{this.props.vimeoId && (
									<iframe
										width={this.state.videoWidth}
										height={this.state.videoHeight}
										className="vimeo"
										title="Marketing"
										src={`https://player.vimeo.com/video/${this.props.vimeoId}`}
										frameBorder="0"
										allowFullScreen
									/>
								)}
							</div>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(MarketingPage)
