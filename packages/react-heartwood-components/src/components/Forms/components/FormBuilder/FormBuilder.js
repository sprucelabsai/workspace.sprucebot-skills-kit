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
import Text from '../../../Text/Text'
import TextStyle from '../../../TextStyle/TextStyle'
import { SaveBar } from '../../../Core'

import type { FormLayoutProps } from '../FormLayout'
import type { FormLayoutGroupProps } from '../FormLayout/components/FormLayoutGroup'
import type { FormLayoutItemProps } from '../FormLayout/components/FormLayoutItem'
import type { Props as ButtonProps } from '../../../Button/Button'

type Field = {
	id: string,
	element: string,
	itemLayout: FormLayoutItemProps,
	title?: string,
	description?: string
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
			onSubmit={props => onSubmit(props)}
			render={props => {
				const { values, errors, touched, handleChange, handleBlur } = props
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
												const { element, title, description, ...rest } = field
												const Handler = Elements[field.element]
												return (
													<FormLayoutItem key={field.id}>
														{title && (
															<TextStyle type="strong">{title}</TextStyle>
														)}
														{description && <Text>{description}</Text>}
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
									{secondaryCTA && (
										<FormLayoutItem>
											<Button {...secondaryCTA} />
										</FormLayoutItem>
									)}
									<FormLayoutItem>
										<Button
											kind="primary"
											type="submit"
											disabled={!props.isValid}
											{...primaryCTA}
										/>
									</FormLayoutItem>
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
