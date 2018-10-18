// @flow
import React from 'react'
import Button, { Props as ButtonProps } from '../../../Button/Button'

export interface Props {
	primaryAction: { ...ButtonProps };
	secondaryAction?: { ...ButtonProps };
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
