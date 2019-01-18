// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	text,
	boolean,
	number,
	object
} from '@storybook/addon-knobs/react'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import HeaderPrimary from './HeaderPrimary'
import user01image from '../../../../../static/assets/users/user-01--96w.png'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('Header Primary', module)

stories.addDecorator(ProvideStyles)
stories.addDecorator(withKnobs)

const user = {
	name: 'Madaline Gibson',
	image: user01image,
	tel: '(605) 230-5253'
}

const location = {
	name: 'Chimera Hair Salon at the Point',
	address: '7678 N High St, Denver, CO'
}
const organization = {
	name: 'Chimera Hair Salon',
	image:
		'https://www.logoground.com/uploads/2018130762018-04-113965123chimera%20logo%20chimera%20logo.jpg'
}

stories
	.add('Default', () => (
		<HeaderPrimary
			STORYBOOKdoNotWrap
			isSidebarVisible={boolean('isSidebarVisible', false)}
			toggleSidebarVisibility={() => null}
		/>
	))
	.add('Logged In', () => (
		<HeaderPrimary
			STORYBOOKdoNotWrap
			user={object('user', user)}
			isSidebarVisible={boolean('isSidebarVisible', false)}
			toggleSidebarVisibility={() => null}
			getSearchSuggestionValue={() => null}
			renderSearchSuggestion={() => null}
		/>
	))
	.add('Logged In to Organization', () => (
		<HeaderPrimary
			STORYBOOKdoNotWrap
			user={object('user', user)}
			organization={object('organization', organization)}
			isSidebarVisible={boolean('isSidebarVisible', false)}
			toggleSidebarVisibility={() => null}
			getSearchSuggestionValue={() => null}
			renderSearchSuggestion={() => null}
		/>
	))
	.add('Logged In to location', () => (
		<HeaderPrimary
			STORYBOOKdoNotWrap
			user={object('user', user)}
			organization={object('organization', organization)}
			location={object('location', location)}
			isSidebarVisible={boolean('isSidebarVisible', false)}
			toggleSidebarVisibility={() => null}
			getSearchSuggestionValue={() => null}
			renderSearchSuggestion={() => null}
		/>
	))
	.add('Location, Group Manager', () => (
		<HeaderPrimary
			STORYBOOKdoNotWrap
			user={object('user', user)}
			organization={object('organization', organization)}
			location={object('location', location)}
			isSidebarVisible={boolean('isSidebarVisible', false)}
			toggleSidebarVisibility={() => null}
			getSearchSuggestionValue={() => null}
			renderSearchSuggestion={() => null}
			isLocationManagmentButtonVisible
		/>
	))
	.add('Location, Owner', () => (
		<HeaderPrimary
			STORYBOOKdoNotWrap
			user={object('user', user)}
			organization={object('organization', organization)}
			location={object('location', location)}
			isSidebarVisible={boolean('isSidebarVisible', false)}
			toggleSidebarVisibility={() => null}
			getSearchSuggestionValue={() => null}
			renderSearchSuggestion={() => null}
			isLocationManagmentButtonVisible
			isSkillManagementButtonVisible
			skillsHref="#"
		/>
	))
