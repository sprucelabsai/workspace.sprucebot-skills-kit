const fs = require('fs-extra')
const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const sassGlob = require('gulp-sass-glob')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps')
const through = require('through2')

// a task to import base variables first, then from within our import file, fetch component styles and add them to a concatenated output file
gulp.task('styles', function() {
	gulp
		.src(['stylesheets/heartwood-components.scss'])
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('styles-minify', function() {
	gulp
		.src(['stylesheets/heartwood-components.scss'])
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer, cssnano]))
		.pipe(
			rename({
				suffix: '.min'
			})
		)
		.pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('js', function() {
	gulp
		.src(['components/**/*.js', '!components/**/*.config.js'])
		.pipe(gulp.dest('./public/js'))
})

gulp.task('svg', function() {
	const cwd = process.cwd()
	const all = {}

	gulp
		.src(['public/icons/*.svg'])
		.pipe(
			(function() {
				return through.obj(function(file, enc, cb) {
					const projectPath = file.path.split(cwd)[1]
					const matches = /^\/public\/icons\/(?:ic_fill|ic)_([^\n\r]*)([^\n\r]*).svg$/gi.exec(
						projectPath
					)

					if (matches) {
						all[matches[1]] = projectPath
					}

					cb()
				})
			})()
		)
		.on('data', data => {
			all.push(data)
		})
		.on('end', () => {
			fs.writeJson('./icons.json', all)
		})
})

// watcher
gulp.task('watch', function() {
	// don't watch our import file for changes, watch the underlying partials for changes. If changes, run styles task to re-compile
	gulp.watch(
		['stylesheets/**/*.scss', 'components/**/*.scss', 'components/**/*.js'],
		['styles', 'styles-minify', 'js']
	)
})

// make sure you run fractal with "fractal start --sync" to use livereload in conjunction with this
