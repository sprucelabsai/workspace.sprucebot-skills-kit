const fractal = require('../../fractal')
const expect = require('expect')
const toMatchSnapshot = require('expect-mocha-snapshot')
const beautify = require('beautify')

const Classes = require('../classes')

expect.extend({ toMatchSnapshot })

describe('Button Tests', function() {
	before(function() {
		return fractal.load()
	})
	describe('Primary Button', function() {
		it('Should render correctly', function() {
			// render a component with a custom set of context data
			return fractal.components
				.render('@primary-button', {
					text: 'Button',
					className: `${Classes.ButtonPrimary}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
	describe('Secondary Button', function() {
		it('Should render correctly', function() {
			return fractal.components
				.render('@secondary-button', {
					text: 'Button',
					className: `${Classes.ButtonSecondary}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
	describe('Simple Button', function() {
		it('Should render correctly', function() {
			return fractal.components
				.render('@simple-button', {
					text: 'Button',
					className: `${Classes.ButtonSimple}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
	describe('Caution Button', function() {
		it('Should render correctly', function() {
			return fractal.components
				.render('@caution-button', {
					text: 'Button',
					className: `${Classes.ButtonCaution}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
	describe('Full-Width Button', function() {
		it('Should render correctly', function() {
			return fractal.components
				.render('@primary-button', {
					text: 'Button',
					className: `${Classes.ButtonPrimary} ${Classes.Button_FullWidth}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
	describe('Small Button', function() {
		it('Should render correctly', function() {
			return fractal.components
				.render('@primary-button', {
					text: 'Button',
					className: `${Classes.ButtonPrimary} ${Classes.Button_Small}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
})
