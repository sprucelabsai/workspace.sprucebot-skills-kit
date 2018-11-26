// @flow
import React from 'react'
import type { Node } from 'react'

type Props = {
	/** Children for this row */
	children: Node
}

const FormRow = (props: Props) => (
	<div className="form-row">{props.children}</div>
)

export default FormRow
