// @flow
import React from 'react'
import PageWrapper from '../../containers/PageWrapper'
import {
	Page,
	PageContent,
	Layout,
	LayoutSection,
	Button
} from '@sprucelabs/react-heartwood-components'

import type { WrappedInitialProps } from '../../containers/PageWrapper'

type Props = {
	auth: WrappedInitialProps.auth,
	skill: Object
}

type State = {
	currentPageIndex: number
}

class TestSkillView extends React.Component<Props, State> {
	modal = this.props.skill.modal()

	pages = [<div>Page 1!</div>, <div>Page 2!</div>, <div>Page 3!</div>]

	constructor(props) {
		super(props)
		this.state = {
			currentPageIndex: 0
		}
	}

	static async getInitialProps(props: WrappedInitialProps) {
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

		this.modal.onClickFooterSecondaryAction(() => this.modal.close())

		if (this.props.query.isPaged) {
			this.modal.onGoBack(this.handleModalGoBack)
		}
	}

	handleModalGoBack = () => {
		this.setState(
			prevState => ({
				currentPageIndex:
					prevState.currentPageIndex > 0 ? prevState.currentPageIndex - 1 : 0
			}),
			() => {
				this.modal.setBackButtonIsVisible(this.state.currentPageIndex > 0)
			}
		)
	}

	handleClickModalFooterPrimaryAction = () => {
		if (
			this.props.query.isPaged &&
			this.state.currentPageIndex < this.pages.length - 1
		) {
			this.setState(prevState => ({
				currentPageIndex: prevState.currentPageIndex + 1
			}))
			this.modal.setBackButtonIsVisible(this.state.currentPageIndex > 0)
		} else {
			this.setModalIsSubmitting(true)

			setTimeout(() => {
				this.setModalIsSubmitting(false)
			}, 1000)
		}
	}

	setModalIsSubmitting = (isSubmitting: boolean) => {
		this.modal.setFooterSecondaryActionIsDisabled(isSubmitting)
		this.modal.setFooterPrimaryActionIsDisabled(isSubmitting)
		this.modal.setFooterPrimaryActionIsLoading(isSubmitting)
	}

	render() {
		const { currentPageIndex } = this.state
		return (
			<Page className="example pages">
				<PageContent>
					<Layout>
						<LayoutSection>
							{!this.props.query.isPaged && (
								<div>Hooray from inside your skill!</div>
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
