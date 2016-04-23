var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./gulp/config');

function getTask(task) {
  return require('./gulp/tasks/' + task)(gulp, plugins, config);
}

gulp.task('bower', getTask('bower'));
gulp.task('lib', getTask('lib'));
gulp.task('img', getTask('img'));
gulp.task('fonts', getTask('fonts'));
gulp.task('icons', getTask('icons'));
gulp.task('css', getTask('css'));
gulp.task('js', getTask('js'));
gulp.task('html', getTask('html'));
gulp.task('browserSync', getTask('browserSync'));
gulp.task('test', getTask('test'));
gulp.task('plato', getTask('plato'));
gulp.task('static', getTask('static'));

gulp.task('build', ['bower', 'lib', 'img', 'fonts', 'icons', 'css', 'js', 'html', 'static']);

gulp.task('production', ['build']);

gulp.task('development', ['build'], function () {
  gulp.start('browserSync');
});

gulp.task('default', function() {
  if (config.isProduction) {
    gulp.start('production');
  } else if (config.isDevelopment) {
    gulp.start('development');
  }
});
