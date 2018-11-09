// @flow
import React from 'react'
import cx from 'classnames'
import { InputPre, InputHelper } from '../../FormPartials'

type Props = {
	/** Unique identifier */
	id: string,

	/** Additional class */
	className?: string,

	/** Input label */
	label?: string,

	/** Text after label */
	postLabel?: string,

	/** Error text */
	error?: string,

	/** Helper text */
	helper?: string,

	/** Set true to make the text area resizeable */
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
