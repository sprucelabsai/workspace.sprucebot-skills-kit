// @flow
import React from 'react'

type Props = {
	children: React.Node
}

const ModalBody = (props: Props) => (
	<div className="modal-body">{props.children}</div>
)

export default ModalBody
