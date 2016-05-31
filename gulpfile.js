var gulp = require('gulp');
var typescript = require('gulp-tsc');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('jsSource', ['jsSource:copyStyles', 'jsSource:compileTypeScript']);
gulp.task('min', ['min:css', 'min:js']);

gulp.task('jsSource:compileTypeScript', function () {
    gulp.src(['source/ts/**/*.ts'])
      .pipe(typescript({
          target: 'ES5',
          module: "amd",
          out: 'Lookup.js'
      }))
      .pipe(gulp.dest('source/javascript/'))
});

gulp.task('jsSource:copyStyles', function () {
    gulp.src('source/ts/styles/*.css')
   .pipe(gulp.dest('source/javascript/'));
});


gulp.task('min:css', function () {
    gulp.src('source/javascript/*.css')
		.pipe(cssmin())
		.pipe(rename("lookup.min.css"))
		.pipe(gulp.dest('example/'));
});

gulp.task('min:js', function () {
    gulp.src('source/javascript/*.js')  
        .pipe(uglify())
     	.pipe(rename("lookup.min.js"))
        .pipe(gulp.dest('example/'));
});