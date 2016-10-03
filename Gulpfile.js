var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imageResize = require('gulp-image-resize');
var merge = require('merge-stream');

gulp.task('default', ['build']);
gulp.task('build', ['styles', 'vendor']);

gulp.task('bower', function() {
  return bower();
});

gulp.task('styles', ['bower', 'fonts'], function() {
  return gulp.src('styles.scss')
    .pipe(sass({includePaths: ['bower_components/foundation-sites/scss']}))
    .pipe(minifyCss())
    .pipe(gulp.dest('static/'));
});

gulp.task('fonts', ['bower'], function() {
  return gulp.src(mainBowerFiles(['**/**.woff', '**/**.eot', '**/**.svg', '**/**.ttf']))
    .pipe(gulp.dest('static/fonts'));
});

gulp.task('vendor', ['bower'], function() {
  return gulp.src(mainBowerFiles('**/**.js'))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/'));
});

/*gulp.task('images', function() {
  var staffMembers = gulp.src('images/staff/**.jpg')
    .pipe(imageResize({
      width: 100
    }))
    .pipe(gulp.dest('static/img/staff/'));

  var staff = gulp.src('images/staff.jpg')
    .pipe(imageResize({
      width: 1000
    }))
    .pipe(gulp.dest('static/img/staff/'));

  var covers = gulp.src('images/covers/**.jpg')
    .pipe(imageResize({
      width: 1500
    }))
    .pipe(gulp.dest('static/img/'));

  return merge(staffMembers, staff, covers);
});*/
