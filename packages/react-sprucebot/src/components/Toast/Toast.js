// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import CloseIcon from '../../../static/assets/icons/ic_close.svg'

type HeaderProps = {
	headline: string,
	onRemove: Function
}

const ToastHeader = (props: HeaderProps) => {
	const { headline, onRemove } = props
	return (
		<div className="toast__header">
			<p>{headline}</p>
			<Button icon={<CloseIcon />} onClick={onRemove} />
		</div>
	)
}

export interface Props {
	headline: string;
	text: string;
	onRemove: Function;
	kind?: 'neutral' | 'positive' | 'negative';
	onUndo?: Function;
}

const Toast = (props: Props) => {
	const { headline, kind, text, onUndo, onRemove } = props
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
			{onUndo && <Button text="Undo" onClick={onUndo} />}
		</div>
	)
}

Toast.defaultProps = {
	kind: 'neutral'
}

export default Toast
