// @flow
import React from 'react'
import Button from '../../../../../Button/Button'
import HelpIcon from '../../../../../../../static/assets/icons/Interface-Essential/Help/question-help-square--16w.svg'

type Props = {
	className: string,
	iconClassName: string,
	textClassName: string
}

const HelpButton = (props: Props) => {
	const { className, iconClassName, textClassName } = props
	return (
		<a className={className} href="#" target="_blank" rel="noopener noreferrer">
			<HelpIcon className={iconClassName} />
			<span className={textClassName}>Help</span>
		</a>
	)
}

export default HelpButton
