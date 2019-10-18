import { IHWAction, IHWButtonGroup } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React from 'react'
import Button, { ButtonKinds, IButtonProps } from '../Button/Button'

export interface IButtonGroupProps extends Omit<IHWButtonGroup, 'actions'> {
	/** Array of actions to render the group's buttons. */
	actions: IButtonProps[]

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

const ButtonGroup = (props: IButtonGroupProps): React.ReactElement => {
	const { actions, kind, isFullWidth, highlightedIndex, onAction } = props
	const parentClass = cx('button-group', {
		'button-group-segmented': kind === 'segmented',
		'button-group-floating': kind === 'floating',
		'button-group--is-full-width': isFullWidth
	})
	return (
		<ul className={parentClass}>
			{actions.map((action, idx) => {
				return (
					<li
						key={action.id}
						className={cx('button-group__item', {
							'button-group__item--is-highlighted': highlightedIndex === idx
						})}
					>
						<Button
							isFullWidth={kind === 'floating'}
							{...action}
							kind={
								kind === 'floating'
									? ButtonKinds.Simple
									: kind === 'segmented'
									? ButtonKinds.Secondary
									: action.kind
							}
							onAction={onAction}
						/>
					</li>
				)
			})}
		</ul>
	)
}

ButtonGroup.defaultProps = {
	kind: 'default',
	isFullWidth: false,
	highlightedIndex: -1
}

export default ButtonGroup
