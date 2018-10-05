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
	state = {
		isVisible: false
	}

	static defaultProps = {
		leftAlign: false
	}

	handleToggle = () => {
		this.setState(prevState => ({
			isVisible: !prevState.isVisible
		}))
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
			<div className={buttonClass}>
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
