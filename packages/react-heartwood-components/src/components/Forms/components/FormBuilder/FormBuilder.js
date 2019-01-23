// @flow
import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'
import FormInner from './components/FormInner/FormInner'
import Card, { CardBody } from '../../../Card'
import Layout, { LayoutSection } from '../../../Layout'

import type { FormInnerRowProps } from './components/FormInner/FormInner'
import type { FormLayoutProps } from '../FormLayout/FormLayout'
import type { Props as ButtonProps } from '../../../Button/Button'

type Section = {
	id: string,
	rows: Array<FormInnerRowProps>
}

type Props = {
	initialValues: Object,
	onSubmit: Function,
	sections: Array<Section>,
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
		sections,
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
						{sections && sections.length > 0 && (
							<Layout>
								<LayoutSection>
									{sections.map(section => (
										<Card key={section.id}>
											<CardBody>
												<FormInner
													formLayout={formLayout}
													rows={section.rows}
													formikProps={props}
												/>
											</CardBody>
										</Card>
									))}
								</LayoutSection>
							</Layout>
						)}
						<FormInner
							formLayout={formLayout}
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
