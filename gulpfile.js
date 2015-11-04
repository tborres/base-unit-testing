var browserSync = require('browser-sync');
var gulp = require('gulp');
var runSequence = require('run-sequence');

// Tasks:

gulp.task('browser-sync', function() {
  browserSync.init({server: ['src', '.tmp']});

  gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('serve', function(cb) {
  return runSequence('watch', 'browser-sync', cb);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js');
});

gulp.task('default', ['serve']);
