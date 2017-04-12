//define components
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),

	//css processing
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssnano = require('cssnano'),
	precss = require('precss'),

	//js processing
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),

	//define directories
	out = 'OUT/',
	devTpl = 'dev/tpl/',
	devImg = 'dev/images/',
	devCss = 'dev/css/',
	devJs = 'dev/js/'

//copy php
gulp.task('tplCp', function() {
	gulp.src(devTpl + '*.{php,tpl,html}')
		.pipe(gulp.dest(out))
		.pipe(livereload());
});

//compile SASS synthax / minify
gulp.task('cssPrep', function() {
	gulp.src(devCss + 'style.css')
		.pipe(postcss([
			precss(),
			autoprefixer(),
			cssnano()
	]))
	.on('error', gutil.log)
		.pipe(gulp.dest(out + '/c'))
		.pipe(livereload());
});

//concatinate & minify & rename javascript
gulp.task('jsConcat', function(){
	gulp.src(devJs + '*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(out + '/j'))
		.pipe(livereload());
});

//watch & process
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(devTpl + '**/*.{php,tpl,html}', ['tplCp']);
	gulp.watch(devCss + '**/*.css', ['cssPrep']);
	gulp.watch(devJs + '*.js', ['jsConcat']);
});

gulp.task( 'default', [ 'tplCp', 'cssPrep', 'jsConcat', 'watch' ] );
