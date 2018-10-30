// @flow
import React from 'react'
import type { Node } from 'react'

type Props = {
	/** Modal children */
	children: Node
}

const ModalBody = (props: Props) => (
	<div className="modal-body">{props.children}</div>
)

export default ModalBody
