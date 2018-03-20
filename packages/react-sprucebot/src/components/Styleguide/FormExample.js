import React from 'react'
import { reduxForm, Field, propTypes, SubmissionError } from 'redux-form'

import BotText from '../BotText/BotText'
import Pre from '../Pre/Pre'
import Button from '../Button/Button'
import LinkPile from '../LinkPile/LinkPile'
import Form from '../Form/Form'
import { SectionHeading, Paragraph as P } from '../Typography/Typography'
import InputField from '../InputField/InputField'
import TextArea from '../TextArea/TextArea'
import SelectField from '../SelectField/SelectField'

async function onSubmit(values) {
	console.log('Redux Form Submit: ', values)
	return new Promise((resolve, reject) => {
		const yes = confirm('Form Success or Fail?')
		let done
		if (yes) {
			done = resolve
		} else {
			done = reject
		}
		setTimeout(done, 1500)
	})
		.then(() => {
			return { success: 'Success!' }
		})
		.catch(() => {
			throw new SubmissionError({
				firstName: 'Async Validation Error',
				_error: 'Submit Failed'
			})
		})
}
const required = value => (value ? undefined : 'Required')
const minLength = min => value =>
	value && value.length < min ? `Must be ${min} characters or more` : undefined
// Important to invoke this function outside #render()
const minLength8 = minLength(8)

function FormExample({ handleSubmit, reset, pristine, submitting, error }) {
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<BotText>
				Using{' '}
				<a href="https://redux-form.com" target="_blank">
					redux-form
				</a>{' '}
				makes it easy to validate form state and handle server side errors on
				form submission. Go ahead, try out the example:
			</BotText>
			<SectionHeading>Example Heading</SectionHeading>
			<Field name="firstName" label="First Name" component={InputField} />
			<Field name="email" label="Email" component={InputField} />
			<Field
				name="password"
				type="password"
				label="Password"
				validate={[required, minLength8]}
				component={InputField}
			/>
			<Field
				name="description"
				type="textarea"
				label="Growing multiline input"
				finePrint="This is helpful fine print."
				component={TextArea}
			/>

			<Field
				name="dropdown"
				label="Dropdowns Rock!"
				validate={required}
				component={SelectField}
			>
				<option value={null}>Select a value</option>
				<option value="value1">Value 1</option>
				<option value="value2">Value 2</option>
			</Field>

			{error && <P>{error}</P>}
			<LinkPile>
				<Button alt disabled={pristine || submitting} onClick={reset}>
					Reset Form
				</Button>
				<Button primary type="submit" disabled={submitting} busy={submitting}>
					Submit
				</Button>
			</LinkPile>
			<SectionHeading>Basic Form Submission</SectionHeading>
			<BotText>
				Notice you pass the form an `initialValues` which sets default values
				for the form. When a user submits the form is your chance to persist
				those values to your server and other reducers. When the `onSubmit` is
				executed, you can expect that client side validations have ran.
			</BotText>
			<Pre>{`
import { reduxForm, Field, propTypes, SubmissionError } from 'redux-form'

const required = value => (value ? undefined : 'Required') // Validator

function FormExample({ handleSubmit, reset, pristine, submitting, error }) {
	const onSubmit = (values) => console.log('Your async submit function. Submitted values: ', values)
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<SectionHeading>Example Heading</SectionHeading>
			<Field name="firstName" label="First Name" component={InputField} />
			{error && <P>{error}</P>}
			<LinkPile>
				<Button alt disabled={pristine || submitting} onClick={reset}>
					Reset Form
				</Button>
				<Button primary type="submit" disabled={submitting} busy={submitting}>
					Submit
				</Button>
			</LinkPile>
		</Form>
	)}
export default reduxForm({
	form: 'form-example',
	initialValues: {
		firstName: 'Sprucebot'
	}
})(FormExample)`}</Pre>
			<Pre
			>{`<Field name="firstName" label="First Name" component={InputField} />`}</Pre>
			<Pre>{`<Field name="email" label="Email" component={InputField} />`}</Pre>
			<Pre>{`<Field
	name="password"
	type="password"
	label="Password"
	validate={[required, minLength8]}
	component={InputField}
/>`}</Pre>
			<Pre>{`<Field
	name="description"
	type="textarea"
	label="Growing multiline input"
	finePrint="This is helpful fine print."
	component={TextArea}
/>`}</Pre>
			<Pre>{`<Field
	name="dropdown"
	label="Dropdowns Rock!"
	validate={required}
	component={SelectField}
>
	<option value={null}>Select a value</option>
	<option value="value1">Value 1</option>
	<option value="value2">Value 2</option>
</Field>`}</Pre>
		</Form>
	)
}

FormExample.propTypes = {
	...propTypes
}

export default reduxForm({
	form: 'form-example',
	initialValues: {
		firstName: 'Sprucebot'
	}
})(FormExample)
