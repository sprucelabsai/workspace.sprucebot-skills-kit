import React from 'react'
import cx from 'classnames'
import Button, { IButtonProps, ButtonKinds } from '../Button/Button'
import { IHWButtonGroup } from '@sprucelabs/spruce-types'

export interface IButtonGroupProps extends Omit<IHWButtonGroup, 'actions'> {
	/** Array of actions to render the group's buttons. */
	actions: IButtonProps[]
}

const ButtonGroup = (props: IButtonGroupProps): React.ReactElement => {
	const { actions, kind, isFullWidth, highlightedIndex } = props
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
