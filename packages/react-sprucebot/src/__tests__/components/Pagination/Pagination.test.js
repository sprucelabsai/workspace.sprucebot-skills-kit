import React from 'react'
import { shallow } from 'enzyme'

import Pagination from '../../../components/Pagination/Pagination'

describe('Pagination tests', () => {
	let renderedComponent
	let nextButton
	let backButton
	let onClickNext
	let onClickBack

	beforeEach(() => {
		onClickNext = jest.fn()
		onClickBack = jest.fn()

		renderedComponent = shallow(
			<Pagination
				isSimple={true}
				onClickNext={onClickNext}
				onClickBack={onClickBack}
				currentPage={2}
				totalPages={3}
			/>
		)

		nextButton = renderedComponent.find('Button').at(1)
		backButton = renderedComponent.find('Button').at(0)
	})

	it('Renders', () => {
		expect(renderedComponent.exists()).toEqual(true)
		expect(nextButton.exists()).toEqual(true)
		expect(nextButton.prop('icon')).toEqual(
			<ArrowNext
				height="24"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
			/>
		)
		expect(backButton.exists()).toEqual(true)
		expect(backButton.prop('icon')).toEqual(
			<ArrowBack
				height="24"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
			/>
		)
	})

	it(`Calls the 'click next' handler`, () => {
		nextButton.simulate('click')
		expect(onClickNext).toHaveBeenCalled()
	})

	it(`Calls the 'click back' handler`, () => {
		backButton.simulate('click')
		expect(onClickBack).toHaveBeenCalled()
	})

	describe('When on the first page', () => {
		renderedComponent = shallow(
			<Pagination
				isSimple={true}
				onClickNext={onClickNext}
				onClickBack={onClickBack}
				currentPage={1}
				totalPages={3}
			/>
		)

		it('Back buttons is disabled', () => {
			console.log(backButton.debug())
			expect(backButton.prop('disabled')).toEqual(true)
			expect(nextButton.prop('disabled')).toEqual(false)
		})
	})

	describe('When between the first and last page', () => {
		renderedComponent = shallow(
			<Pagination
				isSimple={true}
				onClickNext={onClickNext}
				onClickBack={onClickBack}
				currentPage={2}
				totalPages={3}
			/>
		)
		it('Both pager buttons are enabled', () => {
			expect(backButton.prop('disabled')).toEqual(false)
			expect(nextButton.prop('disabled')).toEqual(false)
		})
	})
	describe('When on the last page', () => {
		renderedComponent = shallow(
			<Pagination
				isSimple={true}
				onClickNext={onClickNext}
				onClickBack={onClickBack}
				currentPage={3}
				totalPages={3}
			/>
		)
		it('Next button is disabled', () => {
			expect(backButton.prop('disabled')).toEqual(false)
			expect(nextButton.prop('disabled')).toEqual(true)
		})
	})
})
