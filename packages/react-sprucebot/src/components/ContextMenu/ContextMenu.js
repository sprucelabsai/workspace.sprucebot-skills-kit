// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { VelocityTransitionGroup } from 'velocity-react'
import Button from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Icon from '../../../static/assets/icons/Interface-Essential/Menu/navigation-menu-horizontal.svg'

type Props = {
	actions: Array<{
		text: string
	}>,
	leftAlign?: boolean
}

type State = {
	isVisible: boolean
}

export default class ContextMenu extends Component<Props, State> {
	ref: any
	state = {
		isVisible: false
	}

	static defaultProps = {
		leftAlign: false
	}

	handleHide = (e: any) => {
		if (e.key === 'Escape' || e.target.contains(this.ref)) {
			this.setState(
				{
					isVisible: false
				},
				() => this.manageListeners()
			)
		}
	}

	handleToggle = () => {
		this.setState(
			prevState => ({
				isVisible: !prevState.isVisible
			}),
			() => this.manageListeners()
		)
	}

	manageListeners = () => {
		if (typeof window !== 'undefined') {
			if (this.state.isVisible) {
				window.addEventListener('click', this.handleHide, false)
				window.addEventListener('keyup', this.handleHide, false)
			} else {
				window.removeEventListener('click', this.handleHide, false)
				window.removeEventListener('keyup', this.handleHide, false)
			}
		}
	}

	render() {
		const { isVisible } = this.state
		const { actions, leftAlign } = this.props
		const buttonClass = cx('context-menu', {
			'context-menu--is-visible': isVisible
		})
		const menuClass = cx('context-menu__menu', {
			'context-menu__menu-left': leftAlign
		})
		return (
			<div className={buttonClass} ref={ref => (this.ref = ref)}>
				<Button
					className="context-menu__button"
					onClick={this.handleToggle}
					icon={<Icon className="btn__line-icon" />}
				/>
				<VelocityTransitionGroup
					enter={{
						animation: { opacity: 1, translateY: '4px' },
						duration: 300
					}}
					leave={{
						animation: { opacity: 0, translateY: '12px' },
						duration: 300
					}}
				>
					{isVisible && (
						<div className={menuClass}>
							<ButtonGroup kind="floating" actions={actions} />
						</div>
					)}
				</VelocityTransitionGroup>
			</div>
		)
	}
}
