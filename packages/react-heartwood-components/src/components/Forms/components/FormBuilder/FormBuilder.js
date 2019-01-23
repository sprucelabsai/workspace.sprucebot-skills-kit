// @flow
import React from 'react'
import { Formik, Form } from 'formik'
import FormInner from './components/FormInner/FormInner'

import type { FormInnerProps } from './components/FormInner/FormInner'

type Props = {
	initialValues: Object,
	onSubmit: Function,
	rows: Array<FormInnerRowProps>,
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

	return (
		<Formik
			initialValues={initialValues}
			validate={values => validate(values)}
			onSubmit={props => onSubmit(props)}
			render={props => {
				const { values, errors, touched, handleChange, handleBlur } = props
				return (
					<Form className="formbuilder">
						<FormInner
							formLayout={formLayout}
							initialValues={initialValues}
							rows={rows}
							formikProps={props}
							primaryCTA={primaryCTA}
							secondaryCTA={secondaryCTA}
						/>
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
