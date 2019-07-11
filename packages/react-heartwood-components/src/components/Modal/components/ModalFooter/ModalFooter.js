// @flow
import React from 'react'
import Button from '../../../Button/Button'
import type { Props as ButtonProps } from '../../../Button/Button'

export type Props = {
	/** The primary action in the footer */
	primaryAction: ButtonProps,

	/** Optional secondary action */
	secondaryAction?: ButtonProps
}

const ModalFooter = (props: Props) => {
	const { primaryAction, secondaryAction } = props
	return (
		<div className="modal-footer">
			<Button kind="primary" {...primaryAction} />
			{secondaryAction && <Button kind="secondary" {...secondaryAction} />}
		</div>
	)
}

export default ModalFooter
