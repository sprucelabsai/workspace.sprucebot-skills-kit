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
import Button from '../../../Button/Button'

import type { FormLayoutProps } from '../FormLayout'
import type { FormLayoutGroupProps } from '../FormLayout/components/FormLayoutGroup'
import type { FormLayoutItemProps } from '../FormLayout/components/FormLayoutItem'
import type { Props as ButtonProps } from '../../../Button/Button'

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
	formLayout: FormLayoutProps,
	validate?: Function,
	primaryCTA?: ButtonProps,
	secondaryCTA?: ButtonProps
}

const FormBuilder = (props: Props) => {
	const {
		initialValues,
		onSubmit,
		rows,
		formLayout,
		primaryCTA,
		secondaryCTA,
		validate
	} = props

	const Elements = {
		textInput: TextInput,
		list: List
	}
	return (
		<Formik
			initialValues={initialValues}
			validate={values => validate(values)}
			onSubmit={onSubmit}
			render={props => {
				const { values, errors, touched, handleChange, handleBlur } = props
				console.log({ props })
				return (
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
																name={field.id}
																onChange={handleChange}
																onBlur={handleBlur}
																value={values[field.id]}
																error={touched[field.id] && errors[field.id]}
																{...rest}
															/>
														)}
													</FormLayoutItem>
												)
											})}
									</FormLayoutGroup>
								))}
							{primaryCTA && (
								<FormLayoutGroup>
									{secondaryCTA && <Button {...secondaryCTA} />}
									<Button
										kind="primary"
										type="submit"
										disabled={!props.isValid}
										{...primaryCTA}
									/>
								</FormLayoutGroup>
							)}
						</FormLayout>
					</Form>
				)
			}}
		/>
	)
}

FormBuilder.defaultProps = {
	validate: () => null,
	primaryCTA: null,
	secondaryCTA: null
}

export default FormBuilder
