// @flow
import React from 'react'
import {
	TextInput,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem
} from '../../../../index'
import List from '../../../../../List'
import Text from '../../../../../Text/Text'
import TextStyle from '../../../../../TextStyle/TextStyle'
import Button from '../../../../../Button/Button'

import type { FormikProps } from 'formik'
import type { FormLayoutProps } from '../FormLayout'
import type { FormLayoutGroupProps } from '../FormLayout/components/FormLayoutGroup'
import type { FormLayoutItemProps } from '../FormLayout/components/FormLayoutItem'
import type { Props as ButtonProps } from '../../../../../Button/Button'

export type FormInnerFieldProps = {
	id: string,
	element: string,
	itemLayout: FormLayoutItemProps,
	title?: string,
	description?: string
}

export type FormInnerRowProps = {
	id: string,
	fields: Array<Field>,
	groupLayout: FormLayoutGroupProps
}

export type FormInnerProps = {
	rows: Array<Row>,
	formLayout: FormLayoutProps,
	formikProps: FormikProps,
	primaryCTA?: ButtonProps,
	secondaryCTA?: ButtonProps
}

const FormInner = (props: Props) => {
	const { rows, formLayout, formikProps, primaryCTA, secondaryCTA } = props
	const {
		handleChange,
		handleBlur,
		values,
		errors,
		touched,
		isValid
	} = formikProps

	const Elements = {
		textInput: TextInput,
		list: List
	}

	return (
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
										{title && <TextStyle type="strong">{title}</TextStyle>}
										{description && <Text>{description}</Text>}
										<Handler
											name={field.id}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values[field.id]}
											error={touched[field.id] && errors[field.id]}
											{...rest}
										/>
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
							disabled={!isValid}
							{...primaryCTA}
						/>
					</FormLayoutItem>
				</FormLayoutGroup>
			)}
		</FormLayout>
	)
}

FormInner.defaultProps = {
	primaryCTA: null,
	secondaryCTA: null
}

export default FormInner
