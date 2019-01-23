// @flow
import React from 'react'
import { Formik, Form } from 'formik'
import {
	TextInput,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem
} from '../../index'
import List from '../../../List'

import type { FormLayoutProps } from '../FormLayout'
import type { FormLayoutGroupProps } from '../FormLayout/components/FormLayoutGroup'
import type { FormLayoutItemProps } from '../FormLayout/components/FormLayoutItem'

type Field = {
	id: string,
	element: string,
	itemLayout: FormLayoutItemProps
}

type Row = {
	id: string,
	fields: Array<Field>,
	groupLayout: FormLayoutGroupProps
}

type Props = {
	initialValues: Object,
	onSubmit: Function,
	rows: Array<Row>,
	formLayout: FormLayoutProps
}

const FormBuilder = (props: Props) => {
	const { initialValues, onSubmit, rows, formLayout } = props

	const Elements = {
		textInput: TextInput,
		list: List
	}
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			render={props => (
				<Form>
					<FormLayout {...formLayout}>
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
													{Handler && (
														<Handler
															onChange={props.handleChange}
															onBlur={props.handleBlur}
															{...rest}
														/>
													)}
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
