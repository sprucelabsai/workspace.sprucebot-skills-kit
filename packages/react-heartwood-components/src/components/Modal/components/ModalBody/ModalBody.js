// @flow
import React from 'react'
import type { Node } from 'react'
import cx from 'classnames'

type Props = {
	/** Modal children */
	children: Node,

	/** Optional class name */
	className?: string,

	/** Optional height of body */
	height?: string
}

const ModalBody = (props: Props) => (
	<div
		className={cx('modal-body', props.className)}
		style={{ ...(props.height ? { height: props.height } : {}) }}
	>
		{props.children}
	</div>
)

export default ModalBody
