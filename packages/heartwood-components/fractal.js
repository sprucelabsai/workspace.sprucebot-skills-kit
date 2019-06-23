'use strict'
const mandelbrot = require('@frctl/mandelbrot')

const myCustomisedTheme = mandelbrot({
	favicon: '/favicon.ico',
	skin: 'black',
	styles: ['default', '/stylesheets/heartwood-components.css']
})
/*
 * Require the path module
 */
const path = require('path')
/*
 * Require the Fractal module
 */
const fractal = (module.exports = require('@frctl/fractal').create())

/*
 * Register Handlebars halpers
 */
const hbs = require('@frctl/handlebars')({
	helpers: {
		concat: function() {
			const arg = Array.prototype.slice.call(arguments, 0)
			arg.pop()
			return arg.join('')
		},
		defaultVal: function(value, defaultVal) {
			const out = value || defaultVal
			return out
		},
		ifEquals: function(arg1, arg2, options) {
			return arg1 == arg2 ? options.fn(this) : options.inverse(this)
		},
		ifCond: function(v1, v2, options) {
			if (v1 === v2) {
				return options.fn(this)
			}
			return options.inverse(this)
		},
		orCond: function(v1, v2, options) {
			if (v1 || v2) {
				return options.fn(this)
			}
			return options.inverse(this)
		}
	}
	/* other configuration options here */
})

fractal.components.engine(
	hbs
) /* set as the default template engine for components */
fractal.docs.engine(
	hbs
) /* you can also use the same instance for documentation, if you like! */

/*
 * Theming
 */
myCustomisedTheme.addLoadPath(__dirname + '/theme-overrides')
fractal.web.theme(myCustomisedTheme)
/*
 * Give your project a title.
 */
fractal.set('project.title', 'Heartwood')
/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'components'))
/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'))
/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))
/* change the "assets" tab to the present file type */
fractal.components.set('resources', {
	scss: {
		label: 'SCSS',
		match: ['**/*.scss']
	},
	css: {
		label: 'CSS',
		match: ['**/*.css']
	},
	js: {
		label: 'JS',
		match: ['**/*.js']
	},
	other: {
		label: 'Other Assets',
		match: ['**/*', '!**/*.scss', '!**.css']
	}
})

// Set default status to WIP
fractal.components.set('default.status', 'wip')

fractal.web.set('builder.dest', 'build') // destination for the static export

// Set the default preview
fractal.components.set('default.preview', '@main-preview')
