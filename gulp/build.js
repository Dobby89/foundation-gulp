'use strict';

var gulp = require('gulp');
var path = require('path');

var $ = require('gulp-load-plugins')();

/**
 * Build tasks
 *
 * Runs all the build tasks in this file from one command.
 * Doesn't include any tasks which should be run every now and then, e.g. `generatefonts`
 *
 * Usage: gulp build
 */
gulp.task('build', ['styles', 'scripts', 'copyfonts', 'copysvg', 'copyimages']);

gulp.task('copyfonts', ['copyLocalFonts', 'copyFoundationFonts']);

gulp.task('scripts', ['headscripts', 'mainscripts']);

/**
 * Clean output directories
 *
 * Gets rid of all the folders and files created by `gulp build` and `gulp watch`
 *
 * Usage: gulp clean
 */
gulp.task('clean', function () {
  return gulp.src(['static/dist', 'static/.sass-cache']).pipe($.rimraf());
});

/**
 * Copy local fonts into dist/
 *
 * Usage: gulp copyLocalFonts
 */
gulp.task('copyLocalFonts', function () {
  return gulp.src([
      'static/fonts/**/*.*'
    ])
    .pipe(gulp.dest('static/dist/fonts'));
});

/**
 * Copy Foundation fonts into dist/
 *
 * Usage: gulp copyFoundationFonts
 */
gulp.task('copyFoundationFonts', function() {
  return gulp.src([
    'bower_components/foundation-icon-fonts/foundation-icons.eot',
    'bower_components/foundation-icon-fonts/foundation-icons.woff',
    'bower_components/foundation-icon-fonts/foundation-icons.ttf',
    'bower_components/foundation-icon-fonts/foundation-icons.svg'
  ])
  .pipe(gulp.dest('static/dist/fonts'));
});

/**
 * Copy svgs into /dist
 *
 * Usage: gulp copysvg
 */
gulp.task('copysvg', function () {
  return gulp.src('static/svg/**/*.svg')
    .pipe(gulp.dest('static/dist/svg'));
});

/**
 * Copy images into /dist
 *
 * Usage: gulp copyimages
 */
gulp.task('copyimages', function () {
  return gulp.src('static/images/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('static/dist/images'));
});

/**
 * Compile website Sass using compass
 *
 * Also uses autoprefixer, so no need for compass mixins
 *
 * Usage: gulp styles
 */
gulp.task('styles', function () {
  return gulp.src('static/styles/**/*.scss')
    .pipe($.compass({
      project: path.join(__dirname, '../', 'static'),
      css: 'dist/styles',
      sass: 'styles',
//      require: ['compass-normalize'], // include any ruby gems here, so compass knows to require them
      import_path: ['../bower_components/'], // so the compiler knows to look for scss files within the bower directory as well (relative path to the static directory)
      logging  : true,
      comments : false,
      style: 'expanded', // e.g. nested, expanded, compact, or compressed
      sourcemap: false
    }))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', errorAlert)
    .pipe($.autoprefixer('last 2 version'))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', errorAlert)
    .pipe($.size({title: 'main.css'}))
    .pipe(gulp.dest('static/dist/styles'));
});

/**
 * Compile website Sass using gulp-sass
 *
 * Uses libsass, which is apparently ~10x faster than ruby!
 *
 * This means you don't need to install Ruby gems because this is a node/gulp implementation of the sass compiler.
 *
 * Usage: gulp styles-libsass
 */
gulp.task('styles-libsass', function () {
  return gulp.src('static/styles/**/*.scss')
    .pipe($.sass({
      // See https://github.com/sass/node-sass for full list of parameter references
      includePaths: ['./bower_components'],  // so the compiler knows to look for scss files within the bower directory as well
      outputStyle: 'nested', // 'nested' or 'compressed' ('expanded' and 'compact' are not currently supported by libsass)
      sourceComments: 'none' // 'none', 'normal' or 'map'
    }))
    .on('error', errorAlert)
    .pipe($.autoprefixer('last 2 version'))
    .on('error', errorAlert)
    .pipe($.size({title: 'main.css'}))
    .pipe(gulp.dest('static/dist/styles'));
});

/**
 * Concatenate head scripts using browserify
 *
 * Usage: gulp headscripts
 */
gulp.task('headscripts', function () {
  return gulp.src(['static/scripts/head.js'], { read: false })
    .pipe($.browserify({
      insertGlobals: false,
      transform: ['debowerify'],
      shim: {
        'modernizr': {
          path: 'bower_components/modernizr/modernizr.js',
          exports: null,
          this: 'window'
        }
      }
    }))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', errorAlert)
    .pipe(gulp.dest('static/dist/scripts'))
    .pipe($.size({title: 'head.js'}));
});

/**
 * Concatenate main scripts using browserify
 *
 * Usage: gulp mainscripts
 */
gulp.task('mainscripts', function () {
  return gulp.src(['static/scripts/main.js'], { read: false })
    .pipe($.browserify({
      insertGlobals: false,
      transform: ['debowerify'],
      shim: {
        'jquery.placeholder': {
          path: 'bower_components/jquery-placeholder/jquery.placeholder.js',
          exports: null,
          depends: {
            jquery: 'jQuery'
          }
        },
        // shim for foundation, see http://foundation.zurb.com/forum/posts/3160-foundations-dependency-on-modernizr
        // for foundations dependencies
        'foundation': {
          path: 'bower_components/foundation/js/foundation.js',
          exports: null,
          depends: {
            'jquery.cookie': null
          }
        }
      }
    }))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', errorAlert)
    .pipe(gulp.dest('static/dist/scripts'))
    .pipe($.size({title: 'main.js'}));
});

/**
 * Error Alert
 *
 * Outputs any gulp task errors to the console and a popup (using notify).
 *
 * Also means tasks can continue running even on error, which is useful for watch tasks.
 */
function errorAlert(error) {
  $.notify.onError({title: "Gulp Error", message: "Check your terminal"})(error);
  console.log('Error:', error);
  this.emit("end");
}