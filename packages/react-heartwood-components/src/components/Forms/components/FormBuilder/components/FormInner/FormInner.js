// @flow
import React from 'react'

import {
	TextInput,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem,
	Select,
	DurationInput
} from '../../../../index'

import List from '../../../../../List'

import Button from '../../../../../Button/Button'

import type { FormikProps } from 'formik'
import type { FormLayoutProps } from '../../../FormLayout/FormLayout'
import type { Props as ButtonProps } from '../../../../../Button/Button'
import type { Props as ToggleProps } from '../../../../components/Toggle/Toggle'

export type FormInnerFieldProps = {
	/** Unique name/id for the field */
	name: string,

	/** The type of element to render */
	type: string,

	/** Props to pass through to the field */
	props?: Object
}

export type FormInnerProps = {
	/** Fields in this form */
	fields: Array<FormInnerFieldProps>,

	/** Layout properties for the form layout */
	formLayout: FormLayoutProps,

	/** Props to pass through from Formik */
	formikProps: FormikProps,

	/** Optional when using a primary cta in the form */
	primaryCTA?: ?ButtonProps,

	/** Optional when including a secondary cta in the form */
	secondaryCTA?: ?ButtonProps,

	/** handle some on change */
	onChange?: Function
}

type BooleanProps = ToggleProps & {
	name: string,
	label?: string,
	value?: boolean,
	helper?: string,
	defaultValue?: boolean,
	onBlur: Function,
	formikProps: FormikProps
}

class BooleanField extends React.PureComponent<BooleanProps> {
	handleChange = e => {
		const { onBlur, name } = this.props
		const {
			formikProps: { setFieldValue }
		} = this.props
		setFieldValue(name, e.target.checked)
		onBlur(e)
	}
	render() {
		const { label, helper, value, ...rest } = this.props
		const toggleId = this.props.name || ''
		const toggleProps = { ...rest, onChange: this.handleChange }
		if (value) {
			toggleProps.defaultChecked = true
		}

		return (
			<List
				items={[
					{
						title: label,
						subtitle: helper,
						toggleId,
						toggleProps
					}
				]}
			/>
		)
	}
}

class FormInner extends React.PureComponent<FormInnerProps> {
	static defaultProps = {
		primaryCTA: null,
		secondaryCTA: null
	}

	handleChange = (
		name: string,
		type: string,
		eOrValue: KeyboardEvent | any,
		eOrNull: KeyboardEvent | null
	) => {
		let value: any = eOrNull ? eOrValue : eOrValue.target.value
		let shouldValidate = true
		switch (type) {
			case 'boolean':
				value = value === 'on'
				shouldValidate = false // it can only be valid values
				break
		}
		const {
			formikProps: { setFieldValue }
		} = this.props

		setFieldValue(name, value, shouldValidate)
		const { onChange } = this.props
		onChange && onChange(value, eOrNull || eOrValue)
	}

	renderChild = (child: FormInnerFieldProps) => {
		const Elements = {
			text: TextInput,
			boolean: BooleanField,
			select: Select,
			duration: DurationInput
		}
		const { formikProps } = this.props
		const Handler = (child && child.type && Elements[child.type]) || TextInput
		const props = { ...child.props, name: child.name, formikProps }
		return !Handler.prototype.render ? Handler(props) : <Handler {...props} />
	}

	render() {
		const {
			formLayout,
			formikProps,
			fields,
			primaryCTA,
			secondaryCTA
		} = this.props

		const {
			handleBlur,
			values,
			errors,
			touched,
			isValid,
			isSubmitting
		} = formikProps

		return (
			<FormLayout {...formLayout}>
				{fields &&
					fields.length > 0 &&
					fields.map(field => {
						const { type, props } = field
						return (
							<FormLayoutItem key={field.name}>
								{this.renderChild({
									type,
									name: field.name,
									props: {
										...props,
										onChange: (eOrValue, eOrNull) => {
											this.handleChange(
												field.name,
												field.type,
												eOrValue,
												eOrNull
											)
										},
										onBlur: handleBlur,
										value: values ? values[field.name] : '',
										error: touched[field.name] && errors[field.name]
									}
								})}
							</FormLayoutItem>
						)
					})}
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
}

export default FormInner
