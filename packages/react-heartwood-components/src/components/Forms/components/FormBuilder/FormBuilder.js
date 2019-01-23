// @flow
import React from 'react'
import { Formik, Form } from 'formik'
import {
	TextInput,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem
} from '../../index'

type Field = {
	id: string,
	element: string
}

type Row = {
	id: string,
	fields: Array<Field>
}

type Props = {
	initialValues: Object,
	onSubmit: Function,
	rows: Array<Row>
}

const FormBuilder = (props: Props) => {
	const { initialValues, onSubmit, rows } = props

	const Elements = {
		textInput: TextInput
	}
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			render={props => (
				<Form>
					<FormLayout>
						{rows &&
							rows.length > 0 &&
							rows.map(row => (
								<FormLayoutGroup key={row.id}>
									{row.fields &&
										row.fields.length > 0 &&
										row.fields.map(field => {
											const { element, ...rest } = field
											const Handler = Elements[field.element]
											return (
												<FormLayoutItem key={field.id}>
													{Handler && <Handler {...rest} />}
												</FormLayoutItem>
											)
										})}
								</FormLayoutGroup>
							))}
					</FormLayout>
				</Form>
			)}
		/>
	)
}

export default FormBuilder
