import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import { IHWToast, IHWAction } from '@sprucelabs/spruce-types'

interface IToastHeaderProps {
	/**  Optional id for view caching */
	id?: string

	/** Function to remove the toast */
	onRemove?: Function

	/** headline */
	headline?: string

	/** is this toast removable */
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

export interface IToastProps extends Omit<IHWToast, 'id'> {
	/** Unique ID for the toast */
	id: string | number

	/** Handle toast removal */
	onRemove?: Function

	/** override how long before the toast goes away, in milis */
	timeout?: number | 'never'

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

const Toast = (props: IToastProps | IHWToast): React.ReactElement => {
	const commonProps = props as IHWToast
	const reactHeartwoodProps = props as IToastProps

	const {
		headline,
		kind,
		text,
		followupAction,
		followupText,
		removeAction
	} = commonProps
	const { canRemove, onAction, onRemove } = reactHeartwoodProps

	const toastClass = cx('toast', {
		'toast-positive': kind === 'positive',
		'toast-negative': kind === 'negative',
		'toast-warn': kind === 'warn',
		'toast-info': kind === 'info'
	})
	return (
		<div className={toastClass}>
			<ToastHeader
				headline={headline}
				onRemove={() => {
					removeAction && onAction && onAction(removeAction)
					onRemove && onRemove()
				}}
				canRemove={canRemove || false}
			/>
			{text && (
				<div className="toast__body">
					<p>{text}</p>
				</div>
			)}
			{followupAction && onAction && (
				<Button text={followupText} onAction={() => onAction(followupAction)} />
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
