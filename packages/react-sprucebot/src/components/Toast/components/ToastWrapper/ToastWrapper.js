// @flow
import React, { Component } from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import Toast, { Props as ToastProps } from '../../Toast'

type Props = {
	toasts: Array<ToastProps>,
	handleRemove: Function
}

const ToastWrapper = (props: Props) => {
	const { toasts, handleRemove } = props
	console.log({ toasts })

	return (
		<div className="toasts-wrapper">
			<VelocityTransitionGroup
				enter={{ animation: { opacity: 1, translateX: 0 }, duration: 300 }}
				leave={{ animation: { opacity: 0, translateX: '-4px' }, duration: 0 }}
			>
				{toasts.map((toast, idx) => (
					<div key={idx} className="toast-wrapper">
						<Toast onRemove={() => handleRemove(idx)} {...toast} />
					</div>
				))}
			</VelocityTransitionGroup>
		</div>
	)
}

export default ToastWrapper
