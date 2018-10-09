// @flow
import React from 'react'
import cx from 'classnames'
import { InputPre, InputInner, InputHelper } from '../FormPartials'

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
	helper: ?string
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
		...rest
	} = props

	const parentClass = cx('text-input', {
		className,
		'text-input--has-error': error
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
