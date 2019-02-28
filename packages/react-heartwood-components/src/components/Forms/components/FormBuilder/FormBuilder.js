// @flow
import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'
import FormInner from './components/FormInner/FormInner'
import Card, { CardBody, CardHeader } from '../../../Card'
import Layout, { LayoutSection } from '../../../Layout'
import { SaveBar } from '../../../Core'
import Button from '../../../Button/Button'
import Modal from '../../../Modal/Modal'

import type { FormInnerFieldProps } from './components/FormInner/FormInner'
import type { FormLayoutProps } from '../FormLayout/FormLayout'
import type { Props as ButtonProps } from '../../../Button/Button'

type SectionProps = {
	/** Unique id for the section */
	id: string,

	/** Optional title to show at the top of the card */
	title?: string,

	/** Fields for this card */
	fields: Array<FormInnerFieldProps & { currentValue: any }>
}

type Props = {
	/** Determines how the form should be build. Default builds a simple form */
	kind?: 'default' | 'page' | 'modal',

	/** Initial values to be passed into the form */
	initialValues: Object,

	/** Submit handler */
	onSubmit: Function,

	/** Use sections when the form to be built is a full page */
	sections: Array<SectionProps>,

	/** Form layout props */
	formLayout: FormLayoutProps,

	/** Validation handler. This isn't needed when the form is made of toggles only. */
	validate?: Function,

	/** Optional when rendering a primary cta in the form */
	primaryCTA?: ButtonProps,

	/** Optional when using a secondary cta in the form */
	secondaryCTA?: ButtonProps
}

const FormBuilder = (props: Props) => {
	const {
		kind,
		onSubmit,
		sections,
		formLayout,
		primaryCTA,
		secondaryCTA,
		validate
	} = props

	const initialValues = sections.reduce((values, section) => {
		values = section.fields.reduce((values, field) => {
			values[field.name] = field.currentValue
			return values
		}, values)

		return values
	}, {})

	return (
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={onSubmit}
			validateOnBlur={true}
			validateOnChange={false}
			render={props => {
				const {
					handleSubmit,
					handleReset,
					dirty,
					isValid,
					isSubmitting
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
													fields={section.fields}
													formikProps={props}
												/>
											</CardBody>
										</Card>
									</LayoutSection>
								))}
								<SaveBar
									isVisible={dirty}
									onSave={handleSubmit}
									onDiscard={handleReset}
									isSaveDisabled={!isValid}
									isSaving={isSubmitting}
									isDiscardDisabled={isSubmitting}
								/>
								{/* NOTE: The form won't submit on enter key pressed without this hidden button */}
								<Button
									type="submit"
									text="submit"
									style={{ display: 'none' }}
								/>
							</Layout>
						)}
						{kind === 'default' &&
							sections &&
							sections.length > 0 &&
							sections.map((section, idx) => (
								<FormInner
									key={`section-${idx}`}
									formLayout={formLayout}
									fields={section.fields}
									formikProps={props}
									primaryCTA={primaryCTA}
									secondaryCTA={secondaryCTA}
								/>
							))}
						{kind === 'modal' && (
							<Fragment>
								<Modal.Body>
									{sections &&
										sections.length > 0 &&
										sections.map((section, idx) => (
											<FormInner
												key={`section-${idx}`}
												formLayout={formLayout}
												fields={section.fields}
												formikProps={props}
											/>
										))}
								</Modal.Body>
								{primaryCTA && (
									<Modal.Footer
										primaryAction={{
											...primaryCTA,
											type: 'submit',
											disabled: !isValid || isSubmitting,
											isLoading: isSubmitting
										}}
										secondaryAction={{
											...secondaryCTA,
											disabled: isSubmitting
										}}
									/>
								)}
							</Fragment>
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
