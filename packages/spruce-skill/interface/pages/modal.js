// @flow
import React from 'react'
import PageWrapper from '../containers/PageWrapper'
import { Button } from '@sprucelabs/react-heartwood-components'

class SkillModal extends React.Component {
	_modal = this.props.skill.modal()

	updateModal = (state: string, option: boolean) => {
		switch (state) {
			case 'primary-loading':
				this._modal.setFooterPrimaryActionIsLoading(option)
				break
			case 'secondary-loading':
				this._modal.setFooterSecondaryActionIsLoading(option)
			case 'primary-disabled':
				this._modal.setFooterPrimaryActionIsDisabled(option)
				break
			case 'secondary-disabled':
				this._modal.setFooterSecondaryActionIsDisabled(option)
				break
		}
	}

	render() {
		return (
			<div>
				<Button
					onClick={() => this.updateModal('primary-loading', true)}
					text="primary loading"
				/>
				<Button
					onClick={() => this.updateModal('primary-loading', false)}
					text="primary not loading"
				/>
				<Button
					onClick={() => this.updateModal('secondary-loading', true)}
					text="secondary loading"
				/>
				<Button
					onClick={() => this.updateModal('secondary-loading', false)}
					text="secondary not loading"
				/>
				<Button
					onClick={() => this.updateModal('primary-disabled', true)}
					text="primary disabled"
				/>
				<Button
					onClick={() => this.updateModal('primary-disabled', false)}
					text="primary not disabled"
				/>
				<Button
					onClick={() => this.updateModal('secondary-disabled', true)}
					text="secondary disabled"
				/>
				<Button
					onClick={() => this.updateModal('secondary-disabled', false)}
					text="secondary not disabled"
				/>
			</div>
		)
	}
}

export default PageWrapper(SkillModal)
