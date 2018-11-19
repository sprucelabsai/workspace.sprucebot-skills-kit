const fractal = require('../../fractal')
const expect = require('expect')
const toMatchSnapshot = require('expect-mocha-snapshot')
const beautify = require('beautify')

const Classes = require('../classes')

expect.extend({ toMatchSnapshot })

describe('Context Menu Tests', function() {
	it('Should render correctly', function() {
		// render a component with a custom set of context data
		return fractal
			.load()
			.then(() => {
				return fractal.components.render('@context-menu', {
					leftAlign: true,
					Classes: Classes,
					actions: [
						{
							text: 'Edit Service',
							Classes: Classes
						},
						{
							text: 'Hide Service',
							Classes: Classes
						},
						{
							text: 'Move to Category',
							Classes: Classes
						}
					]
				})
			})
			.then(html => {
				render = beautify(html, { format: 'html' })
				expect(render).toMatchSnapshot(this)
			})
	})
})
