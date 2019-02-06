// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import Button from '../../../Button/Button'
import { CSSTransition } from 'react-transition-group'

export type Props = {
	/** The current location */
	location?: Object,

	/** The message to display in the Save Bar */
	message?: string,

	/** Set to true to show the save bar */
	isVisible: boolean,

	/** Set to true to disable the discard button */
	isDiscardDisabled: Boolean,

	/** Set to true to disable the save button */
	isSaveDisabled: boolean,

	/** Set to true while the discard action is being executed */
	isDiscarding: boolean,

	/** Set to true while the save action is being executed */
	isSaving: boolean,

	/** The function to execute when user selects discard */
	onDiscard?: Function,

	/** The function to execute when user selects save */
	onSave: Function
}

type State = {
	isClient: boolean
}

export default class SaveBar extends React.PureComponent<Props, State> {
	state = {
		isClient: false
	}

	_element = null

	static defaultProps = {
		message: 'Unsaved changes',
		isVisible: false,
		isDiscarding: false,
		isSaving: false,
		isDiscardDisabled: false,
		isSaveDisabled: false
	}

	componentDidMount() {
		this._element = document.body
		this.forceUpdate()
	}

	render() {
		const {
			location,
			message,
			isVisible,
			isDiscarding,
			isSaving,
			isDiscardDisabled,
			isSaveDisabled,
			onDiscard,
			onSave
		} = this.props

		const { isClient } = this.state

		if (!this._element) {
			return null
		}

		return ReactDOM.createPortal(
			<CSSTransition
				in={isVisible}
				appear={true}
				classNames="save-bar"
				timeout={100}
			>
				<div className={cx('save-bar', { 'save-bar--visible': isVisible })}>
					<div className="save-bar__left">
						{location && location.name ? (
							<p className="save-bar__text">{location.name}</p>
						) : (
							<p className="save-bar__text">Spruce</p>
						)}
					</div>

					<div className="save-bar__right">
						<p className="save-bar__title">{message}</p>
						{onDiscard && (
							<Button
								kind="simple"
								text="Discard"
								onClick={onDiscard}
								disabled={isDiscardDisabled || (isDiscarding || isSaving)}
								isLoading={isDiscarding}
								isSmall
							/>
						)}
						<Button
							kind="primary"
							text="Save"
							onClick={onSave}
							disabled={isSaveDisabled || (isDiscarding || isSaving)}
							isLoading={isSaving}
							isSmall
						/>
					</div>
				</div>
			</CSSTransition>,
			this._element
		)
	}
}
