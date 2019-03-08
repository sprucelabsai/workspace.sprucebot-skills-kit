// @flow
import React, { Fragment } from 'react'
import PageWrapper from '../containers/PageWrapper'
import { Subheading } from '@sprucelabs/react-heartwood-components'

class SkillModal extends React.Component {
	_modal = this.props.skill.modal()

	componentDidMount() {
		this._modal.onClickFooterPrimaryAction(() => {
			this.setModalProps(true)

			setTimeout(() => {
				this.setModalProps(false)
			}, 1000)
		})

		this._modal.onClickFooterSecondaryAction(() => this._modal.close())
	}

	setModalProps = (isSubmitting: boolean) => {
		this._modal.setFooterSecondaryActionIsDisabled(isSubmitting)
		this._modal.setFooterPrimaryActionIsDisabled(isSubmitting)
		this._modal.setFooterPrimaryActionIsLoading(isSubmitting)
	}

	render() {
		return (
			<Fragment>
				<Subheading>{"Hey there! I'm a skill modal!"}</Subheading>
			</Fragment>
		)
	}
}

export default PageWrapper(SkillModal)
