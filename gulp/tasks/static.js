module.exports = function (gulp, plugins, config) {
  return function () {
    var del = require('del');
    var dest = config.build + '/static/css';

    del.sync(dest);
    return gulp
      .src(config.staticCSS)
      .pipe(plugins.if(config.isDevelopment, plugins.sourcemaps.init()))
      .pipe(plugins.autoprefixer('last 1 version'))
      .pipe(plugins.cssnano({zindex: false, reduceIdents: false, mergeIdents: false}))
      .pipe(plugins.if(config.isDevelopment, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(dest));
  };
};
