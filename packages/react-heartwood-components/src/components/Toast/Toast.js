// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import CloseIcon from '../../../static/assets/icons/ic_close.svg'

type HeaderProps = {
	/** Headline text */
	headline: string,

	/** Function to remove the toast */
	onRemove: Function
}

const ToastHeader = (props: HeaderProps) => {
	const { headline, onRemove } = props
	return (
		<div className="toast__header">
			<p>{headline}</p>
			<Button icon={{ customIcon: CloseIcon }} onClick={onRemove} />
		</div>
	)
}

export type Props = {
	/** Headline text */
	headline: string,

	/** Text after the headline */
	text: string,

	/** Handle toast removal */
	onRemove: Function,

	/** Sets the variation of toast */
	kind?: 'neutral' | 'positive' | 'negative',

	/** Handle a followup action */
	followupAction?: Function
}

const Toast = (props: Props) => {
	const { headline, kind, text, followupAction, onRemove } = props
	const toastClass = cx('toast', {
		'toast-positive': kind === 'positive',
		'toast-negative': kind === 'negative'
	})
	return (
		<div className={toastClass}>
			<ToastHeader headline={headline} onRemove={onRemove} />
			<div className="toast__body">
				<p>{text}</p>
			</div>
			{followupAction && <Button text="Undo" onClick={followupAction} />}
		</div>
	)
}

Toast.defaultProps = {
	kind: 'neutral',
	onUndo: null
}

export default Toast
