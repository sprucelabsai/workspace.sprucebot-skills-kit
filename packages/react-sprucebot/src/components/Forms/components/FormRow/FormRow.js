// @flow
import React from 'react'

type Props = {
	children: React.Node
}

const FormRow = (props: Props) => (
	<div className="form-row">{props.children}</div>
)

export default FormRow
