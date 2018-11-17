const fractal = require('../../../fractal')
const expect = require('expect')
const toMatchSnapshot = require('expect-mocha-snapshot')
const beautify = require('beautify')
const Classes = require('../../classes')

expect.extend({ toMatchSnapshot })

describe('Primary Button', function() {
	before(function() {
		return fractal.load()
	})
	describe('should render correct html', function() {
		var render
		before(function(done) {
			// render a component with a custom set of context data
			fractal.components
				.render('@primary-button', {
					text: 'Sign Up',
					className: `${Classes.ButtonPrimary}`,
					type: 'button',
					Classes: Classes
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					console.log(render)
					done()
				})
		})
		it('should return correct html', function() {
			expect(render).toMatchSnapshot(this)
		})
	})
})
