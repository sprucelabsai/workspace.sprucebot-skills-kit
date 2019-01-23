// @flow
import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'
import FormInner from './components/FormInner/FormInner'
import Card, { CardBody } from '../../../Card'
import Layout, { LayoutSection } from '../../../Layout'

import type { FormInnerRowProps } from './components/FormInner/FormInner'
import type { FormLayoutProps } from '../FormLayout/FormLayout'
import type { Props as ButtonProps } from '../../../Button/Button'

type CardProps = {
	id: string,
	rows: Array<FormInnerRowProps>
}

type Props = {
	kind?: 'default' | 'page' | 'modal',
	initialValues: Object,
	onSubmit: Function,
	cards: Array<CardProps>,
	rows: Array<FormInnerRowProps>,
	formLayout: FormLayoutProps,
	validate?: Function,
	primaryCTA?: ButtonProps,
	secondaryCTA?: ButtonProps
}

const FormBuilder = (props: Props) => {
	const {
		kind,
		initialValues,
		onSubmit,
		cards,
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
						{kind === 'page' && cards && cards.length > 0 && (
							<Layout>
								<LayoutSection>
									{cards.map(card => (
										<Card key={card.id}>
											<CardBody>
												<FormInner
													formLayout={formLayout}
													rows={card.rows}
													formikProps={props}
												/>
											</CardBody>
										</Card>
									))}
								</LayoutSection>
							</Layout>
						)}
						{kind === 'default' && (
							<FormInner
								formLayout={formLayout}
								rows={rows}
								formikProps={props}
								primaryCTA={primaryCTA}
								secondaryCTA={secondaryCTA}
							/>
						)}
					</Form>
				)
			}}
		/>
	)
}

FormBuilder.defaultProps = {
	kind: 'default',
	validate: () => null,
	primaryCTA: null,
	secondaryCTA: null
}

export default FormBuilder
