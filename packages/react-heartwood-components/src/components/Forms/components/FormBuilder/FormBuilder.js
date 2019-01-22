// @flow
import React from 'react'
import { TextInput } from '../../index'

type Field = {
	element: string
}

type Row = {
	fields: Array<Field>
}

type Props = {
	rows: Array<Row>
}

const Elements = {
	textInput: TextInput
}

const FormBuilder = (props: Props) => {
	const { rows } = props
	return (
		<div>
			{rows &&
				rows.length > 0 &&
				rows.map((row, idx) => (
					<div key={idx}>
						{row.fields &&
							row.fields.length > 0 &&
							row.fields.map((field, ind) => (
								<div key={ind}>{field.element}</div>
							))}
					</div>
				))}
		</div>
	)
}

export default FormBuilder
