module.exports = function (gulp, plugins, config) {
  return function () {
    var del = require('del');
    var dest = config.build + '/css';

    del.sync(dest);
    return gulp
      .src(config.css)
      .pipe(plugins.if(config.isDevelopment, plugins.sourcemaps.init()))
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer('last 1 version'))
      .pipe(plugins.concat('style.css'))
      .pipe(plugins.cssnano({zindex: false, reduceIdents: false, mergeIdents: false}))
      .pipe(plugins.rename('style.min.css'))
      .pipe(plugins.if(config.isDevelopment, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(dest));
  };
};
