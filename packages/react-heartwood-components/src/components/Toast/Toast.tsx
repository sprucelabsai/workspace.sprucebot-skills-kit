import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'

interface IToastHeaderProps {
	/** Headline text */
	headline: string

	/** Function to remove the toast */
	onRemove: Function

	/** Optional; controls whether the toast can be removed. Defaults to true */
	canRemove?: boolean
}

const ToastHeader = (props: IToastHeaderProps): React.ReactElement => {
	const { headline, onRemove, canRemove } = props
	return (
		<div className="toast__header">
			<p>{headline}</p>
			{canRemove && onRemove && (
				<Button icon={{ name: 'close' }} onClick={onRemove} />
			)}
		</div>
	)
}

export interface IToastProps {
	/** Unique ID for the toast */
	id: string | number

	/** Headline text */
	headline: string

	/** Optional; Text after the headline */
	text?: string

	/** Handle toast removal */
	onRemove: Function

	/** Optional; controls whether the toast can be removed. Defaults to true */
	canRemove?: boolean

	/** Sets the variation of toast */
	kind?: string

	/** Handle a followup action */
	followupAction?: Function

	/** Text for the followup action */
	followupText?: string
}

const Toast = (props: IToastProps): React.ReactElement => {
	const { headline, kind, text, followupAction, followupText, onRemove } = props
	const toastClass = cx('toast', {
		'toast-positive': kind === 'positive',
		'toast-negative': kind === 'negative',
		'toast-warn': kind === 'warn',
		'toast-info': kind === 'info'
	})
	return (
		<div className={toastClass}>
			<ToastHeader headline={headline} onRemove={onRemove} />
			{text && (
				<div className="toast__body">
					<p>{text}</p>
				</div>
			)}
			{followupAction && (
				<Button text={followupText} onClick={followupAction} />
			)}
		</div>
	)
}

Toast.defaultProps = {
	kind: 'neutral',
	followupAction: null,
	followupText: 'Undo',
	text: '',
	canRemove: true
}

export default Toast
