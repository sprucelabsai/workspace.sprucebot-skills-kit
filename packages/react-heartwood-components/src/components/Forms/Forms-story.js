// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	text,
	boolean,
	object,
	number
} from '@storybook/addon-knobs/react'
import Container from '../Layout/Container/Container'
import Button from '../Button/Button'
import {
	Autosuggest,
	Checkbox,
	DatePicker,
	DomainInput,
	PhoneInput,
	Radio,
	Search,
	Select,
	Slider,
	Stars,
	Tag,
	TextArea,
	TextInput,
	Toggle
} from './index'
import countries from '../../../.storybook/data/countries'

const renderSuggestion = (suggestion: any) => {
	if (suggestion.isEmptyMessage) {
		return (
			<div className="autosuggest__no-results">
				<p className="autosuggest__no-results-title">
					No matching countries found.
				</p>
				<p className="autosuggest__no-results-subtitle">
					Please adjust your search and try again.
				</p>
			</div>
		)
	}
	return (
		<Button
			isSmall
			className="autosuggest__list-item-inner"
			text={suggestion.text}
		/>
	)
}

const stories = storiesOf('Forms', module)

stories.addDecorator(withKnobs)

stories
	.add('Autosuggest', () => (
		<Container size="small">
			<Autosuggest
				inputPre={object('inputPre', {
					label: 'Country'
				})}
				inputHelper={object('inputHelper', {
					helper: 'We use this information to improve your shopping experience.'
				})}
				placeholder={text('placeholder', 'Select your country')}
				defaultSuggestions={object('defaultSuggestions', countries)}
				shouldRenderSuggestions={() => true}
				renderSuggestion={renderSuggestion}
				getSuggestionValue={value => value.text}
				getSuggestions={value => {
					const results = countries.filter(
						suggestion =>
							suggestion.text.toLowerCase().slice(0, value.length) ===
							value.toLowerCase()
					)
					// Here you could add click events to buttons or whatever else they need
					// No Results Message
					if (results.length === 0) {
						return [
							{
								text: 'NO RESULTS',
								isEmptyMessage: true
							}
						]
					}
					return results
				}}
			/>
		</Container>
	))
	.add('Text Input', () => (
		<Fragment>
			<Container size="small">
				<TextInput
					type="text"
					id={text('id', 'input')}
					name={text('name', 'inputName')}
					label={text('label', 'First Name')}
					postLabel={text('postLabel', '')}
					placeholder={text('placeholder', 'i.e. Annie')}
					defaultValue={text('defaultValue', '')}
					error={text('error', '')}
					helper={text(
						'helper',
						'Let me help you understand why we are asking for this.'
					)}
					readOnly={boolean('readOnly', false)}
					isSmall={boolean('isSmall', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Text Area', () => (
		<Fragment>
			<Container size="small">
				<TextArea
					id={text('id', 'input')}
					name={text('name', 'inputName')}
					label={text('label', 'Category')}
					postLabel={text('postLabel', '')}
					placeholder={text('placeholder', 'Optional category description…')}
					defaultValue={text('defaultValue', '')}
					error={text('error', '')}
					helper={text('helper', '')}
					readOnly={boolean('readOnly', false)}
					{...object('...rest', {})}
				/>
			</Container>
		</Fragment>
	))
	.add('Search', () => (
		<Fragment>
			<Container size="small">
				<Search
					type="text"
					placeholder={text('placeholder', 'Search for anything…')}
					readOnly={boolean('readOnly', false)}
					isSmall={boolean('isSmall', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Phone Number', () => (
		<Fragment>
			<Container size="small">
				<PhoneInput
					label={text('label', 'Phone Number')}
					placeholder={text('placeholder', '(555) 555-5555')}
					isSmall={boolean('isSmall', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Subdomain', () => (
		<Fragment>
			<Container size="small">
				<DomainInput
					label={text('label', 'Shopify Store URL')}
					placeholder={text('placeholder', 'my-shopify-store')}
					appendix={text('appendix', '.myshopify.com')}
				/>
			</Container>
		</Fragment>
	))
	.add('Radio', () => (
		<Fragment>
			<Container size="small">
				<Radio
					className="l-mb-xsmall"
					id="option-one"
					name="radio"
					label={text('label: option one', 'Option One')}
					postText={text('postText: option one', '')}
				/>
				<Radio
					className="l-mb-xsmall"
					id="option-two"
					name="radio"
					label={text('label: option two', 'Option Two')}
					postText={text('postText: option two', '')}
				/>
				<Radio
					className="l-mb-xsmall"
					id="option-three"
					name="radio"
					label={text('label: option three', 'Option Three')}
					postText={text('postText: option three', '')}
				/>
			</Container>
		</Fragment>
	))
	.add('Checkbox', () => (
		<Fragment>
			<Container size="small">
				<Checkbox
					className="l-mb-xsmall"
					id="option-one"
					name="optionOne"
					label={text('label: option one', 'Option One')}
					postText={text('postText: option one', '')}
				/>
				<Checkbox
					className="l-mb-xsmall"
					id="option-two"
					name="optionTwo"
					label={text('label: option two', 'Option Two')}
					postText={text('postText: option two', '')}
				/>
				<Checkbox
					className="l-mb-xsmall"
					id="option-three"
					name="optionThree"
					label={text('label: option three', 'Option Three')}
					postText={text('postText: option three', '')}
					isIndeterminate
				/>
			</Container>
		</Fragment>
	))
	.add('Toggle', () => (
		<Fragment>
			<Container size="small">
				<Toggle
					id={text('id', 'toggle')}
					name={text('name', 'toggle')}
					postText={text('postText', '')}
					className={text('className', '')}
				/>
			</Container>
		</Fragment>
	))
	.add('Tag', () => (
		<Fragment>
			<Container size="small">
				<Tag
					text={text('text', 'Barber Services')}
					isSmall={boolean('isSmall', false)}
					className={text('className', 'l-mr-small l-mb-small')}
				/>
				<Tag
					kind="secondary"
					text={text('text', 'Barber Services')}
					isSmall={boolean('isSmall', false)}
					className={text('className', 'l-mr-small l-mb-small')}
				/>
			</Container>
		</Fragment>
	))
	.add('Slider', () => (
		<Fragment>
			<Container size="small">
				<Slider
					id={text('id', 'slider')}
					name={text('name', 'slider')}
					min={number('min', 0)}
					max={number('max', 200)}
					value={number('value', 100)}
					label={text('label', 'Scale')}
					postLabel={text('postLabel', '100%')}
				/>
			</Container>
		</Fragment>
	))
	.add('Select', () => (
		<Fragment>
			<Container size="small">
				<Select
					label={text('label', 'Country')}
					id={text('id', 'country')}
					options={object('options', {
						us: 'United States',
						ca: 'Canada',
						nj: 'New Jersey'
					})}
					isSimple={boolean('isSimple', false)}
					helper={text('helper', '')}
					error={text('error', '')}
					disabled={boolean('disabled', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Date Picker', () => (
		<DatePicker
			id={text('id', 'test')}
			numberOfMonths={number('numberOfMonths', 1)}
		/>
	))
	.add('Stars', () => <Stars />)
