// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'
import type { Props as ButtonProps } from '../Button/Button'

type Props = {
	/** Array of actions to render the group's buttons. */
	actions: Array<ButtonProps>,

	/** Visual appearance of the group. */
	kind?: 'default' | 'segmented' | 'floating'
}

const ButtonGroup = (props: Props) => {
	const { actions, kind } = props
	const parentClass = cx('button-group', {
		'button-group-segmented': kind === 'segmented',
		'button-group-floating': kind === 'floating'
	})
	return (
		<ul className={parentClass}>
			{actions.map(action => {
				const btnKindKey = {
					default: action.kind,
					segmented: 'secondary',
					floating: 'simple'
				}
				return (
					<li key={action.text} className="button-group__item">
						<Button
							kind={kind ? btnKindKey[kind] : ''}
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
	kind: 'default'
}

export default ButtonGroup
