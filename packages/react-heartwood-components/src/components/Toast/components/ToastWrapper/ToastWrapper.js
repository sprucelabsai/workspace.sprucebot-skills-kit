// @flow
import React, { Component } from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import uniqBy from 'lodash/uniqBy'
import Toast from '../../Toast'
import type { Props as ToastProps } from '../../Toast'

type Props = {
	/** The toasts */
	toasts: Array<ToastProps>,

	/** Handle toast removal */
	handleRemove: Function
}

type State = {
	toasts: Array<ToastProps>,
	timeouts: Object
}

const defaultTimeout = 3000

export default class ToastWrapper extends Component<Props, State> {
	state = {
		toasts: [],
		timeouts: {}
	}
	timeouts = {}
	static getDerivedStateFromProps(props: Props, state: State) {
		const uniqToasts = uniqBy(props.toasts, 'id')
		let timeouts = { ...state.timeouts }
		uniqToasts.forEach(toast => {
			if (toast.timeout !== 'never') {
				timeouts[toast.id] = setTimeout(
					() => {
						props.handleRemove(toast.id)
					},
					typeof toast.timeout === 'number' ? toast.timeout : defaultTimeout
				)
			}
		})
		return { toasts: uniqToasts, timeouts }
	}

	onRemoveClick = (id: string) => {
		const { timeouts } = this.state
		const { handleRemove } = this.props
		if (timeouts[id]) {
			clearTimeout(timeouts[id])
		}
		handleRemove(id)
	}

	render() {
		const { toasts } = this.state

		return (
			<div className="toasts-wrapper">
				<VelocityTransitionGroup
					enter={{ animation: { opacity: 1, translateX: 0 }, duration: 300 }}
					leave={{
						animation: { opacity: 0, translateX: '-4px' },
						duration: 0
					}}
				>
					{toasts.map(toast => (
						<div key={toast.id} className="toast-wrapper">
							<Toast onRemove={() => this.onRemoveClick(toast.id)} {...toast} />
						</div>
					))}
				</VelocityTransitionGroup>
			</div>
		)
	}
}