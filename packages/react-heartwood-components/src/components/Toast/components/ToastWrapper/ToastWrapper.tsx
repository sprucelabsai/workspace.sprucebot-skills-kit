import React, { Component } from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import uniqBy from 'lodash/uniqBy'
import Toast from '../../Toast'
import { IToastProps } from '../../Toast'

export interface IToastWrapperProps {
	/** The toasts */
	toasts: IToastProps[]

	/** Handle toast removal */
	handleRemove: Function
}

interface IToastWrapperState {
	toasts: IToastProps[]
	timeouts: any
}

const defaultTimeout = 3000

export default class ToastWrapper extends Component<
	IToastWrapperProps,
	IToastWrapperState
> {
	public state: IToastWrapperState = {
		toasts: [],
		timeouts: {}
	}

	public timeouts = {}

	public static getDerivedStateFromProps(
		props: IToastWrapperProps,
		state: IToastWrapperState
	): { toasts: IToastProps[]; timeouts: any[] } {
		const uniqToasts = uniqBy(props.toasts, 'id')
		const timeouts = { ...state.timeouts }
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

	public onRemoveClick = (id: string | number) => {
		const { timeouts } = this.state
		const { handleRemove } = this.props
		if (timeouts[id]) {
			clearTimeout(timeouts[id])
		}
		handleRemove(id)
	}

	public render(): React.ReactElement {
		const { toasts } = this.state

		return (
			<div className="toasts-wrapper">
				<VelocityTransitionGroup
					enter={{
						animation: {
							opacity: 1,
							translateX: 0
						},
						duration: 300
					}}
					leave={{
						animation: {
							opacity: 0,
							translateX: '-4px'
						},
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
