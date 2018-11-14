var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var sassGlob = require('gulp-sass-glob')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var sourcemaps = require('gulp-sourcemaps')

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
		.pipe(gulp.dest('./build/stylesheets'))
})

gulp.task('js', function() {
	gulp
		.src(['components/**/*.js', '!components/**/*.config.js'])
		.pipe(gulp.dest('./public/js'))
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
