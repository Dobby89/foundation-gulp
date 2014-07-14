// Gulp
var gulp = require('gulp');

// Plugins
var compass = require('gulp-compass');
var notify = require('gulp-notify');

// Paths
var paths = {
	scripts: 'static/js/*.js',
	sass: 'static/sass/**/*.scss',
	images: 'static/images/**',
	fonts: 'static/fonts/**',
	css: 'static/css'
};

// Setup paths for compass paths
var compass_options = {
	config_file: './config.rb',
	css: '../css', // where to save the compiled CSS (relative to the sass directory)
	sass: 'static/sass' // location of the source sass files (absolute path)
};

// Compile Sass
gulp.task('sass', function() {

	gulp.src(paths.sass)
		.pipe(compass(compass_options)) // use gulp-compass to compile sass files
		.on("error", notify.onError())
		.on("error", function (err) {
			console.log("Error:", err); // catch any sass compilation errors and output to the console and a popup
		})
		.pipe(gulp.dest(paths.css)); // save the outputted css to the desired directory
});

// Watch files for changes
gulp.task('watch', function() {
	gulp.watch(paths.sass, ['sass']);
});

// Default task
gulp.task('default', ['sass', 'watch']);