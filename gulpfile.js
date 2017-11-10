const gulp = require('gulp')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const lint = require('gulp-eslint')
const minify = require('gulp-uglify')

gulp.task('lint', () => {
  gulp.src('src/**/*.js')
    .pipe(lint())
    .pipe(lint.format())
})

gulp.task('build', () => {
  gulp.src(['src/main.js', 'src/js/*.js'])
    .pipe(babel())
    .pipe(concat('module.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => gulp.watch('src/**/*.js', ['lint', 'build']))

gulp.task('default', ['watch'])
