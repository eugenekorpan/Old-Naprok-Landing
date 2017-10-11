var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssMin = require('gulp-css');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var gulp = require('gulp');
var purify = require('gulp-purifycss');
var cleanCSS = require('gulp-clean-css');
var htmlreplace = require('gulp-html-replace');
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

const BUILD_PATH = './build';
const BUILD_HTML = BUILD_PATH + '/index.html';
const SOURCE = {
  'CSS': './html/css/style.css',
  'AMPHTML': './amphtml/index.html',
  'CLEANED_CSS': './amphtml/css/style.css'
}

// purify removes unused CSS classes
gulp.task('purify', function() {
  return gulp.src(SOURCE.CSS)
    .pipe(purify([SOURCE.AMPHTML]))
    .pipe(gulp.dest('./amphtml/css'));
});

// inline-css inserts the cleaned + minified CSS into HTML
gulp.task('inline-css', ['purify'], function() {
  return gulp.src(SOURCE.AMPHTML)
    .pipe(htmlreplace({
      'cssInline': {
        'src': gulp.src(SOURCE.CLEANED_CSS).pipe(cleanCSS()),
        'tpl': '<style amp-custom>%s</style>'
      }
    }))
    .pipe(gulp.dest(BUILD_PATH));
});

// validate ensures the AMP HTML is valid
gulp.task('validate', function() {
  amphtmlValidator.getInstance().then(function (validator) {
    var input = fs.readFileSync(BUILD_HTML, 'utf8');
    var result = validator.validateString(input);
    ((result.status === 'PASS') ? console.log : console.error)(BUILD_HTML + ": " + result.status);
    for (var ii = 0; ii < result.errors.length; ii++) {
      var error = result.errors[ii];
      var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
      if (error.specUrl !== null) {
        msg += ' (see ' + error.specUrl + ')';
      }
      ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
    }
  });
});

gulp.task('cssMinfy', function(){
  return gulp.src([
  		'./css/app.css',
  		'./css/bootstrap.min.css',
      /*'./css/animate.min.css'*/
	])
  	.pipe(concat('style.css'))
    /*.pipe(gulp.dest('./css'));*/
    .pipe(gulp.dest('./amphtml/css'));
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

gulp.task('default', ['sass', 'cssMinfy', 'compress-img', 'validate','inline-css']);