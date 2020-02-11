// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'

type Props = {
	/** Modal children */
	children: Node,

	/** Optional class name */
	className?: string,

	/** Should the content go to the edge of the modal body? */
	fullBleed?: boolean,

	/** Optional height of body */
	height?: string
}

const ModalBody = (props: Props) => (
	<div
		className={cx(
			'modal-body',
			{
				'modal-body--full-bleed': props.fullBleed
			},
			props.className
		)}
		style={{ ...(props.height ? { height: props.height } : {}) }}
	>
		{props.children}
	</div>
)

ModalBody.displayName = 'Modal.Body'
export default ModalBody
