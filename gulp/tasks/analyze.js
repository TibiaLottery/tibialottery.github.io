module.exports = function(gulp, plugins, config) {
  return function() {
    var del = require('del');
    var merge = require('merge-stream');

    var jshint = gulp.src(config.js)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'));

    var jscs = gulp.src(config.js)
      .pipe(plugins.plumber())
      .pipe(plugins.jscs());

    return del(config.analysis).then(function() {
      merge(jshint, jscs);
    });
  };
};
