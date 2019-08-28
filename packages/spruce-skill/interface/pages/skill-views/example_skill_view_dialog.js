//
import React, { Fragment } from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	Heading,
	Button
} from '@sprucelabs/react-heartwood-components'

class TestSkillView extends React.Component {
	modal = this.props.skill.modal()

	pages = [
		<Heading key="page-1">{'Knock knock...'}</Heading>,
		<Heading key="page-2">{"Who's there?"}</Heading>,
		<Heading key="page-3">{'Nobody... I guess it was just the wind.'}</Heading>
	]

	constructor(props) {
		super(props)
		this.state = {
			currentPageIndex: 0,
			currentModalHeight: null
		}
	}

	static async getInitialProps(props) {
		if (props.auth && props.auth.User) {
			console.log('a user is logged in!')
		}
		return {
			renderLocation: 'modal'
		}
	}

	async componentDidMount() {
		this.props.skill.ready() // Show the skill

		this.modal.onClickFooterPrimaryAction(
			this.handleClickModalFooterPrimaryAction
		)

		this.modal.onClickFooterSecondaryAction(() =>
			this.modal.close({ something: 'here is some data!' })
		)

		if (this.props.query.isPaged) {
			this.modal.onGoBack(this.handleModalGoBack)
		}
	}

	handleModalGoBack = async () => {
		await this.setState(prevState => ({
			currentPageIndex:
				prevState.currentPageIndex > 0 ? prevState.currentPageIndex - 1 : 0
		}))
		this.modal.setBackButtonIsVisible(this.state.currentPageIndex > 0)
		this.setModalFooterPrimaryActionText(this.state.currentPageIndex)
	}

	handleClickModalFooterPrimaryAction = async () => {
		if (
			this.props.query.isPaged &&
			this.state.currentPageIndex < this.pages.length - 1
		) {
			await this.setState(prevState => ({
				currentPageIndex: prevState.currentPageIndex + 1
			}))
			const { currentPageIndex } = this.state
			this.modal.setBackButtonIsVisible(currentPageIndex > 0)
			this.modal.setTitle(`Page ${currentPageIndex + 1} Heading`)
			this.setModalFooterPrimaryActionText(currentPageIndex)
		} else {
			this.setModalIsSubmitting(true)

			setTimeout(() => {
				this.setModalIsSubmitting(false)
			}, 1000)
		}
	}

	setModalFooterPrimaryActionText = currentPageIndex => {
		this.modal.setFooterPrimaryActionText(
			currentPageIndex < this.pages.length - 1
				? `Go to Page ${currentPageIndex + 2}`
				: 'Do Something'
		)
	}

	setModalIsSubmitting = isSubmitting => {
		this.modal.setFooterSecondaryActionIsDisabled(isSubmitting)
		this.modal.setFooterPrimaryActionIsDisabled(isSubmitting)
		this.modal.setFooterPrimaryActionIsLoading(isSubmitting)
	}

	setModalHeight = () => {
		const { currentModalHeight } = this.state
		const updatedModalHeight = currentModalHeight ? null : '50rem'
		this.setState({ currentModalHeight: updatedModalHeight })
		this.modal.setContentHeight(updatedModalHeight)
	}

	render() {
		const { currentPageIndex } = this.state
		return (
			<Page className="example pages">
				<PageContent>
					<Layout>
						<LayoutSection>
							{!this.props.query.isPaged && (
								<Fragment>
									<Heading>Hooray from inside your skill!</Heading>
									<Button
										text="Change Content Height"
										kind="primary"
										onClick={this.setModalHeight}
									/>
								</Fragment>
							)}
							{this.props.query.isPaged && this.pages[currentPageIndex]}
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(TestSkillView)
