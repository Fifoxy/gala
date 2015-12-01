var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');

gulp.task('default', ['build']);
gulp.task('build', ['styles']);

gulp.task('bower', function() {
  return bower();
});

gulp.task('styles', ['bower'], function() {
  gulp.src('styles.scss')
    .pipe(sass({includePaths: ['bower_components/foundation-sites/scss']}))
    .pipe(gulp.dest('static/'));
});
