// Gulp
var gulp = require('gulp');

// Plugins
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

// Source Paths
var src_paths = {
	bower: 'bower_components',
	scripts: 'src/scripts/*.js',
	sass: 'src/sass/**/*.scss',
	images: 'src/images/**',
	fonts: 'src/fonts/**'
};

// Dist Paths
var dist_paths = {
	js: 'dist/js',
	css: 'dist/css',
	fonts: 'dist/fonts'
};

// Setup paths for compass paths
var compass_options = {
	config_file: './config.rb',
	css: '../css', // where to save the compiled CSS (relative to the sass directory)
	sass: 'src/sass' // location of the source sass files (absolute path)
};

// Compile Sass
gulp.task('sass', ['copyFoundationFonts'], function() {

	gulp.src(src_paths.sass)
		.pipe(compass(compass_options)) // use gulp-compass to compile sass files
		.on("error", notify.onError())
		.on("error", function (err) {
			console.log("Error:", err); // catch any sass compilation errors and output to the console and a popup
		})
		.pipe(gulp.dest(dist_paths.css)); // save the outputted css to the desired directory
});

// Concatenate and minify JS
gulp.task('scripts', function() {
	return gulp.src([
			src_paths.bower + '/modernizr/modernizr.js',
			src_paths.bower + '/fastclick/lib/fastclick.js',
			src_paths.bower + '/jquery/dist/jquery.js',
			src_paths.bower + '/jquery/dist/jquery.placeholder.js',
			src_paths.bower + '/foundation/js/foundation.js',
			src_paths.scripts
		])
		.pipe(concat('all.js'))
		.pipe(gulp.dest(dist_paths.js));
});

// Copy Foundation Icon fonts into dist/fonts directory for the CSS to use
gulp.task('copyFoundationFonts', function() {
	return gulp.src([
			src_paths.bower + '/foundation-icon-fonts/foundation-icons.eot',
			src_paths.bower + '/foundation-icon-fonts/foundation-icons.woff',
			src_paths.bower + '/foundation-icon-fonts/foundation-icons.ttf',
			src_paths.bower + '/foundation-icon-fonts/foundation-icons.svg'
		])
		.pipe(gulp.dest(dist_paths.fonts));
});

// Watch files for changes
gulp.task('watch', function() {
	gulp.watch(src_paths.sass, ['sass']);
	gulp.watch(src_paths.scripts, ['scripts']);
});

// Default task
gulp.task('default', ['copyFoundationFonts', 'sass', 'scripts', 'watch']);