var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var cssMin = require('gulp-css');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var purify = require('gulp-purifycss');
var cleanCSS = require('gulp-clean-css');
var htmlreplace = require('gulp-html-replace');
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');
var browserSync = require('browser-sync');
var runSeq = require('run-sequence');
var clean = require('gulp-clean');


const BUILD_HTML = './index.html';
const SOURCE = {
  'MIN_CSS': './src/style/min/style.css',
  'AMPHTML': './src/index.html',
  'CLEANED_CSS': './src/style/min/style.css'
}

gulp.task('sass', function () {
  return gulp.src('./src/style/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/style'));
});

gulp.task('css-concat', function(){
  return gulp.src('./src/style/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./src/style/min'));
});

// purify removes unused CSS classes
gulp.task('css-purify', function() {
  return gulp.src(SOURCE.MIN_CSS)
    .pipe(purify([SOURCE.AMPHTML]))
    .pipe(gulp.dest('./src/style/min'));
});

gulp.task('css-minify', function() {
  return gulp.src(SOURCE.MIN_CSS)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./src/style/min'));
});


// inject-css inserts the cleaned + minified CSS into HTML
gulp.task('inject-css', function() {
  return gulp.src(SOURCE.AMPHTML)
    .pipe(htmlreplace({
      cssInline: {
        src: gulp.src(SOURCE.CLEANED_CSS),
        tpl: '<!-- build:cssInline --><style amp-custom>%s</style><!-- endbuild -->'
      }
    }))
    .pipe(gulp.dest('./src'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/style/sass/*',() => {runSeq('sass', 'css-concat', 'css-minify', 'inject-css')});
})

gulp.task('start', function() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    }
  })
})


gulp.task('unwrap-src', function(){
  return gulp.src(['./src/**/*', '!./src/style/**/*'])
         .pipe(gulp.dest('.'))
});

gulp.task('clean', function(){
  return gulp.src(['index.html', './font', './images'], { read: false})
         .pipe(clean())

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

gulp.task('build', ['sass', 'css-concat', 'css-minify', 'css-purify', 'inject-css', 'unwrap-src']);
gulp.task('default', ['validate']);