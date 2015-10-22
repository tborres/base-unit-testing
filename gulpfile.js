var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var Karma = require('karma').Server;
var path = require('path');
var runSequence = require('run-sequence');
var size = require('gulp-size');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// Helpers:

function bundleScripts(watch) {
  var bundler = browserify('./src/app.js', {debug: watch});

  function rebundle() {
    return bundler.bundle()
      .on('error', function(error) {
        gutil.log(gutil.colors.red(error));
        this.emit('end');
      })
      .on('log', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./.tmp'))
      .pipe(gulpif(watch, browserSync.stream({once: true})))
      .pipe(size());
  }

  if (watch) bundler = watchify(bundler).on('update', rebundle);

  return rebundle();
}

// Tasks:

gulp.task('browser-sync', function() {
  browserSync.init({server: ['src', '.tmp']});

  gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('clean', function(cb) {
  return del(['.tmp'], cb);
});

gulp.task('scripts', function() {
  return bundleScripts(true);
});

gulp.task('serve', function(cb) {
  return runSequence('clean', ['scripts'], 'watch', 'browser-sync', cb);
});

gulp.task('test', function(cb) {
  new Karma({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
    autoWatch: false,
    reporters: ['dots']
  }, cb).start();
});

gulp.task('test:tdd', function(cb) {
  new Karma({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    autoWatch: true,
    reporters: ['dots']
  }, cb).start();
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js');
});

gulp.task('default', ['serve']);
