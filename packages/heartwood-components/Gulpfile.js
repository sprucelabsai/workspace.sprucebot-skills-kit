var fs = require('fs-extra')
var gulp = require('gulp')
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var sassGlob = require('gulp-sass-glob')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var through = require('through2')

// a task to import base variables first, then from within our import file, fetch component styles and add them to a concatenated output file
gulp.task('styles', function() {
	gulp
		.src(['stylesheets/global.scss'])
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		// .pipe(rename('site.css'))
		// this is where site.css will be output. You'll reference this file in your _preview.hbs, so make sure the location is located in the static asset folder defined in fractal.js
		.pipe(gulp.dest('./public/stylesheets'))
})

gulp.task('js', function() {
	gulp
		.src(['components/**/*.js', '!components/**/*.config.js'])
		// .pipe(concat('scripts.js'))
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
					const matches = /^\/public\/icons\/ic_([^\n\r]*).svg$/gi.exec(
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
		['styles', 'js']
	)
})

// make sure you run fractal with "fractal start --sync" to use livereload in conjunction with this
