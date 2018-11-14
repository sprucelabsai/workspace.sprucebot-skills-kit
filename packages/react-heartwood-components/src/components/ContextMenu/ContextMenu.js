// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import { VelocityTransitionGroup } from 'velocity-react'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

import Icon from '../Icon/Icon'
import MoreIcon from '../../../static/assets/icons/Interface-Essential/Menu/navigation-menu-horizontal.svg'

export type Props = {
	/** The actions to be shown on tap/click */
	actions: Array<ButtonProps>,

	/** Set true to left align the menu */
	isLeftAligned?: boolean,

	/** Set the width of the menu. Helpful for longer text in buttons */
	size?: 'medium' | 'large',

	/** Overrides the default icon */
	icon?: any,

	/** Set true to make the button blue */
	isSimple?: boolean
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
		const { actions, isLeftAligned, isSimple, size, icon } = this.props
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
					kind={isSimple ? 'simple' : ''}
					className="context-menu__button"
					onClick={this.handleToggle}
					icon={icon || { customIcon: MoreIcon, isLineIcon: true }}
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
