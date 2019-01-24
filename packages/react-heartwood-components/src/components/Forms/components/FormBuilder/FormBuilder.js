// @flow
import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'
import FormInner from './components/FormInner/FormInner'
import Card, { CardBody, CardHeader } from '../../../Card'
import Layout, { LayoutSection } from '../../../Layout'
import { SaveBar } from '../../../Core'
import Button from '../../../Button/Button'

import type { FormInnerRowProps } from './components/FormInner/FormInner'
import type { FormLayoutProps } from '../FormLayout/FormLayout'
import type { Props as ButtonProps } from '../../../Button/Button'

type SectionProps = {
	id: string,
	title?: string,
	rows: Array<FormInnerRowProps>
}

type Props = {
	kind?: 'default' | 'page' | 'modal',
	initialValues: Object,
	onSubmit: Function,
	sections: Array<SectionProps>,
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
				const {
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					dirty,
					isValid
				} = props
				return (
					<Form className="formbuilder">
						{kind === 'page' && sections && sections.length > 0 && (
							<Layout>
								{sections.map(section => (
									<LayoutSection key={section.id} id={section.id}>
										<Card>
											{section.title && <CardHeader title={section.title} />}
											<CardBody>
												<FormInner
													formLayout={formLayout}
													rows={section.rows}
													formikProps={props}
												/>
											</CardBody>
										</Card>
									</LayoutSection>
								))}
								<SaveBar
									isVisible={dirty}
									onSave={props => onSubmit(props)}
									onDiscard={() => props.resetForm()}
									isSaveDisabled={!isValid}
								/>
								{/* NOTE: The form won't submit on enter key pressed without this hidden button */}
								<Button
									type="submit"
									text="submit"
									style={{ display: 'none' }}
								/>
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
