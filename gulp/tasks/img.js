module.exports = function (gulp, plugins, config) {
  return function () {
    var del = require('del');
    var dest = config.build + '/img';

    del.sync(dest);
    return gulp
      .src(config.img)
      .pipe(plugins.if(config.isProduction, plugins.imagemin()))
      .pipe(gulp.dest(dest));
  };
};
