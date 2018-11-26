// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../../Button/Button'
import CloseIcon from '../../../../../static/assets/icons/ic_close.svg'

type Props = {
	/** Tag text */
	text: string,

	/** Additional parent class */
	className: string,

	/** Sets the tag variation */
	kind?: 'primary' | 'secondary',

	/** Set true to make the tag smaller */
	isSmall?: boolean
}

const Tag = (props: Props) => {
	const { text, kind, className, isSmall } = props
	const parentClass = cx('tag', className, {
		'tag-primary': kind === 'primary',
		'tag-secondary': kind === 'secondary',
		'tag-small': isSmall
	})
	return (
		<div className={parentClass}>
			<span className="tag__text">{text}</span>
			<Button
				className="tag__btn"
				icon={{
					customIcon: CloseIcon
				}}
			/>
		</div>
	)
}

Tag.defaultProps = {
	kind: 'primary',
	isSmall: false
}

export default Tag
