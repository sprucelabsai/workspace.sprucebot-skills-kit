// @flow
import React from 'react'
import cx from 'classnames'
import { InputPre, InputInner, InputHelper } from '../../FormPartials'

type Props = {
	/** Unique identifier */
	id: string,

	/** Optional class */
	className?: string,

	/** Label text */
	label?: string,

	/** Text after label */
	postLabel?: string,

	/** Useful for credit cards */
	kind?: string,

	/** Optional icon to show in the input */
	iconBefore?: any,

	/** Optional icon to show at the end of the input */
	iconAfter?: any,

	/** Optional; helpful for subdomains */
	appendix?: string,

	/** Error text */
	error?: string,

	/** Helper text */
	helper?: string,

	/** Set true to make the input less tall */
	isSmall?: boolean
}

const TextInput = (props: Props) => {
	const {
		id,
		className,
		label,
		postLabel,
		kind,
		iconBefore,
		iconAfter,
		appendix,
		error,
		helper,
		isSmall,
		...rest
	} = props

	const parentClass = cx('text-input', {
		className,
		'text-input--has-error': error,
		'text-input-small': isSmall
	})

	return (
		<div className={parentClass}>
			{label && <InputPre label={label} id={id} postLabel={postLabel} />}
			<InputInner
				kind={kind}
				iconBefore={iconBefore}
				iconAfter={iconAfter}
				appendix={appendix}
				{...rest}
			/>
			{(helper || error) && <InputHelper helper={helper} error={error} />}
		</div>
	)
}

export default TextInput
