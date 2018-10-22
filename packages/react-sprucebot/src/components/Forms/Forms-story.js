// @flow
import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
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

const renderSuggestion = (suggestion: any) => (
	<Button
		isSmall
		className="autosuggest__list-item-inner"
		text={suggestion.text}
	/>
)

const stories = storiesOf('Forms', module)

stories.addDecorator(withKnobs)

stories
	.add('Autosuggest', () => (
		<Container size="small">
			<Autosuggest
				inputPre={{
					label: 'Country'
				}}
				inputHelper={{
					helper: 'We use this information to improve your shopping experience.'
				}}
				placeholder="Select your country"
				defaultSuggestions={countries}
				shouldRenderSuggestions={() => true}
				renderSuggestion={renderSuggestion}
				getSuggestionValue={value => value.text}
				getSuggestions={value =>
					countries.filter(
						suggestion =>
							suggestion.text.toLowerCase().slice(0, value.length) ===
							value.toLowerCase()
					)
				}
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
					label={text('Label', 'First Name')}
					postLabel={text('Post Label', '')}
					placeholder={text('Placeholder', 'i.e. Annie')}
					defaultValue={text('Value', '')}
					error={text('Error Text', '')}
					helper={text(
						'Helper Text',
						'Let me help you understand why we are asking for this.'
					)}
					readOnly={boolean('Read Only', false)}
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
					label={text('Label', 'Category')}
					postLabel={text('Post Label', '')}
					placeholder={text('Placeholder', 'Optional category description…')}
					defaultValue={text('Value', '')}
					error={text('Error Text', '')}
					helper={text('Helper Text', '')}
					readOnly={boolean('Read Only', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Search', () => (
		<Fragment>
			<Container size="small">
				<Search
					type="text"
					placeholder={text('Placeholder', 'Search for anything…')}
					readOnly={boolean('Read Only', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Phone Number', () => (
		<Fragment>
			<Container size="small">
				<PhoneInput label="Phone Number" placeholder="(555) 555-5555" />
			</Container>
		</Fragment>
	))
	.add('Subdomain', () => (
		<Fragment>
			<Container size="small">
				<DomainInput
					label="Shopify Store URL"
					placeholder="my-shopify-store"
					appendix=".myshopify.com"
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
					label={text('Option One', 'Option One')}
					postText={text('Helper One', '')}
				/>
				<Radio
					className="l-mb-xsmall"
					id="option-two"
					name="radio"
					label={text('Option Two', 'Option Two')}
					postText={text('Helper Two', '')}
				/>
				<Radio
					className="l-mb-xsmall"
					id="option-three"
					name="radio"
					label={text('Option Three', 'Option Three')}
					postText={text('Helper Three', '')}
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
					label={text('Option One', 'Option One')}
					postText={text('Helper One', '')}
				/>
				<Checkbox
					className="l-mb-xsmall"
					id="option-two"
					name="optionTwo"
					label={text('Option Two', 'Option Two')}
					postText={text('Helper Two', '')}
				/>
				<Checkbox
					className="l-mb-xsmall"
					id="option-three"
					name="optionThree"
					label={text('Option Three', 'Option Three')}
					postText={text('Helper Three', '')}
					isIndeterminate
				/>
			</Container>
		</Fragment>
	))
	.add('Toggle', () => (
		<Fragment>
			<Container size="small">
				<Toggle id="toggle" name="toggle" postText={text('Post Text', '')} />
			</Container>
		</Fragment>
	))
	.add('Tag', () => (
		<Fragment>
			<Container size="small">
				<Tag
					className="l-mr-small l-mb-small"
					text={text('Text', 'Barber Services')}
					isSmall={boolean('Small', false)}
				/>
				<Tag
					className="l-mr-small l-mb-small"
					kind="secondary"
					text={text('Text', 'Barber Services')}
					isSmall={boolean('Small', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Slider', () => (
		<Fragment>
			<Container size="small">
				<Slider
					id="slider"
					name="slider"
					min={0}
					max={200}
					value={100}
					label="Scale"
					postLabel="100%"
				/>
			</Container>
		</Fragment>
	))
	.add('Select', () => (
		<Fragment>
			<Container size="small">
				<Select
					label={text('Label', 'Country')}
					id="country"
					options={['United States', 'Canada', 'New Jersey']}
					isSimple={boolean('Simple', false)}
					helper={text('Helper', '')}
					error={text('Error', '')}
					disabled={boolean('Disabled', false)}
				/>
			</Container>
		</Fragment>
	))
	.add('Date Picker', () => <DatePicker id="TESTS" numberOfMonths={1} />)
	.add('Stars', () => <Stars />)
