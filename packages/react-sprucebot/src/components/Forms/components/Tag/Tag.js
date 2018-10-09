// @flow
import React from 'react'
import cx from 'classnames'
import Button from '../../Button/Button'
import CloseIcon from '../../../../static/assets/icons/ic_close.svg'

type Props = {
	text: string,
	className: string,
	kind?: 'primary' | 'secondary',
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
			<Button className="tag__btn" icon={<CloseIcon />} />
		</div>
	)
}

Tag.defaultProps = {
	kind: 'primary',
	isSmall: false
}

export default Tag
