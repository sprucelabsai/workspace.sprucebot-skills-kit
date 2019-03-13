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

class TestSkillView extends React.Component<Props> {
	modal = this.props.skill.modal()

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

		this.modal.onClickFooterPrimaryAction(() => {
			this.setModalProps(true)

			setTimeout(() => {
				this.setModalProps(false)
			}, 1000)
		})

		this.modal.onClickFooterSecondaryAction(() => this.modal.close())
	}

	setModalProps = (isSubmitting: boolean) => {
		this.modal.setFooterSecondaryActionIsDisabled(isSubmitting)
		this.modal.setFooterPrimaryActionIsDisabled(isSubmitting)
		this.modal.setFooterPrimaryActionIsLoading(isSubmitting)
	}

	render() {
		return (
			<Page className="example pages">
				<PageContent>
					<Layout>
						<LayoutSection>
							<div>Hooray from inside your skill!</div>
							<Button
								text="I'm done please close this modal!"
								kind="primary"
								disabled={false}
								icon={{ name: 'remove', isLineIcon: true }}
								onClick={this.modal.close}
							/>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		)
	}
}

export default PageWrapper(TestSkillView)
