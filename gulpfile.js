var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssMin = require('gulp-css');
var concat = require('gulp-concat');
 
gulp.task('cssMinfy', function(){
  return gulp.src([
  		'./css/app.css',
  		'./css/bootstrap.min.css'
	])
  	.pipe(concat('app.css'))
    .pipe(cssMin())
    .pipe(gulp.dest('./css'));
});

/*gulp.task('scripts', function(){
  return gulp.src([
      './js/main.js',
      './js/jquery-2.2.4.min.js'
  ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});*/


gulp.task('compress-img', function() {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('images'))
});

gulp.task('sass', function () {
  return gulp.src('_sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass', 'cssMinfy', 'compress-img' ]);