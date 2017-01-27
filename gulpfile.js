let gulp 	  = require('gulp')
	,	concat  = require('gulp-concat')
  , strip   = require('gulp-strip-debug')
	,	uglify  = require('gulp-uglify')
  , sass    = require('gulp-sass')


gulp.task('dev:js', _ => {
	return gulp
					.src(['src/app/app.module.js', 'src/app/**/*.module.js', 'src/app/**/*.js'])
					.pipe(concat('app.js'))
					.pipe(gulp.dest('./dist/js/'))
})

gulp.task('dev:css', _ => {
  return gulp
          .src('src/sass/app.sass')
          .pipe(sass().on('error', sass.logError))
          .pipe(concat('style.css'))
          .pipe(gulp.dest('./dist/css/'))
})

gulp.task('build:js', _ => {
  return gulp
          .src('./dist/js/app.js')
          .pipe(strip())
          .pipe(uglify())
          .pipe(gulp.dest('./dist/js/'))
})

gulp.task('dev', _ => {
  gulp.start('dev:js', 'dev:css')
  gulp.watch(['./src/sass/*.sass', './src/sass/**/*.sass'], ['dev:css'])
  gulp.watch(['./src/app/*.js', './src/app/**/*.js'], ['dev:js'])
})
