// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import StylesProvider from '../../../../../.storybook/StylesProvider'
import Container from '../../../Layout/Container/Container'
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

const business = {
	name: 'Chimera Hair Salon',
	address: '7678 N High St, Denver, CO'
}

stories
	.add('Default', () => <HeaderPrimary STORYBOOKdoNotWrap />)
	.add('Logged In', () => <HeaderPrimary STORYBOOKdoNotWrap user={user} />)
	.add('Logged In to Business', () => (
		<HeaderPrimary STORYBOOKdoNotWrap user={user} business={business} />
	))
