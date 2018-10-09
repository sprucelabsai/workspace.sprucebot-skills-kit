// @flow
import React from 'react'
import cx from 'classnames'
import { InputPre, InputHelper } from '../../FormPartials'

type Props = {
	id: string,
	className: ?string,
	label: ?string,
	postLabel: ?string,
	kind: ?string,
	iconBefore: ?any,
	iconAfter: ?any,
	appendix: ?string,
	error: ?string,
	helper: ?string,
	resizeable?: boolean
}

const TextArea = (props: Props) => {
	const {
		id,
		className,
		label,
		postLabel,
		error,
		helper,
		resizeable,
		...rest
	} = props

	const parentClass = cx('text-input', {
		className,
		'text-input--has-error': error
	})

	const inputClass = cx('text-area__input', {
		'text-area__input-no-resize': !resizeable
	})

	return (
		<div className={parentClass}>
			{label && <InputPre label={label} id={id} postLabel={postLabel} />}
			<textarea className={inputClass} {...rest} />
			{(helper || error) && <InputHelper helper={helper} error={error} />}
		</div>
	)
}

TextArea.defaultProps = {
	resizeable: false
}

export default TextArea
