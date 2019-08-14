// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	text,
	boolean,
	object,
	number,
	select
} from '@storybook/addon-knobs/react'
import moment from 'moment'
import Button from '../Button/Button'
import {
	Autosuggest,
	Checkbox,
	DatePicker,
	DomainInput,
	DurationInput,
	PhoneInput,
	Radio,
	Search,
	Select,
	Slider,
	Stars,
	Tag,
	TextArea,
	TextInput,
	Toggle,
	FormLayout,
	FormLayoutGroup,
	FormLayoutItem
} from './index'
import countries from '../../../.storybook/data/countries'
import { stringify } from 'querystring'

const spacingOptions = {
	Base: null,
	Tight: 'tight'
}

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
		<Autosuggest
			alwaysRenderSuggestions={false}
			label={text('label', 'Country')}
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
	))
	.add('Autosuggest Search', () => (
		<Autosuggest
			alwaysRenderSuggestions={false}
			placeholder={text('placeholder', 'Search countries…')}
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
			icon={{
				icon: 'search'
			}}
		/>
	))
	.add('Duration Input', () => (
		<DurationInput
			label={stringify('label', 'Duration')}
			placeholder={text('placeholder', 'How long is this going to take?')}
			minMinutes={number('minMinutes', 5)}
			maxMinutes={number('maxMinutes', 60 * 4)}
			skipMinutes={number('skipMinutes', 5)}
			defaultValue={number('defaultValue')}
			onChange={(minutes, e) => console.log(minutes, e)}
		/>
	))
	.add('Text Input', () => (
		<Fragment>
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
		</Fragment>
	))
	.add('Text Area', () => (
		<Fragment>
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
		</Fragment>
	))
	.add('Search', () => (
		<Fragment>
			<Search
				type="text"
				placeholder={text('placeholder', 'Search for anything…')}
				readOnly={boolean('readOnly', false)}
				isSmall={boolean('isSmall', false)}
			/>
		</Fragment>
	))
	.add('Phone Number', () => (
		<Fragment>
			<PhoneInput
				label={text('label', 'Phone Number')}
				placeholder={text('placeholder', '(555) 555-5555')}
				isSmall={boolean('isSmall', false)}
			/>
		</Fragment>
	))
	.add('Subdomain', () => (
		<Fragment>
			<DomainInput
				label={text('label', 'Shopify Store URL')}
				placeholder={text('placeholder', 'my-spruce-org')}
				appendix={text('appendix', '.spruce.ai')}
			/>
		</Fragment>
	))
	.add('Radio', () => (
		<Fragment>
			<Radio
				id="option-one"
				name="radio"
				label={text('label: option one', 'Option One')}
				postText={text('postText: option one', '')}
			/>
			<Radio
				id="option-two"
				name="radio"
				label={text('label: option two', 'Option Two')}
				postText={text('postText: option two', '')}
			/>
			<Radio
				id="option-three"
				name="radio"
				label={text('label: option three', 'Option Three')}
				postText={text('postText: option three', '')}
			/>
		</Fragment>
	))
	.add('Checkbox', () => (
		<Fragment>
			<Checkbox
				id="option-one"
				name="optionOne"
				label={text('label: option one', 'Option One')}
				postText={text('postText: option one', 'Post text one')}
				disabled={boolean('disabled: option one', false)}
			/>
			<Checkbox
				id="option-two"
				name="optionTwo"
				label={text('label: option two', 'Option Two')}
				postText={text('postText: option two', 'Post text two')}
				disabled={boolean('disabled: option two', false)}
			/>
			<Checkbox
				id="option-three"
				name="optionThree"
				label={text('label: option three', 'Option Three')}
				postText={text('postText: option three', 'Post text three')}
				disabled={boolean('disabled: option three', false)}
				isIndeterminate
			/>
		</Fragment>
	))
	.add('Toggle', () => (
		<Fragment>
			<Toggle
				id={text('id', 'toggle')}
				name={text('name', 'toggle')}
				postText={text('postText', '')}
				className={text('className', '')}
			/>
		</Fragment>
	))
	.add('Tag', () => (
		<Fragment>
			<Tag
				text={text('text', 'Barber Services')}
				isSmall={boolean('isSmall', false)}
			/>
			<Tag
				kind="secondary"
				text={text('text', 'Barber Services')}
				isSmall={boolean('isSmall', false)}
			/>
		</Fragment>
	))
	.add('Slider', () => (
		<Fragment>
			<Slider
				id={text('id', 'slider')}
				name={text('name', 'slider')}
				min={number('min', 0)}
				max={number('max', 200)}
				value={number('value', 100)}
				label={text('label', 'Scale')}
				postLabel={text('postLabel', '100%')}
			/>
		</Fragment>
	))
	.add('Select', () => (
		<Fragment>
			<p>
				For controlled usage, default `value` to an empty-string in order to
				display the placeholder.
			</p>

			<Select
				label={text('label', 'Country')}
				placeholder={text('placeholder', 'Select something...')}
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
		</Fragment>
	))
	.add('Date Picker', () => (
		<DatePicker
			numberOfMonths={number('numberOfMonths', 1)}
			kind={select(
				'kind',
				{ singleDate: 'singleDate', dateRange: 'dateRange' },
				'singleDate'
			)}
			onSelectDateRange={({ startDate, endDate }) =>
				console.log(startDate, endDate)
			}
			isDayBlocked={day => day.isBefore(moment().startOf('day'))}
		/>
	))
	.add('Stars', () => <Stars />)
	.add('Form Layout', () => (
		<FormLayout
			spacing={select('spacing', spacingOptions, spacingOptions.Base)}
		>
			<FormLayoutItem>
				<TextInput
					type="text"
					label="Name of Business"
					placeholder="e.g. Annie's Bagels"
				/>
			</FormLayoutItem>
			<FormLayoutGroup>
				<FormLayoutItem>
					<TextInput type="text" label="First Name" placeholder="e.g. Annie" />
				</FormLayoutItem>
				<FormLayoutItem>
					<TextInput type="text" label="Last Name" placeholder="e.g. Smith" />
				</FormLayoutItem>
			</FormLayoutGroup>
			<FormLayoutGroup isCondensed>
				<FormLayoutItem>
					<TextInput type="text" label="Price" />
				</FormLayoutItem>
				<FormLayoutItem>
					<TextInput type="text" label="Duration" />
				</FormLayoutItem>
				<FormLayoutItem>
					<TextInput type="text" label="Commission" />
				</FormLayoutItem>
			</FormLayoutGroup>
		</FormLayout>
	))
