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
	/** Unique id for the field */
	id: string,

	/** The type of element to render */
	element: string,

	/** Layout props for the form layout item that wraps the field */
	itemLayout: FormLayoutItemProps,

	/** Optional title to show before the field */
	title?: string,

	/** Optional description to show after the title */
	description?: string
}

export type FormInnerRowProps = {
	/** Unique id for the row */
	id: string,

	/** Fields that are in this row */
	fields: Array<Field>,

	/** Layout props for the form layout group */
	groupLayout: FormLayoutGroupProps
}

export type FormInnerProps = {
	/** Rows in this form */
	rows: Array<Row>,

	/** Layout properties for the form layout */
	formLayout: FormLayoutProps,

	/** Props to pass through from Formik */
	formikProps: FormikProps,

	/** Optional when using a primary cta in the form */
	primaryCTA?: ButtonProps,

	/** Optional when including a secondary cta in the form */
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
		isValid,
		isSubmitting
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
							<Button disabled={isSubmitting} {...secondaryCTA} />
						</FormLayoutItem>
					)}
					<FormLayoutItem>
						<Button
							kind="primary"
							type="submit"
							disabled={!isValid || isSubmitting}
							isLoading={isSubmitting}
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
