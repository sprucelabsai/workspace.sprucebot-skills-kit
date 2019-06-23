import 'jsdom-global/register'
import React from 'react'
import { shallow } from 'enzyme'

import Pagination from '../../../components/Pagination/Pagination'

describe('Pagination tests', () => {
	let renderedComponent
	let nextButton
	let backButton
	let onClickNext
	let onClickBack
	let props

	beforeEach(() => {
		onClickNext = jest.fn()
		onClickBack = jest.fn()

		props = {
			isSimple: true,
			onClickNext: onClickNext,
			onClickBack: onClickBack,
			currentPage: 0,
			totalPages: 3
		}

		renderedComponent = shallow(<Pagination {...props} />)

		nextButton = renderedComponent.find('Button').at(1)
		backButton = renderedComponent.find('Button').at(0)
	})

	it('Renders', () => {
		expect(renderedComponent).toBeDefined()
		expect(renderedComponent.exists()).toEqual(true)
		expect(nextButton.exists()).toEqual(true)
		expect(backButton.exists()).toEqual(true)
	})

	it(`Calls the 'click next' handler`, () => {
		nextButton.simulate('click')
		expect(onClickNext).toHaveBeenCalled()
	})

	it(`Calls the 'click back' handler`, () => {
		backButton.simulate('click')
		expect(onClickBack).toHaveBeenCalled()
	})
})

describe('When on the first page', () => {
	let renderedComponent
	let nextButton
	let backButton
	let onClickNext
	let onClickBack
	let props

	beforeEach(() => {
		onClickNext = jest.fn()
		onClickBack = jest.fn()

		props = {
			isSimple: true,
			onClickNext: onClickNext,
			onClickBack: onClickBack,
			currentPage: 0,
			totalPages: 3
		}

		renderedComponent = shallow(<Pagination {...props} />)

		nextButton = renderedComponent.find('Button').at(1)
		backButton = renderedComponent.find('Button').at(0)
	})

	it('Back buttons is disabled', () => {
		expect(backButton.prop('disabled')).toEqual(true)
		expect(nextButton.prop('disabled')).toEqual(false)
	})
})

describe('When between the first and last page', () => {
	let renderedComponent
	let nextButton
	let backButton
	let onClickNext
	let onClickBack
	let props

	beforeEach(() => {
		onClickNext = jest.fn()
		onClickBack = jest.fn()

		props = {
			isSimple: true,
			onClickNext: onClickNext,
			onClickBack: onClickBack,
			currentPage: 1,
			totalPages: 3
		}

		renderedComponent = shallow(<Pagination {...props} />)

		nextButton = renderedComponent.find('Button').at(1)
		backButton = renderedComponent.find('Button').at(0)
	})
	it('Both pager buttons are enabled', () => {
		expect(backButton.prop('disabled')).toEqual(false)
		expect(nextButton.prop('disabled')).toEqual(false)
	})
})

describe('When on the last page', () => {
	let renderedComponent
	let nextButton
	let backButton
	let onClickNext
	let onClickBack
	let props

	beforeEach(() => {
		onClickNext = jest.fn()
		onClickBack = jest.fn()

		props = {
			isSimple: true,
			onClickNext: onClickNext,
			onClickBack: onClickBack,
			currentPage: 3,
			totalPages: 3
		}

		renderedComponent = shallow(<Pagination {...props} />)

		nextButton = renderedComponent.find('Button').at(1)
		backButton = renderedComponent.find('Button').at(0)
	})
	it('Next button is disabled', () => {
		expect(backButton.prop('disabled')).toEqual(false)
		expect(nextButton.prop('disabled')).toEqual(true)
	})
})
