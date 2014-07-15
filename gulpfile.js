// Gulp
var gulp = require('gulp');

// Plugins
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

// Source Paths
var src_paths = {
	bower: 'bower_components',
	scripts: 'src/scripts',
	sass: 'src/sass/**/*.scss',
	images: 'src/images/**',
	fonts: 'src/fonts/**'
};

// Dist Paths
var dist_paths = {
	js: 'dist/js',
	css: 'dist/css'
};

// Setup paths for compass paths
var compass_options = {
	config_file: './config.rb',
	css: '../css', // where to save the compiled CSS (relative to the sass directory)
	sass: 'src/sass' // location of the source sass files (absolute path)
};

// Compile Sass
gulp.task('sass', function() {

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
			'bower_components/jquery/dist/jquery.js',
			'bower_components/jquery/dist/jquery.placeholder.js',
			'bower_components/fastclick/lib/fastclick.js',
			'bower_components/modernizr/modernizr.js',
			'bower_components/foundation/js/foundation.js',
			src_paths.scripts + '/*.js'
		])
//		.pipe(order([
//			'jquery-1.11.1.js', // Decide which order to concatenate the js files if they need to be concatenated in a certain order
//			'jquery.geocomplete.js',
//			'custom.js'
//		]))
		.pipe(concat('all.js'))
		.pipe(gulp.dest(dist_paths.js));
});

// Watch files for changes
gulp.task('watch', function() {
	gulp.watch(src_paths.sass, ['sass']);
	gulp.watch(src_paths.scripts, ['scripts']);
});

// Default task
gulp.task('default', ['sass', 'scripts', 'watch']);