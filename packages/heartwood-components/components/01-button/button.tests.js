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
		var render
		before(function(done) {
			// render a component with a custom set of context data
			fractal.components
				.render('@primary-button', {
					text: 'Button',
					className: `${Classes.ButtonPrimary}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					// console.log(render)
					done()
				})
		})
		it('Should render correctly', function() {
			expect(render).toMatchSnapshot(this)
		})
	})
	describe('Secondary Button', function() {
		var render
		before(function(done) {
			// render a component with a custom set of context data
			fractal.components
				.render('@secondary-button', {
					text: 'Button',
					className: `${Classes.ButtonSecondary}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					// console.log(render)
					done()
				})
		})
		it('Should render correctly', function() {
			expect(render).toMatchSnapshot(this)
		})
	})
})
