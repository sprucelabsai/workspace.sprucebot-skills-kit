// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { VelocityTransitionGroup } from 'velocity-react'
import Button, { Props as ButtonProps } from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Icon from '../../../static/assets/icons/Interface-Essential/Menu/navigation-menu-horizontal.svg'

export interface Props {
	actions: Array<ButtonProps>;
	isLeftAligned?: boolean;
	size?: 'medium' | 'large';
	icon?: any;
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
		isLeftAligned: false
	}

	handleClickOutside = (e: any) => {
		if (e.target.contains(this.ref)) {
			this.setState(
				{
					isVisible: false
				},
				() => this.manageListeners()
			)
		}
	}

	handleEscape = (e: any) => {
		if (e.key === 'Escape') {
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
				window.addEventListener('click', this.handleClickOutside, false)
				window.addEventListener('keyup', this.handleEscape, false)
			} else {
				window.removeEventListener('click', this.handleClickOutside, false)
				window.removeEventListener('keyup', this.handleEscape, false)
			}
		}
	}

	render() {
		const { isVisible } = this.state
		const { actions, isLeftAligned, size, icon } = this.props
		const buttonClass = cx('context-menu', {
			'context-menu--is-visible': isVisible
		})
		const menuClass = cx('context-menu__menu', {
			'context-menu__menu-left': isLeftAligned,
			'context-menu__menu-large': size === 'large'
		})
		return (
			<div className={buttonClass} ref={ref => (this.ref = ref)}>
				<Button
					className="context-menu__button"
					onClick={this.handleToggle}
					icon={
						icon ? (
							React.cloneElement(icon, {
								className: 'btn__line-icon'
							})
						) : (
							<Icon className="btn__line-icon" />
						)
					}
				/>
				<VelocityTransitionGroup
					enter={{
						animation: { opacity: 1, translateY: '4px' },
						duration: 200
					}}
					leave={{
						animation: { opacity: 0, translateY: '12px' },
						duration: 200
					}}
				>
					{isVisible && (
						<div className={menuClass}>
							<ButtonGroup
								kind="floating"
								actions={actions.map(action => {
									const btnAction = Object.assign({}, action)
									btnAction.className = 'context-menu__item-btn'
									return btnAction
								})}
							/>
						</div>
					)}
				</VelocityTransitionGroup>
			</div>
		)
	}
}
