const fractal = require('../../fractal')
const expect = require('expect')
const toMatchSnapshot = require('expect-mocha-snapshot')
const beautify = require('beautify')

const Classes = require('../classes')

expect.extend({ toMatchSnapshot })

describe('Button Group Tests', function() {
	before(() => {
		return fractal.load()
	})
	it('Should render correctly', function() {
		// render a component with a custom set of context data
		return fractal.components
			.render('@button-group', {
				Classes: Classes,
				actions: [
					{
						text: 'Confirm Changes',
						className: Classes.ButtonPrimary,
						Classes: Classes
					},
					{
						text: 'Cancel',
						className: Classes.ButtonSecondary,
						Classes: Classes
					}
				]
			})
			.then(html => {
				render = beautify(html, { format: 'html' })
				expect(render).toMatchSnapshot(this)
			})
	})
	describe('Segmented Button Group', function() {
		it('Should render correctly', function() {
			// render a component with a custom set of context data
			return fractal.components
				.render('@button-group', {
					Classes: Classes,
					isSegmented: true,
					actions: [
						{
							text: 'Option One',
							className: Classes.ButtonSecondary,
							Classes: Classes
						},
						{
							text: 'Option Two',
							className: Classes.ButtonSecondary,
							Classes: Classes
						},
						{
							text: 'Option Three',
							className: Classes.ButtonSecondary,
							Classes: Classes
						}
					]
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
	describe('Floating Button Group', function() {
		it('Should render correctly', function() {
			// render a component with a custom set of context data
			return fractal.components
				.render('@button-group', {
					Classes: Classes,
					isFloating: true,
					actions: [
						{
							text: 'Edit Service',
							className: `${Classes.ButtonSimple} ${Classes.Button_FullWidth}`,
							Classes: Classes
						},
						{
							text: 'Hide Service',
							className: `${Classes.ButtonSimple} ${Classes.Button_FullWidth}`,
							Classes: Classes
						},
						{
							text: 'Move to Category',
							className: `${Classes.ButtonSimple} ${Classes.Button_FullWidth}`,
							Classes: Classes
						}
					]
				})
				.then(html => {
					render = beautify(html, { format: 'html' })
					expect(render).toMatchSnapshot(this)
				})
		})
	})
})
