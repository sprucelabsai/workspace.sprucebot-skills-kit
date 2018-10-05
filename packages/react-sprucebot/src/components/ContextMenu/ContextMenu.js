// @flow
import React, { Component } from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import ButtonGroup from '../ButtonGroup/ButtonGroup'

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
					kind="simple"
					className="context-menu__button"
					onClick={this.handleToggle}
					text={isVisible ? 'Hide' : 'Show'}
				/>
				{isVisible && (
					<div className={menuClass}>
						<ButtonGroup kind="floating" actions={actions} />
					</div>
				)}
			</div>
		)
	}
}
