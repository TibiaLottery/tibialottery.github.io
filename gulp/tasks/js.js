module.exports = function (gulp, plugins, config) {
  return function () {
    var del = require('del');
    var dest = config.build + '/js';

    del.sync(dest);
    return gulp
      .src([].concat(config.js))
      .pipe(plugins.if(config.isDevelopment, plugins.sourcemaps.init()))
      .pipe(plugins.concat('script.js'))
      .pipe(plugins.plumber())
      .pipe(plugins.uglify({
        compress: {
          drop_debugger: config.isProduction,
          drop_console: config.isProduction
        }
      }))
      .pipe(plugins.rename('script.min.js'))
      .pipe(plugins.if(config.isDevelopment, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(dest));
  };
};
