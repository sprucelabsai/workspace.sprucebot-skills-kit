import { IHWAction, IHWButtonGroup } from '@sprucelabs/spruce-types'
import cx from 'classnames'
import React from 'react'
import Button, { ButtonKinds, Action } from '../Button/Button'
import { unionArray } from '../..'

export interface IButtonGroupProps extends Omit<IHWButtonGroup, 'actions'> {
	/** Array of actions to render the group's buttons. */
	actions: Action[]

	/** optional, provide a handler for Actions */
	onAction?: (action: IHWAction) => any
}

const ButtonGroup = (
	props: IButtonGroupProps | IHWButtonGroup
): React.ReactElement => {
	const reactHeartwoodProps = props as IButtonGroupProps
	const commonProps = props as IHWButtonGroup

	const { actions, kind, isFullWidth, highlightedIndex } = commonProps
	const { onAction } = reactHeartwoodProps

	const parentClass = cx('button-group', {
		'button-group-segmented': kind === 'segmented',
		'button-group-floating': kind === 'floating',
		'button-group--is-full-width': isFullWidth
	})
	return (
		<ul className={parentClass}>
			{unionArray(actions).map((action, idx) => {
				return (
					<li
						key={action.id}
						className={cx('button-group__item', {
							'button-group__item--is-highlighted': highlightedIndex === idx
						})}
					>
						<Button
							isFullWidth={kind === 'floating'}
							// TODO: This is necessary since the older "action" interface
							// (meaning a button) doesn't work with the newer IHWAction
							// interface. We need to refactor the legacy case broadly to
							// remove this.
							action={(action as unknown) as IHWAction}
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
