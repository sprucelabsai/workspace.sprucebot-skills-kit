import React from 'react'
import Button from './Button'
import { shallow } from 'enzyme'
import Heartwood from '@sprucelabs/heartwood-components'
import diffable from 'diffable-html'
import fractal from '@sprucelabs/heartwood-components/fractal'

describe('Button Tests', () => {
	beforeAll(() => {
		return fractal.load()
	})
	describe('Primary Button', () => {
		it('Should render correctly', () => {
			return fractal.components
				.render('@primary-button', {
					text: 'Button',
					className: `${Heartwood.Classes.ButtonPrimary}`,
					type: 'button',
					Classes: Heartwood.Classes
				})
				.then(html => {
					const hwComponent = diffable(html)
					const renderedComponent = shallow(
						<Button text={'Button'} kind={'primary'} />
					)
					expect(diffable(renderedComponent.html())).toEqual(hwComponent)
				})
		})
	})
	describe('Secondary Button', () => {
		it('Should render correctly', () => {
			return fractal.components
				.render('@secondary-button', {
					text: 'Button',
					className: `${Heartwood.Classes.ButtonSecondary}`,
					type: 'button',
					Classes: Heartwood.Classes
				})
				.then(html => {
					const hwComponent = diffable(html)
					const renderedComponent = shallow(
						<Button text={'Button'} kind={'secondary'} />
					)
					expect(diffable(renderedComponent.html())).toEqual(hwComponent)
				})
		})
	})
	describe('Simple Button', () => {
		it('Should render correctly', () => {
			return fractal.components
				.render('@simple-button', {
					text: 'Button',
					className: `${Heartwood.Classes.ButtonSimple}`,
					type: 'button',
					Classes: Heartwood.Classes
				})
				.then(html => {
					const hwComponent = diffable(html)
					const renderedComponent = shallow(
						<Button text={'Button'} kind={'simple'} />
					)
					expect(diffable(renderedComponent.html())).toEqual(hwComponent)
				})
		})
	})
	describe('Caution Button', () => {
		it('Should render correctly', () => {
			return fractal.components
				.render('@caution-button', {
					text: 'Button',
					className: `${Heartwood.Classes.ButtonCaution}`,
					type: 'button',
					Classes: Heartwood.Classes
				})
				.then(html => {
					const hwComponent = diffable(html)
					const renderedComponent = shallow(
						<Button text={'Button'} kind={'caution'} />
					)
					expect(diffable(renderedComponent.html())).toEqual(hwComponent)
				})
		})
	})
	describe('Small Button', () => {
		it('Should render correctly', () => {
			return fractal.components
				.render('@primary-button', {
					text: 'Button',
					className: `${Heartwood.Classes.ButtonPrimary} ${
						Heartwood.Classes.Button_Small
					}`,
					type: 'button',
					Classes: Heartwood.Classes
				})
				.then(html => {
					const hwComponent = diffable(html)
					const renderedComponent = shallow(
						<Button text={'Button'} kind={'primary'} isSmall={true} />
					)
					expect(diffable(renderedComponent.html())).toEqual(hwComponent)
				})
		})
	})
	describe('Full-Width Button', () => {
		it('Should render correctly', () => {
			return fractal.components
				.render('@primary-button', {
					text: 'Button',
					className: `${Heartwood.Classes.ButtonPrimary} ${
						Heartwood.Classes.Button_FullWidth
					}`,
					type: 'button',
					Classes: Heartwood.Classes
				})
				.then(html => {
					const hwComponent = diffable(html)
					const renderedComponent = shallow(
						<Button text={'Button'} kind={'primary'} isFullWidth={true} />
					)
					expect(diffable(renderedComponent.html())).toEqual(hwComponent)
				})
		})
	})
})
