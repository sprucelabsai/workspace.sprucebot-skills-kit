// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'

type Props = {
	/** Array of actions to render the group's buttons. */
	actions: Array<ButtonProps>,

	/** Visual appearance of the group. */
	kind?: 'default' | 'segmented' | 'floating',

	/** Set true to fill parent width */
	isFullWidth?: boolean
}

const ButtonGroup = (props: Props) => {
	const { actions, kind, isFullWidth } = props
	const parentClass = cx('button-group', {
		'button-group-segmented': kind === 'segmented',
		'button-group-floating': kind === 'floating',
		'button-group--is-full-width': isFullWidth
	})
	return (
		<ul className={parentClass}>
			{actions.map(action => {
				return (
					<li key={action.text} className="button-group__item">
						<Button
							isFullWidth={kind === 'floating'}
							{...action}
							kind={
								kind === 'floating'
									? 'simple'
									: kind === 'segmented'
									? 'secondary'
									: action.kind
							}
						/>
					</li>
				)
			})}
		</ul>
	)
}

ButtonGroup.defaultProps = {
	kind: 'default',
	isFullWidth: false
}

export default ButtonGroup
