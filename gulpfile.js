const gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
 
gulp.task('compress', function() {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('images'))
});

gulp.task('sass', function () {
  return gulp.src('_sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass']);