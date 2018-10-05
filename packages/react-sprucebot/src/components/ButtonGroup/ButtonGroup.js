// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../Button/Button'

type Props = {
	actions: Array<Object>,
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
							kind={btnKindKey[kind]}
							isFullWidth={kind === 'floating'}
							{...action}
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
